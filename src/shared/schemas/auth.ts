import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Минимум 8 символов')
  .regex(/[A-Z]/, 'Нужна хотя бы одна заглавная буква')
  .regex(/[0-9]/, 'Нужна хотя бы одна цифра')
  .regex(/[^A-Za-z0-9]/, 'Нужен хотя бы один специальный символ');

export const LoginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(1, 'Введите пароль'),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, 'Имя обязательно'),
    email: z.email('Некорректный email'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
    termsAccepted: z.boolean().refine((value) => value === true, {
      message: 'Примите условия использования',
    }),
    personalDataAccepted: z.boolean().refine((value) => value === true, {
      message: 'Дайте отдельное согласие на обработку персональных данных',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const ForgotPasswordSchema = z.object({
  email: z.email('Некорректный email'),
});

export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
