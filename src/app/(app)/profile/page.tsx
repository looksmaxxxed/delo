import { notFound } from 'next/navigation';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { ProfileForm } from '@/features/profile';
import { getProfile } from '@/actions/profile';

type ProfilePageProps = {
  searchParams: Promise<{ verification?: string }>;
};

export default async function ProfilePage(props: ProfilePageProps) {
  const { searchParams } = props;
  const { verification } = await searchParams;

  const profile = await getProfile();
  if (!profile) notFound();

  const verificationStatus = verification === 'success' ? 'success' : undefined;

  return (
    <div className="page-stack flex-1">
      <AnimateIn className="flex flex-1">
        <ProfileForm profile={profile} verificationStatus={verificationStatus} />
      </AnimateIn>
    </div>
  );
}
