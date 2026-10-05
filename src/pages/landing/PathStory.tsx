import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { launchSteps, LaunchStep } from '../../data/steps';
import { ArrowRight, CheckCircle2, Tv, FileCode2, Package, Send, Maximize2, Settings2, Image } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const PathStory: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const navigate = useNavigate();

  const activeStep = launchSteps[activeStepIndex];

  const getStepIcon = (route: string) => {
    if (route.includes('simulator')) return <Tv className="h-5 w-5 text-accent" />;
    if (route.includes('review')) return <FileCode2 className="h-5 w-5 text-secondary" />;
    if (route.includes('build')) return <Package className="h-5 w-5 text-primary" />;
    if (route.includes('submission')) return <Send className="h-5 w-5 text-info" />;
    if (route.includes('resolution')) return <Maximize2 className="h-5 w-5 text-warning" />;
    if (route.includes('config')) return <Settings2 className="h-5 w-5 text-accent" />;
    return <Image className="h-5 w-5 text-secondary" />;
  };

  return (
    <section id="path" className="relative py-24 border-b border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            The 12-Step Launch Path
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-app-text tracking-tight">
            Twelve steps, no surprises.
          </h2>
          <p className="mt-4 text-base text-app-text-2 leading-relaxed">
            Every requirement in your scope list is mapped to an interactive workstation. Nothing is left to guesswork before LG QA evaluates your app.
          </p>
        </div>

        {/* Desktop 2-Column Pinned / Interactive Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 12 Clickable Steps */}
          <div className="lg:col-span-6 space-y-2">
            {launchSteps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group flex items-start gap-4 rounded-md p-4 transition-all duration-140 cursor-pointer ${
                    isActive
                      ? 'bg-surface border-l-4 border-primary shadow-sh-1'
                      : 'hover:bg-surface/50 border-l-4 border-transparent'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                      isActive
                        ? 'bg-primary text-surface'
                        : 'bg-border text-muted group-hover:text-app-text'
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-ui text-base font-semibold transition-colors ${
                          isActive ? 'text-primary' : 'text-app-text'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[10px] text-muted border border-border">
                        {step.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-app-text-2 leading-relaxed">
                      {step.shortDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Detail Showcase Card */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="rounded-xl border border-border bg-[#14181C] p-8 text-surface shadow-sh-3">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-[#28323A] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1F272F] border border-[#34424E]">
                    {getStepIcon(activeStep.consoleRoute)}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-accent">
                      Step {activeStep.number} of 12
                    </span>
                    <h4 className="font-display text-xl font-medium text-white">
                      {activeStep.title}
                    </h4>
                  </div>
                </div>
                <span className="rounded-full bg-primary/20 border border-primary/40 px-3 py-1 font-mono text-xs text-[#8FA79F]">
                  {activeStep.badge}
                </span>
              </div>

              {/* Detailed Breakdown */}
              <div className="py-6 space-y-5">
                <div>
                  <span className="font-mono text-xs text-muted uppercase tracking-wider">
                    Process & Remediation
                  </span>
                  <p className="mt-1 text-sm text-[#CBD5E1] leading-relaxed">
                    {activeStep.longDesc}
                  </p>
                </div>

                <div className="rounded-md border border-[#2D3943] bg-[#1A2228] p-4">
                  <span className="font-mono text-xs text-[#8FA79F] uppercase tracking-wider block mb-1">
                    Audited Deliverable
                  </span>
                  <span className="text-sm font-medium text-white">
                    {activeStep.deliverable}
                  </span>
                </div>
              </div>

              {/* Interactive Direct CTA */}
              <div className="border-t border-[#28323A] pt-5 flex items-center justify-between">
                <span className="text-xs text-muted font-mono">
                  Interactive proof available in console
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(activeStep.consoleRoute)}
                  icon={<ArrowRight className="h-3.5 w-3.5" />}
                  iconPosition="right"
                >
                  Try This in Console
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
