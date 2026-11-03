import Image from 'next/image';
import * as motion from 'motion/react-client';
import {
  LANDING_DASHBOARD,
  LANDING_REVEAL_GROUP,
  LANDING_REVEAL_VARIANTS,
  LANDING_REVEAL_VIEWPORT,
} from '@/features/landing/constants';

export function LandingDashboard() {
  return (
    <section id="dashboard" className="bg-secondary/40 my-10 py-14 sm:my-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={LANDING_REVEAL_VIEWPORT}
        variants={LANDING_REVEAL_GROUP}
        className="landing-section"
      >
        <div className="grid items-end gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <motion.div variants={LANDING_REVEAL_VARIANTS.default} className="landing-reveal">
            <h2 className="landing-heading whitespace-pre-line">{LANDING_DASHBOARD.title}</h2>
          </motion.div>
          <motion.div variants={LANDING_REVEAL_VARIANTS.default} className="landing-reveal lg:pb-1">
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
              {LANDING_DASHBOARD.body}
            </p>
            <p className="mt-4 text-sm font-medium">{LANDING_DASHBOARD.note}</p>
          </motion.div>
        </div>

        <motion.figure
          variants={LANDING_REVEAL_VARIANTS.visual}
          className="landing-reveal border-foreground/15 bg-surface surface-shadow mt-10 overflow-hidden rounded-xl border sm:mt-14 sm:rounded-2xl"
        >
          <Image
            src={LANDING_DASHBOARD.image}
            alt={LANDING_DASHBOARD.alt}
            className="block h-auto w-full"
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
        </motion.figure>

        <motion.ul
          variants={LANDING_REVEAL_GROUP}
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {LANDING_DASHBOARD.points.map((point) => (
            <motion.li
              key={point.title}
              variants={LANDING_REVEAL_VARIANTS.default}
              className="landing-reveal border-border bg-surface/70 rounded-xl border p-5"
            >
              <p className="font-semibold">{point.title}</p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{point.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
