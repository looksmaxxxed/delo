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
    <section id="dashboard" className="bg-secondary/40 py-6 sm:py-8 lg:py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={LANDING_REVEAL_VIEWPORT}
        variants={LANDING_REVEAL_GROUP}
        className="landing-section"
      >
        <div className="grid items-end gap-6 sm:gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
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
          className="landing-reveal border-foreground/15 bg-surface surface-shadow mt-8 overflow-hidden rounded-xl border sm:mt-10 sm:rounded-2xl lg:mt-12"
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
          className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 lg:grid-cols-4"
        >
          {LANDING_DASHBOARD.points.map((point) => (
            <motion.li
              key={point.title}
              variants={LANDING_REVEAL_VARIANTS.default}
              className="landing-reveal border-border bg-surface/70 rounded-xl border p-4 sm:p-5"
            >
              <p className="text-sm font-semibold sm:text-base">{point.title}</p>
              <p className="text-muted-foreground mt-2 text-xs leading-5 sm:text-sm sm:leading-relaxed">
                {point.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
