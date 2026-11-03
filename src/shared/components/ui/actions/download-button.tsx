'use client';

import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { Button } from './button';

type DownloadButtonProps = Omit<
  ComponentProps<typeof Button>,
  'isSuccess' | 'nativeButton' | 'onClick' | 'render'
> & {
  href: string;
};

const DOWNLOAD_SUCCESS_DURATION_MS = 1500;

export function DownloadButton(props: DownloadButtonProps) {
  const { href, ...buttonProps } = props;
  const [isSuccess, setIsSuccess] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleDownloadClick() {
    setIsSuccess(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsSuccess(false), DOWNLOAD_SUCCESS_DURATION_MS);
  }

  return (
    <Button
      {...buttonProps}
      render={<a href={href} download />}
      nativeButton={false}
      isSuccess={isSuccess}
      onClick={handleDownloadClick}
    />
  );
}
