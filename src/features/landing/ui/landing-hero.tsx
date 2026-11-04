import Image from 'next/image';
import * as motion from 'motion/react-client';
import {
  LANDING_CONTENT,
  LANDING_DOODLES,
  LANDING_PREVIEW_GROUP,
  LANDING_REVEAL_GROUP,
  LANDING_REVEAL_VARIANTS,
  LANDING_REVEAL_VIEWPORT,
} from '@/features/landing/constants';
import { LandingCta } from '@/features/landing/ui/landing-cta';
import { LandingHeroPreview } from '@/features/landing/ui/landing-hero-preview';
import { LandingScribble } from '@/features/landing/ui/landing-scribble';

export function LandingHero() {
  return (
    <section className="landing-hero bg-background relative isolate px-5 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-16 lg:pb-10 lg:pt-20">
      <motion.div
        aria-hidden
        initial="hidden"
        animate="visible"
        variants={LANDING_REVEAL_GROUP}
        className="bg-background pointer-events-none absolute inset-0 -z-10 mx-auto hidden max-w-[1440px] overflow-hidden xl:block"
      >
        <motion.div
          variants={LANDING_REVEAL_VARIANTS.decoration}
          className="landing-reveal absolute left-5 top-48 w-36 -rotate-12 2xl:left-12 2xl:w-44"
        >
          <Image
            src={LANDING_DOODLES.designer}
            alt=""
            className="landing-doodle w-full"
            sizes="192px"
          />
        </motion.div>
        <motion.div
          variants={LANDING_REVEAL_VARIANTS.decoration}
          className="landing-reveal absolute right-5 top-56 w-36 rotate-12 2xl:right-12 2xl:w-44"
        >
          <Image
            src={LANDING_DOODLES.writer}
            alt=""
            className="landing-doodle w-full"
            sizes="176px"
          />
        </motion.div>
        <motion.div
          variants={LANDING_REVEAL_VARIANTS.decoration}
          className="landing-reveal absolute left-2 top-[550px] w-32 rotate-6 2xl:left-10 2xl:w-40"
        >
          <Image
            src={LANDING_DOODLES.developer}
            alt=""
            className="landing-doodle w-full"
            sizes="160px"
          />
        </motion.div>
        <motion.div
          variants={LANDING_REVEAL_VARIANTS.decoration}
          className="landing-reveal absolute right-2 top-[620px] w-32 -rotate-6 2xl:right-8 2xl:w-40"
        >
          <Image
            src={LANDING_DOODLES.photographer}
            alt=""
            className="landing-doodle w-full"
            sizes="160px"
          />
        </motion.div>
        <LandingScribble
          variant="spark"
          reveal
          className="absolute left-[17%] top-40 size-12 -rotate-12"
        />
        <LandingScribble
          variant="arrow"
          reveal
          className="absolute right-[15%] top-[390px] w-28 rotate-[30deg]"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={LANDING_REVEAL_GROUP}
        className="relative mx-auto max-w-[900px] text-center"
      >
        <motion.h1
          variants={LANDING_REVEAL_VARIANTS.headline}
          className="landing-reveal text-[clamp(2.5rem,5.6vw,5rem)] font-bold leading-[1.1] tracking-[-0.045em]"
        >
          {LANDING_CONTENT.hero.title}
          <br className="hidden sm:block" /> {LANDING_CONTENT.hero.titleLead}{' '}
          <span className="relative inline-block">
            {LANDING_CONTENT.hero.titleAccent}
            <LandingScribble
              variant="underline"
              reveal
              className="absolute -bottom-4 left-0 h-5 w-full sm:-bottom-5 sm:h-6"
            />
          </span>
        </motion.h1>
        <motion.p
          variants={LANDING_REVEAL_VARIANTS.default}
          className="landing-reveal mx-auto mt-7 max-w-[600px] text-base leading-relaxed sm:mt-9 sm:text-xl"
        >
          {LANDING_CONTENT.hero.description}
        </motion.p>
        <motion.div
          variants={LANDING_REVEAL_VARIANTS.default}
          className="landing-reveal mt-6 flex flex-col items-center gap-3 sm:mt-8"
        >
          <LandingCta href="/register">{LANDING_CONTENT.hero.cta}</LandingCta>
          <p className="text-sm font-medium">{LANDING_CONTENT.pricingNotice}</p>
        </motion.div>
        <motion.div
          aria-hidden
          variants={LANDING_REVEAL_VARIANTS.decoration}
          className="landing-reveal mx-auto mt-6 flex w-fit items-end gap-7 xl:hidden"
        >
          <Image
            src={LANDING_DOODLES.designer}
            alt=""
            className="landing-doodle w-16 -rotate-12 sm:w-20"
            sizes="80px"
          />
          <LandingScribble variant="spark" className="mb-5 size-7" />
          <Image
            src={LANDING_DOODLES.writer}
            alt=""
            className="landing-doodle w-16 rotate-12 sm:w-20"
            sizes="80px"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={LANDING_REVEAL_VIEWPORT}
        variants={LANDING_PREVIEW_GROUP}
        className="relative mx-auto mt-7 max-w-[1000px] sm:mt-10 lg:mt-12"
      >
        <motion.div variants={LANDING_REVEAL_VARIANTS.visual} className="landing-reveal">
          <LandingHeroPreview />
        </motion.div>
      </motion.div>
    </section>
  );
}
