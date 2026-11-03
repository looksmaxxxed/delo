'use client';

import { useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { LANDING_SCREENS, LANDING_TAB_POSITIONS } from '@/features/landing/constants';
import { Button } from '@/shared/components/ui/actions/button';
import { cn } from '@/shared/utils/cn';

export function LandingHeroPreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleSelect(event: MouseEvent<HTMLButtonElement>) {
    setActiveIndex(+event.currentTarget.dataset.index!);
  }

  return (
    <div>
      <div className="relative mx-auto mb-5 grid max-w-[560px] grid-cols-3">
        <span
          className={cn(
            'landing-tab-indicator bg-primary duration-400 pointer-events-none absolute bottom-0 left-0 h-0.5 w-1/3 transition-transform ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none',
            LANDING_TAB_POSITIONS[activeIndex]
          )}
        />
        {LANDING_SCREENS.map((item, index) => (
          <Button
            key={item.label}
            variant="ghost"
            data-index={index}
            onClick={handleSelect}
            className={cn(
              'h-auto min-h-11 w-full rounded-none border-0 px-2 py-3 text-xs hover:scale-100 hover:bg-transparent active:translate-y-0 active:scale-100 motion-reduce:transition-none sm:px-3 sm:text-sm dark:hover:bg-transparent',
              activeIndex === index ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <span className="sm:hidden">{item.shortLabel}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </Button>
        ))}
      </div>
      <div
        id="landing-screen-panel"
        className="surface-shadow border-foreground/15 bg-surface overflow-hidden rounded-xl border sm:rounded-2xl"
      >
        <div className="border-border flex h-10 items-center border-b px-4 sm:h-12 sm:px-5">
          <span className="flex gap-1.5">
            <span className="bg-muted-foreground/25 size-2 rounded-full" />
            <span className="bg-muted-foreground/25 size-2 rounded-full" />
            <span className="bg-muted-foreground/25 size-2 rounded-full" />
          </span>
        </div>
        <div className="bg-surface relative aspect-[8/5] overflow-hidden">
          {LANDING_SCREENS.map((screen, index) => (
            <div
              key={screen.label}
              data-gallery-screen={index}
              inert={activeIndex !== index}
              className={cn(
                'pointer-events-none absolute inset-0 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none',
                activeIndex === index
                  ? 'z-10 translate-y-0 scale-100 opacity-100'
                  : 'z-0 translate-y-2 scale-[0.99] opacity-0'
              )}
            >
              <Image
                src={screen.image}
                alt={screen.alt}
                className="block h-full w-full object-cover object-top"
                sizes="(min-width: 1100px) 1000px, 100vw"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
