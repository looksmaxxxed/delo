import { MotionConfig } from 'motion/react';
import { LandingHeader } from './ui/landing-header';
import { LandingHero } from './ui/landing-hero';
import { LandingDashboard } from './ui/landing-dashboard';
import { LandingFeatures } from './ui/landing-features';
import { LandingSteps } from './ui/landing-steps';
import { LandingFaq } from './ui/landing-faq';
import { LandingFinalCta } from './ui/landing-final-cta';
import { LandingStructuredData } from './ui/landing-structured-data';

export function LandingContent() {
  return (
    <div className="landing-page bg-background text-foreground min-h-screen font-sans">
      <LandingStructuredData />
      <a
        href="#landing-main"
        className="bg-surface text-foreground border-border sr-only z-50 rounded-lg border p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Перейти к содержимому
      </a>
      <LandingHeader />
      <MotionConfig reducedMotion="user">
        <main id="landing-main" tabIndex={-1}>
          <LandingHero />
          <LandingDashboard />
          <LandingFeatures />
          <LandingSteps />
          <LandingFaq />
          <LandingFinalCta />
        </main>
      </MotionConfig>
    </div>
  );
}
