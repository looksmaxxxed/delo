import * as motion from 'motion/react-client';
import {
  LANDING_CONTENT,
  LANDING_STEPS,
  LANDING_REVEAL_GROUP,
  LANDING_REVEAL_VARIANTS,
  LANDING_REVEAL_VIEWPORT,
} from '@/features/landing/constants';
import { LandingCta } from '@/features/landing/ui/landing-cta';

export function LandingSteps() {
  return (
    <section id="how" className="bg-secondary/40 py-6 sm:py-8 lg:py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={LANDING_REVEAL_VIEWPORT}
        variants={LANDING_REVEAL_GROUP}
        className="landing-section grid gap-8 sm:gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-24"
      >
        <motion.div variants={LANDING_REVEAL_VARIANTS.default} className="landing-reveal">
          <h2 className="landing-heading whitespace-pre-line">{LANDING_CONTENT.how.title}</h2>
          <p className="text-muted-foreground mb-7 mt-5 max-w-sm text-base leading-relaxed">
            {LANDING_CONTENT.how.description}
          </p>
          <LandingCta href="/register">{LANDING_CONTENT.how.cta}</LandingCta>
        </motion.div>
        <ol className="divide-border divide-y">
          {LANDING_STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              variants={LANDING_REVEAL_VARIANTS.default}
              className="landing-reveal flex items-start gap-5 py-6 first:pt-0 last:pb-0 sm:gap-7"
            >
              <span className="text-primary pt-0.5 text-3xl font-bold tracking-tight">
                {index + 1}.
              </span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
