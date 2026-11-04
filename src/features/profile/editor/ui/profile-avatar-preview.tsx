import Image from 'next/image';
import { cn } from '@/shared/utils/cn';
import { getInitials, getProfileImageUrl } from '@/shared/utils/profile';

type ProfileAvatarPreviewProps = {
  name: string;
  image: string | null;
  className?: string;
};

export function ProfileAvatarPreview(props: ProfileAvatarPreviewProps) {
  const { image, name, className } = props;
  const initials = getInitials(name);
  const imageUrl = getProfileImageUrl(image);

  return (
    <div
      className={cn(
        'border-background bg-primary/10 text-primary surface-shadow flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 text-2xl font-semibold',
        className
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={96}
          height={96}
          unoptimized
          className="size-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}
