'use server';

import { signOut } from '@/config/auth';
import { db } from '@/config/db';
import { createPasswordResetEmail } from '@/emails/password-reset';
import { sendEmailVerificationMessage } from '@/shared/utils/verification';
import bcrypt from 'bcryptjs';
import { env } from '@/config/env';
import { sendEmail } from '@/shared/utils/email';
import {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  type LoginInput,
  type RegisterInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
} from '@/shared/schemas/auth';
import {
  checkLoginRateLimit,
  recordFailedLogin,
  clearLoginAttempts,
  checkPasswordResetCooldown,
} from '@/shared/utils/rate-limit';
import { getValidationErrorMessage } from '@/shared/utils/validation';
import { LEGAL_CONSENT_VERSION } from '@/constants/auth';

export async function logoutUser() {
  await signOut({ redirect: false });
}

export async function loginUser(
  data: LoginInput
): Promise<{ error?: string; retryAfter?: number }> {
  const { data: parsed, success, error } = LoginSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };

  const rateLimit = await checkLoginRateLimit(parsed.email);
  if (rateLimit.blocked) {
    return { error: 'Слишком много попыток. Попробуйте позже.', retryAfter: rateLimit.retryAfter };
  }

  const user = await db.user.findUnique({ where: { email: parsed.email } });
  const valid = user && (await bcrypt.compare(parsed.password, user.password));

  if (!valid) {
    await recordFailedLogin(parsed.email);

    const rateLimit = await checkLoginRateLimit(parsed.email);

    if (rateLimit.blocked) {
      return {
        error: 'Слишком много попыток. Попробуйте позже.',
        retryAfter: rateLimit.retryAfter,
      };
    }
    return { error: 'Неверный email или пароль' };
  }

  await clearLoginAttempts(parsed.email);
  return {};
}

export async function registerUser(
  data: RegisterInput
): Promise<{ error?: string; verificationEmailSent?: boolean }> {
  const { data: parsedData, success, error } = RegisterSchema.safeParse(data);
  if (!success) {
    return { error: getValidationErrorMessage(error) };
  }

  const existing = await db.user.findUnique({
    where: { email: parsedData.email },
  });

  if (existing) {
    return { error: 'Пользователь с таким email уже существует' };
  }

  const hashedPassword = await bcrypt.hash(parsedData.password, 10);

  const now = new Date();

  await db.user.create({
    data: {
      name: parsedData.name,
      email: parsedData.email,
      password: hashedPassword,
      termsAcceptedAt: now,
      privacyAcceptedAt: now,
      legalConsentVersion: LEGAL_CONSENT_VERSION,
    },
  });

  try {
    await sendEmailVerificationMessage(parsedData.email);
    return { verificationEmailSent: true };
  } catch {
    return { verificationEmailSent: false };
  }
}

export async function sendPasswordResetEmail(
  data: ForgotPasswordInput
): Promise<{ error?: string; retryAfter?: number }> {
  const { data: parsed, success, error } = ForgotPasswordSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };

  const cooldown = await checkPasswordResetCooldown(parsed.email);
  if (cooldown.blocked) {
    return {
      error: 'Письмо уже отправлено. Подождите перед повторной отправкой.',
      retryAfter: cooldown.retryAfter,
    };
  }

  const user = await db.user.findUnique({ where: { email: parsed.email } });
  if (!user) return {};

  await db.passwordResetToken.deleteMany({ where: { email: parsed.email } });

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 час

  await db.passwordResetToken.create({ data: { email: parsed.email, token, expires } });

  const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  try {
    await sendEmail(parsed.email, createPasswordResetEmail(resetUrl));
  } catch {
    return { error: 'Не удалось отправить письмо для восстановления пароля. Попробуйте позже.' };
  }

  return {};
}

export async function resetPassword(
  token: string,
  data: ResetPasswordInput
): Promise<{ error?: string; email?: string; password?: string }> {
  const { data: parsed, success, error } = ResetPasswordSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };

  const resetToken = await db.passwordResetToken.findUnique({ where: { token } });

  if (!resetToken || resetToken.expires < new Date()) {
    return { error: 'Ссылка недействительна или истекла' };
  }

  const hashedPassword = await bcrypt.hash(parsed.password, 10);

  await db.user.update({
    where: { email: resetToken.email },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { token } });

  return { email: resetToken.email, password: parsed.password };
}
