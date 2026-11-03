'use client';

import type { UserProfile } from '@/shared/types/profile';
import { ConfirmationProvider } from '@/shared/components/providers/confirmation/confirmation.provider';
import { ProfileEditor } from './editor';
import { ProfileSecurity } from './security';

type ProfileFormProps = { profile: UserProfile; verificationStatus?: 'success' };

export function ProfileForm(props: ProfileFormProps) {
  const { profile, verificationStatus } = props;

  return (
    <div className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
      <ConfirmationProvider>
        <ProfileEditor profile={profile} />
      </ConfirmationProvider>
      <ProfileSecurity profile={profile} verificationStatus={verificationStatus} />
    </div>
  );
}
