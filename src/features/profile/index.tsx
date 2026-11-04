'use client';

import type { UserProfile } from '@/shared/types/profile';
import { ConfirmationProvider } from '@/shared/components/providers/confirmation/confirmation.provider';
import { ProfileEditor } from './editor';
import { ProfileSecurity } from './security';

type ProfileFormProps = { profile: UserProfile; verificationStatus?: 'success' };

export function ProfileForm(props: ProfileFormProps) {
  const { profile, verificationStatus } = props;

  return (
    <div className="mx-auto grid w-full max-w-3xl flex-1 items-start gap-4 sm:gap-6 xl:max-w-none xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
      <ConfirmationProvider>
        <ProfileEditor profile={profile} />
      </ConfirmationProvider>
      <ProfileSecurity profile={profile} verificationStatus={verificationStatus} />
    </div>
  );
}
