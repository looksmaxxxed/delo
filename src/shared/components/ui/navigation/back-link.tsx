import Link from 'next/link';
import type { Route } from 'next';
import { Button } from '../actions/button';
import { ArrowLeftIcon } from '@/shared/components/icons/arrow-left';
import { cn } from '@/shared/utils/cn';

type BackLinkProps = {
  size?: 'init' | 'full';
  href: string;
  label: string;
};

export function BackLink(props: BackLinkProps) {
  const { href, label, size = 'init' } = props;

  return (
    <Link href={href as Route<string>} className="text-primary text-sm hover:underline">
      <Button
        variant="outline"
        className={cn(
          size === 'full' &&
            'size-10 min-w-10 px-0 xl:h-full xl:min-h-11 xl:w-full xl:min-w-11 xl:px-3'
        )}
        tooltip={`Вернуться к ${label}`}
        Icon={ArrowLeftIcon}
      />
    </Link>
  );
}
