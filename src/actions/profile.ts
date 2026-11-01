'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { auth } from '@/config/auth';
import { db } from '@/config/db';
import { checkEmailVerificationCooldown } from '@/shared/utils/rate-limit';
import { deleteS3ObjectByKey, uploadToS3 } from '@/shared/utils/s3';
import { sendEmailVerificationMessage } from '@/shared/utils/verification';
import { getValidationErrorMessage } from '@/shared/utils/validation';
import { ProfileSchema, type ProfileInput } from '@/shared/schemas/profile';
import { ORDER_TERMS_CONFIRMABLE_STATUSES } from '@/shared/constants/orders';
import {
  PROFILE_IMAGE_ALLOWED_TYPES,
  PROFILE_IMAGE_EXTENSION_BY_TYPE,
  PROFILE_IMAGE_MAX_BYTES,
} from '@/constants/profile';
import { DASHBOARD_ROUTE, PROFILE_ROUTE } from '@/constants/routes';
import type { UploadProfileImageResult, UserProfile } from '@/types/profile';

export async function getProfile(): Promise<UserProfile | null> {
  const session = await auth();
  if (!session) return null;

  return db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      workTerms: true,
      emailVerified: true,
      createdAt: true,
    },
  });
}

export async function updateProfile(data: ProfileInput): Promise<{ error?: string }> {
  const session = await auth();
  if (!session) return { error: 'Не авторизован' };

  const { data: parsed, success, error } = ProfileSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, workTerms: true },
  });
  if (!user) return { error: 'Пользователь не найден' };

  const nextWorkTerms = parsed.workTerms || null;
  const termsChanged = user.name !== parsed.name || user.workTerms !== nextWorkTerms;

  await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: session.user.id },
      data: {
        name: parsed.name,
        workTerms: nextWorkTerms,
      },
    });

    if (termsChanged) {
      await tx.order.updateMany({
        where: {
          userId: session.user.id,
          isTermsAccepted: true,
          status: { in: [...ORDER_TERMS_CONFIRMABLE_STATUSES] },
        },
        data: { isTermsAccepted: false },
      });
    }
  });

  revalidatePath(PROFILE_ROUTE);
  revalidatePath(DASHBOARD_ROUTE);
  return {};
}

export async function uploadProfileImage(formData: FormData): Promise<UploadProfileImageResult> {
  const session = await auth();
  if (!session) return { error: 'Не авторизован' };

  const file = formData.get('image');
  if (!(file instanceof File)) return { error: 'Выберите изображение' };

  if (
    !PROFILE_IMAGE_ALLOWED_TYPES.includes(file.type as (typeof PROFILE_IMAGE_ALLOWED_TYPES)[number])
  ) {
    return { error: 'Загрузите JPG, PNG или WebP' };
  }

  if (file.size > PROFILE_IMAGE_MAX_BYTES) {
    return { error: 'Изображение должно быть не больше 5 МБ' };
  }

  const contentType = file.type as (typeof PROFILE_IMAGE_ALLOWED_TYPES)[number];
  const extension = PROFILE_IMAGE_EXTENSION_BY_TYPE[contentType];
  const key = `profiles/${session.user.id}/${randomUUID()}.${extension}`;
  const body = Buffer.from(await file.arrayBuffer());
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  });

  if (!user) return { error: 'Пользователь не найден' };

  await uploadToS3({ key, body, contentType });

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { image: key },
    });

    await deleteS3ObjectByKey(user.image);
  } catch {
    return { error: 'Не удалось обновить фото профиля' };
  }

  revalidatePath(PROFILE_ROUTE);
  revalidatePath(DASHBOARD_ROUTE);

  return { image: key };
}

export async function deleteProfileImage(): Promise<{ error?: string }> {
  const session = await auth();
  if (!session) return { error: 'Не авторизован' };

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  });

  if (!user) return { error: 'Пользователь не найден' };
  if (!user.image) return {};

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { image: null },
    });

    await deleteS3ObjectByKey(user.image);
  } catch {
    return { error: 'Не удалось удалить фото профиля' };
  }

  revalidatePath(PROFILE_ROUTE);
  revalidatePath(DASHBOARD_ROUTE);

  return {};
}

export async function resendEmailVerification(): Promise<{ error?: string; retryAfter?: number }> {
  const session = await auth();
  if (!session) return { error: 'Не авторизован' };

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, emailVerified: true },
  });

  if (!user) return { error: 'Пользователь не найден' };
  if (user.emailVerified) return { error: 'Email уже подтверждён' };

  const cooldown = await checkEmailVerificationCooldown(user.email);
  if (cooldown.blocked) {
    return {
      error: 'Письмо уже отправлено. Подождите перед повторной отправкой.',
      retryAfter: cooldown.retryAfter,
    };
  }

  await sendEmailVerificationMessage(user.email);

  return {};
}
