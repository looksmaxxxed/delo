import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import {
  LANDING_CONTENT,
  LANDING_DOODLES,
  LANDING_REVEAL_GROUP,
  LANDING_REVEAL_VARIANTS,
  LANDING_REVEAL_VIEWPORT,
} from '@/features/landing/constants';
import { LandingCta } from '@/features/landing/ui/landing-cta';
import { LandingScribble } from '@/features/landing/ui/landing-scribble';

export function LandingFinalCta() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={LANDING_REVEAL_VIEWPORT}
      variants={LANDING_REVEAL_GROUP}
      className="landing-section bg-background relative isolate overflow-hidden pb-16 pt-6 text-center sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10"
    >
      <motion.div
        aria-hidden
        variants={LANDING_REVEAL_VARIANTS.decoration}
        className="landing-reveal pointer-events-none mx-auto mb-6 flex items-end justify-center gap-5"
      >
        <Image
          src={LANDING_DOODLES.developer}
          alt=""
          className="landing-doodle w-20 -rotate-6 sm:w-28"
          sizes="112px"
        />
        <LandingScribble variant="spark" className="mb-5 size-9 sm:size-12" />
        <Image
          src={LANDING_DOODLES.photographer}
          alt=""
          className="landing-doodle w-20 rotate-6 sm:w-28"
          sizes="112px"
        />
      </motion.div>
      <motion.h2
        variants={LANDING_REVEAL_VARIANTS.headline}
        className="landing-reveal landing-heading whitespace-pre-line"
      >
        {LANDING_CONTENT.final.title}
      </motion.h2>
      <motion.p
        variants={LANDING_REVEAL_VARIANTS.default}
        className="landing-reveal text-muted-foreground mx-auto mt-5 max-w-md text-base leading-relaxed"
      >
        {LANDING_CONTENT.final.description}
      </motion.p>
      <motion.div
        variants={LANDING_REVEAL_VARIANTS.default}
        className="landing-reveal mt-8 flex flex-col items-center gap-4"
      >
        <LandingCta href="/register">{LANDING_CONTENT.final.cta}</LandingCta>
        <Link href="/login" className="landing-nav-link min-h-10 py-2 text-xs">
          {LANDING_CONTENT.final.login}
        </Link>
      </motion.div>
    </motion.section>
  );
}
