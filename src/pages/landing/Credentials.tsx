import React, { useState } from 'react';
import { studioCredentials, availabilityDates } from '../../data/credentials';
import { Calendar, CheckCircle2, ShieldCheck, Download, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const Credentials: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(availabilityDates[0].day);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDownloadSummary = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      navigate('/console/report');
    }, 400);
  };

  return (
    <section id="start" className="py-24 border-b border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            Verification & Availability
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-app-text tracking-tight">
            Qualifications you can audit. Immediate start dates.
          </h2>
          <p className="mt-3 text-base text-app-text-2">
            Every statement here corresponds directly to tools and verified hardware in the lab. Ready to audit App #1 within 24 hours of kickoff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Credentials Table (col 1-7) */}
          <div className="lg:col-span-7 rounded-lg border border-border bg-elevated shadow-sh-1 overflow-hidden">
            <div className="p-5 border-b border-border bg-surface/50 flex items-center justify-between">
              <h3 className="font-ui text-base font-semibold text-app-text">
                Verified webOS Qualifications
              </h3>
              <span className="text-xs font-mono text-muted">Checked & Current</span>
            </div>

            <div className="divide-y divide-border">
              {studioCredentials.map((cred) => (
                <div key={cred.title} className="p-5 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-semibold text-app-text">{cred.title}</span>
                    <span className="rounded bg-primary/10 border border-primary/20 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary shrink-0">
                      {cred.value}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-app-text-2 leading-relaxed">{cred.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Start Date Selector (col 8-12) */}
          <div className="lg:col-span-5 rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-accent" />
              <h3 className="font-ui text-base font-semibold text-app-text">
                Reserve Your Intake Date
              </h3>
            </div>
            <p className="text-xs text-app-text-2 mb-5 leading-relaxed">
              Select an upcoming slot to initiate code intake, 14-point audit, and physical TV verification for App #1.
            </p>

            <div className="space-y-3">
              {availabilityDates.map((item) => {
                const isSelected = selectedDate === item.day;
                return (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDate(item.day)}
                    className={`flex w-full items-center justify-between p-4 rounded-md border text-left transition-all duration-140 ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-surface hover:border-secondary'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-app-text">{item.day}</span>
                        <span className="font-mono text-xs text-muted">({item.date})</span>
                      </div>
                      <span className="text-xs text-app-text-2 block mt-0.5">{item.slots}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Confirmation Chip */}
            <div className="mt-5 rounded border border-success/30 bg-success/10 p-3 flex items-center gap-2.5 text-xs text-success font-medium">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                Selected: <strong>{selectedDate}</strong> kickoff slot locked for your project.
              </span>
            </div>

            {/* Download One-Page Summary CTA */}
            <div className="mt-6 pt-5 border-t border-border">
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={handleDownloadSummary}
                icon={<Download className="h-4 w-4" />}
              >
                {downloadSuccess ? 'Opening PDF Report...' : 'Download One-Page Process Summary'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
