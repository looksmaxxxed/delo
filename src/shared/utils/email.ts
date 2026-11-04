import { createTransport, type Transporter } from 'nodemailer';
import { Resend } from 'resend';
import { env } from '@/config/env';
import type { EmailMessage } from '@/types/email';

let resend: Resend | null = null;
let smtpTransport: Transporter | null = null;

function getResend() {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is required for Resend email delivery.');
  }

  resend ??= new Resend(env.RESEND_API_KEY);
  return resend;
}

function getResendFrom() {
  if (!env.RESEND_DOMAIN) {
    throw new Error('RESEND_DOMAIN is required for Resend email delivery.');
  }

  return `Delo <noreply@${env.RESEND_DOMAIN}>`;
}

function getSmtpTransport() {
  smtpTransport ??= createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
  });

  return smtpTransport;
}

export async function sendEmail(to: string, message: EmailMessage) {
  if (env.APP_ENV === 'local') {
    await getSmtpTransport().sendMail({
      from: env.EMAIL_FROM,
      to,
      subject: message.subject,
      html: message.html,
    });

    return;
  }

  const { error } = await getResend().emails.send({
    from: getResendFrom(),
    to,
    subject: message.subject,
    html: message.html,
  });

  if (error) {
    throw new Error('Не удалось отправить письмо. Попробуйте позже.');
  }
}
