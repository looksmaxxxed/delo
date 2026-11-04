'use client';

import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import {
  LANDING_CONTENT,
  LANDING_FAQ,
  LANDING_REVEAL_GROUP,
  LANDING_REVEAL_VARIANTS,
  LANDING_REVEAL_VIEWPORT,
} from '@/features/landing/constants';
import { Button } from '@/shared/components/ui/actions/button';
import { PlusIcon } from '@/shared/components/icons/plus';
import { cn } from '@/shared/utils/cn';

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    const index = +event.currentTarget.dataset.index!;
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={LANDING_REVEAL_VIEWPORT}
      variants={LANDING_REVEAL_GROUP}
      className="mx-auto max-w-[800px] px-5 py-6 sm:px-8 sm:py-8 lg:py-10"
    >
      <motion.div variants={LANDING_REVEAL_VARIANTS.default} className="landing-reveal">
        <h2 className="landing-heading mb-6 text-center sm:mb-8">{LANDING_CONTENT.faq.title}</h2>
      </motion.div>
      <motion.div
        variants={LANDING_REVEAL_VARIANTS.default}
        className="landing-reveal divide-border border-border divide-y border-y"
      >
        {LANDING_FAQ.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className="py-1 first:pt-0">
              <h3>
                <Button
                  type="button"
                  variant="ghost"
                  id={`landing-faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`landing-faq-answer-${index}`}
                  data-index={index}
                  onClick={handleToggle}
                  className="hover:text-primary h-auto min-h-16 w-full justify-between gap-4 whitespace-normal rounded-lg border-0 bg-transparent px-2 py-4 text-left text-base font-medium hover:scale-100 hover:bg-transparent active:translate-y-0 active:scale-100 aria-expanded:bg-transparent motion-reduce:transition-none dark:hover:bg-transparent dark:aria-expanded:bg-transparent"
                >
                  {item.question}
                  <span
                    aria-hidden
                    className={cn(
                      'text-muted-foreground shrink-0 transition-[rotate,color] duration-300 motion-reduce:transition-none',
                      isOpen && 'text-primary rotate-45'
                    )}
                  >
                    <PlusIcon size={18} />
                  </span>
                </Button>
              </h3>
              <div
                id={`landing-faq-answer-${index}`}
                role="region"
                aria-labelledby={`landing-faq-question-${index}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={cn(
                  'grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-in-out motion-reduce:transition-none',
                  isOpen
                    ? 'visible grid-rows-[1fr] opacity-100'
                    : 'invisible grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="text-muted-foreground px-2 pb-5 pr-10 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
