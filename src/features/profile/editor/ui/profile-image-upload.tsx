'use client';

import { useRef, type ChangeEvent } from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { Button } from '@/shared/components/ui/actions/button';
import { DeleteIcon } from '@/shared/components/icons/delete';
import { UploadIcon } from '@/shared/components/icons/upload';
import { Badge } from '@/shared/components/ui/data/badge';
import { PROFILE_IMAGE_ACCEPT } from '@/shared/constants/profile';
import { formatDate } from '@/shared/utils/format';
import { ProfileAvatarPreview } from './profile-avatar-preview';

type ProfileImageUploadProps = {
  image: string | null;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  isUploading: boolean;
  onUpload: (file: File) => Promise<void>;
  onDelete: () => void;
};

export function ProfileImageUpload(props: ProfileImageUploadProps) {
  const { image, name, email, emailVerified, createdAt, isUploading, onUpload, onDelete } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSelectImage() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    void onUpload(file);
    event.target.value = '';
  }

  return (
    <>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={PROFILE_IMAGE_ACCEPT}
        onChange={handleFileChange}
      />

      <section
        aria-label="Профиль пользователя"
        className="flex flex-col items-center gap-5 px-2 py-3 text-center sm:flex-row sm:px-4 sm:py-4 sm:text-left xl:hidden"
      >
        <div className="relative shrink-0">
          <ProfileAvatarPreview image={image} name={name} />
          {image && (
            <Button
              type="button"
              mode="icon"
              variant="outline"
              tooltip="Удалить фото"
              aria-label="Удалить фото"
              Icon={DeleteIcon}
              disabled={isUploading}
              onClick={onDelete}
              className="border-background bg-surface text-destructive hover:bg-destructive/10 hover:text-destructive surface-shadow absolute -right-1 -top-1 size-8 rounded-full border-2"
            />
          )}
          <Button
            type="button"
            mode="icon"
            tooltip="Изменить фото"
            aria-label="Изменить фото"
            Icon={UploadIcon}
            isLoading={isUploading}
            onClick={handleSelectImage}
            className="border-background bg-primary text-primary-foreground hover:bg-primary/90 surface-shadow absolute -bottom-1 -right-1 size-8 rounded-full border-2"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-bold tracking-tight">{name}</h2>
              <p className="text-muted-foreground mt-1 truncate text-sm">{email}</p>
            </div>
            <Badge
              variant={emailVerified ? 'accent' : 'destructive'}
              size="sm"
              Icon={emailVerified ? CircleCheck : CircleAlert}
              className={emailVerified ? 'text-primary' : undefined}
            >
              {emailVerified ? 'Email подтверждён' : 'Email не подтверждён'}
            </Badge>
            <p className="text-muted-foreground text-xs">
              В Delo с {formatDate(createdAt, 'd MMMM yyyy')}
            </p>
          </div>
        </div>
      </section>

      <div className="hidden items-center gap-5 xl:flex">
        <ProfileAvatarPreview
          image={image}
          name={name}
          className="border-border size-20 border text-xl shadow-none"
        />
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              Icon={UploadIcon}
              isLoading={isUploading}
              onClick={handleSelectImage}
              className="h-11"
            >
              Загрузить фото
            </Button>
            <Button
              type="button"
              variant="outline"
              Icon={DeleteIcon}
              disabled={!image || isUploading}
              onClick={onDelete}
              className="h-11"
            >
              Удалить
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">JPG, PNG или WebP до 5 МБ</p>
        </div>
      </div>
    </>
  );
}
