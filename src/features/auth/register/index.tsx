'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { useRouterNavigate } from '@/shared/hooks/use-router-navigate';
import { RegisterSchema, type RegisterInput } from '@/shared/schemas/auth';
import { registerUser } from '@/actions/auth';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '@/shared/constants/routes';
import { trackGoal } from '@/shared/utils/metrica';
import { REGISTER_DEFAULT_VALUES } from './constants';
import { RegisterFormView } from './ui/register-form';

export function RegisterForm() {
  const { navigateTo } = useRouterNavigate();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: REGISTER_DEFAULT_VALUES,
  });

  async function onSubmit(data: RegisterInput) {
    const { email, password } = data;
    const { error, verificationEmailSent } = await registerUser(data);
    if (error) {
      throw new Error(error);
    }
    trackGoal('registration_success');
    const { error: signInError } = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (signInError) {
      navigateTo(LOGIN_ROUTE);
      throw new Error('Регистрация прошла успешно. Войдите в аккаунт.');
    }
    if (verificationEmailSent) {
      toast.success('Мы отправили ссылку подтверждения на ваш email');
    } else {
      toast.warning('Аккаунт создан, но письмо не отправлено. Запросите его повторно в профиле.');
    }
    navigateTo(PROFILE_ROUTE);
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  return <RegisterFormView form={form} isLoading={isLoading} onSubmit={execute} />;
}
