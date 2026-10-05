import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAppStore } from '../../store';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export const GuidedTour: React.FC = () => {
  const { isTourOpen, tourStep, closeTour, nextTourStep, prevTourStep } = useAppStore();
  const navigate = useNavigate();

  const tourSteps = [
    {
      step: 1,
      title: 'Step 1: Launch Readiness Command Center',
      screen: '/console',
      desc: 'The Overview gives owners one single measurable metric: the Launch Readiness Score (0-100). Watch it climb as checks and assets pass.',
      cta: 'Go to Simulator',
    },
    {
      step: 2,
      title: 'Step 2: Interactive TV Simulator & Remote',
      screen: '/console/simulator',
      desc: 'Test real TV behavior. Press Arrow keys and Enter to browse channels. Toggle "Before / After" to see how typical Back-key and focus defects cause instant rejections.',
      cta: 'Go to Code Review',
    },
    {
      step: 3,
      title: 'Step 3: 14-Point Automated Code Review',
      screen: '/console/review',
      desc: 'Review source files against 14 webOS certification checks. Toggle "Technical / Plain English" to explain defects cleanly to non-developers.',
      cta: 'Go to Config Validator',
    },
    {
      step: 4,
      title: 'Step 4: appinfo.json Config Validator',
      screen: '/console/config',
      desc: 'Edit the manifest in real-time. Notice how reverse-domain and semver rules flag invalid inputs immediately, and hit Auto-Fix to see instant correction.',
      cta: 'Go to Build Pipeline',
    },
    {
      step: 5,
      title: 'Step 5: Production Build & Packaging Pipeline',
      screen: '/console/build',
      desc: 'Run a repeatable 6-stage pipeline (lint, minify, verify, ares-package IPK). Use the "Simulate Error" dropdown to see how build bottlenecks are caught early.',
      cta: 'Go to Store Submission',
    },
    {
      step: 6,
      title: 'Step 6: LG Content Store Submission Tracker',
      screen: '/console/submission',
      desc: 'See the full lifecycle from Prepared to Live. Simulate an LG QA rejection, view the reviewer feedback card, apply the fix, and resubmit.',
      cta: 'Go to 40-App Portfolio',
    },
    {
      step: 7,
      title: 'Step 7: Scale Across 40 Similar Apps',
      screen: '/console/portfolio',
      desc: 'Select 12 apps and click "Apply Template Fix". The repeatable deployment model ensures all 40 apps progress smoothly without one-off heroics.',
      cta: 'Finish Tour',
    },
  ];

  if (!isTourOpen) return null;

  const current = tourSteps[tourStep - 1];

  const handleNext = () => {
    if (tourStep === 7) {
      closeTour();
    } else {
      nextTourStep();
      navigate(tourSteps[tourStep].screen);
    }
  };

  const handlePrev = () => {
    if (tourStep > 1) {
      prevTourStep();
      navigate(tourSteps[tourStep - 2].screen);
    }
  };

  return (
    <Modal
      isOpen={isTourOpen}
      onClose={closeTour}
      title={current.title}
      description={`Tour checkpoint ${tourStep} of 7`}
      maxWidth="md"
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-app-text-2 leading-relaxed">{current.desc}</p>

        <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
          <div className="flex items-center gap-1">
            {tourSteps.map((s) => (
              <span
                key={s.step}
                className={`h-2 rounded-full transition-all duration-200 ${
                  s.step === tourStep ? 'w-6 bg-primary' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {tourStep > 1 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePrev}
                icon={<ArrowLeft className="h-3.5 w-3.5" />}
              >
                Previous
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              icon={<ArrowRight className="h-3.5 w-3.5" />}
              iconPosition="right"
            >
              {current.cta}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
