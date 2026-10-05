import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Check, Tv } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TVFrame } from '../../components/domain/TVFrame';
import { SampleApp } from '../../components/domain/SampleApp';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [isManualControl, setIsManualControl] = useState(false);
  const [activeHintKey, setActiveHintKey] = useState<string>('Auto');
  const resumeTimerRef = useRef<any>(null);

  const handleMouseEnterTV = () => {
    setIsManualControl(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleMouseLeaveTV = () => {
    // Resume autoplay after 3 seconds
    resumeTimerRef.current = setTimeout(() => {
      setIsManualControl(false);
    }, 3000);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* 4% Tonal Wash */}
      <div className="pointer-events-none absolute top-10 right-0 h-[600px] w-[600px] rounded-full bg-primary/4 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column (Copy & Actions) */}
          <div className="lg:col-span-6 z-10 flex flex-col items-start">
            {/* Service Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-primary shadow-sh-1 mb-6">
              <Tv className="h-3.5 w-3.5 text-accent" />
              <span>LG webOS Launch Service</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-app-text leading-[1.06]">
              Your LG TV app, through review and into the store.
            </h1>

            {/* Supporting Paragraph */}
            <p className="mt-6 text-base sm:text-lg text-app-text-2 leading-relaxed max-w-xl">
              I take finished webOS apps through real-TV testing, packaging and LG Content Store approval. The first one proves the process. The next forty follow it.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/console')}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                className="shadow-sh-2"
              >
                Open the Launch Console
              </Button>

              <a
                href="#path"
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-app-text hover:border-app-text/60 active:scale-95 transition-all shadow-sh-1"
              >
                See the 12-Step Path
              </a>
            </div>

            {/* Proof Points Line */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-4 border-t border-border/80 pt-6 text-xs text-app-text-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" />
                <span>Real-TV physical testing</span>
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" />
                <span>Direct Content Store submission</span>
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" />
                <span>Rejection fixes included</span>
              </span>
            </div>
          </div>

          {/* Right Column (TV Frame with Autonomous/Interactive Simulator) */}
          <div
            className="lg:col-span-6 z-10 w-full"
            onMouseEnter={handleMouseEnterTV}
            onMouseLeave={handleMouseLeaveTV}
          >
            <div className="relative">
              <TVFrame
                isAutonomous={!isManualControl}
                hintText={
                  isManualControl
                    ? 'Interactive: Use Arrow keys, Enter, and Esc to control the TV'
                    : 'Autonomous remote simulation loop active. Hover or tap to take control.'
                }
              >
                <SampleApp
                  isAutonomous={!isManualControl}
                  onRemoteAction={(act) => setActiveHintKey(act)}
                />
              </TVFrame>

              {/* Autoplay Remote Key Indicator Chip */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted shadow-sh-1">
                  <span className="text-accent font-semibold">Remote input:</span>
                  <span className="text-app-text font-bold uppercase">{activeHintKey}</span>
                  <span className="text-border">|</span>
                  <span>→ → ↓ → OK ←</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="mt-12 hidden md:flex items-center gap-3 text-xs text-muted font-mono">
          <div className="h-8 w-[1px] bg-border relative overflow-hidden">
            <div className="h-2 w-full bg-primary animate-pulse" />
          </div>
          <span>Scroll to explore the repeatable pipeline</span>
        </div>
      </div>
    </section>
  );
};
