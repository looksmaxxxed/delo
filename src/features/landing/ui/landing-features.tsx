import Image from 'next/image';
import * as motion from 'motion/react-client';
import {
  LANDING_CONTENT,
  LANDING_STORIES,
  LANDING_REVEAL_GROUP,
  LANDING_REVEAL_VARIANTS,
  LANDING_REVEAL_VIEWPORT,
} from '@/features/landing/constants';
import { LandingScribble } from '@/features/landing/ui/landing-scribble';
import { cn } from '@/shared/utils/cn';

export function LandingFeatures() {
  return (
    <section id="features" className="landing-section py-12 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={LANDING_REVEAL_VIEWPORT}
        variants={LANDING_REVEAL_GROUP}
      >
        <motion.h2
          variants={LANDING_REVEAL_VARIANTS.headline}
          className="landing-reveal landing-heading mx-auto max-w-3xl whitespace-pre-line text-center"
        >
          {LANDING_CONTENT.features.title}
        </motion.h2>
      </motion.div>
      <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
        {LANDING_STORIES.map((story, index) => (
          <motion.article
            key={story.id}
            id={story.id}
            initial="hidden"
            whileInView="visible"
            viewport={LANDING_REVEAL_VIEWPORT}
            variants={LANDING_REVEAL_GROUP}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
          >
            <motion.div
              variants={LANDING_REVEAL_VARIANTS.default}
              className={cn('landing-reveal max-w-lg', index % 2 === 1 && 'lg:order-2')}
            >
              <h3 className="whitespace-pre-line text-3xl font-bold leading-[1.18] tracking-[-0.035em] sm:text-4xl">
                {story.title}
              </h3>
              <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg">
                {story.body}
              </p>
              <p className="mt-5 text-sm font-medium">{story.note}</p>
              <LandingScribble
                variant="arrow"
                reveal
                className={cn('mt-6 hidden w-24 lg:block', index % 2 === 1 && '-scale-x-100')}
              />
            </motion.div>
            <motion.figure
              variants={LANDING_REVEAL_VARIANTS.visual}
              className={cn('landing-reveal min-w-0', index % 2 === 1 && 'lg:order-1')}
            >
              <div className="border-foreground/15 bg-surface overflow-hidden rounded-xl border">
                <Image
                  src={story.preview}
                  alt={story.alt}
                  className="block h-auto w-full"
                  sizes="(min-width: 1280px) 660px, (min-width: 1024px) 55vw, 100vw"
                />
              </div>
            </motion.figure>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
