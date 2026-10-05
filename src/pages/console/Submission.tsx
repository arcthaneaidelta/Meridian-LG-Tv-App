import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Stepper, SubmissionStage } from '../../components/domain/Stepper';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Tooltip } from '../../components/ui/Tooltip';
import {
  Send,
  RotateCcw,
  FastForward,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  ArrowRight,
  Award,
} from 'lucide-react';

export const Submission: React.FC = () => {
  const {
    submissionStage,
    submissionSpeed,
    setSubmissionSpeed,
    activeRejection,
    submissionTimeline,
    submitToLGAsync,
    simulateRejection,
    resolveRejectionAndResubmit,
    advanceSubmissionStep,
    resetSubmission,
    findings,
    project,
  } = useAppStore();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const blockers = findings.filter((f) => f.severity === 'blocker' && f.status === 'Open');
  const canSubmit = blockers.length === 0;

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    await submitToLGAsync();
    setIsSubmitting(false);
    setConfirmModalOpen(false);
  };

  const preSubmitChecklist = [
    { label: 'Zero Blocker Findings in Source', valid: blockers.length === 0, link: '/console/review' },
    { label: 'Remote Back-Key Handler Verified', valid: true, link: '/console/simulator' },
    { label: 'Store Icons (130×130 & 160×160) Conforming', valid: true, link: '/console/assets' },
    { label: 'Splash Background within 2.0 MB Budget', valid: true, link: '/console/assets' },
    { label: 'appinfo.json Resolution & SemVer Valid', valid: true, link: '/console/config' },
    { label: 'Production IPK Binary Checksum Generated', valid: true, link: '/console/build' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            LG Content Store Submission Tracker
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            End-to-end seller intake pipeline with automated QA progression and realistic rejection loop triage.
          </p>
        </div>

        {/* Demo Controls Panel */}
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-border bg-surface p-2 text-xs">
          <span className="font-mono text-muted uppercase text-[10px] font-semibold px-1">
            Demo Controls:
          </span>
          <div className="flex items-center gap-1">
            {[1, 5, 20].map((spd) => (
              <button
                key={spd}
                onClick={() => setSubmissionSpeed(spd)}
                className={`rounded px-2 py-0.5 font-mono text-[11px] font-semibold transition-colors ${
                  submissionSpeed === spd
                    ? 'bg-primary text-surface'
                    : 'bg-elevated text-app-text hover:bg-surface'
                }`}
              >
                {spd}× Speed
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={advanceSubmissionStep}
            icon={<FastForward className="h-3 w-3" />}
            className="text-xs h-7 px-2"
          >
            Advance
          </Button>

          {submissionStage === 'In QA' && !activeRejection && (
            <Button
              variant="ghost"
              size="sm"
              onClick={simulateRejection}
              className="text-xs text-error hover:bg-error/10 h-7 px-2"
            >
              Simulate QA Rejection
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={resetSubmission}
            icon={<RotateCcw className="h-3 w-3" />}
            className="text-xs h-7 px-2"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Top Stepper */}
      <div className="rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
        <Stepper currentStage={submissionStage} />
      </div>

      {/* Grid: Left Timeline (col 1-7), Right Current Stage & Rejection (col 8-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-6 rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h3 className="font-ui text-base font-semibold text-app-text">
              Submission Event Log
            </h3>
            <span className="font-mono text-xs text-muted">
              {submissionTimeline.length} events recorded
            </span>
          </div>

          <div className="mt-4 space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {submissionTimeline.map((item) => (
              <div key={item.id} className="relative pl-6 pb-4 border-l border-border last:pb-0">
                <span className="absolute -left-1.5 top-0.5 h-3 w-3 rounded-full border-2 border-elevated bg-primary" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-app-text">{item.title}</span>
                  <span className="font-mono text-[10px] text-muted">{item.timestamp}</span>
                </div>
                <div className="font-mono text-[11px] text-accent mt-0.5">{item.actor}</div>
                {item.note && (
                  <p className="mt-1 text-xs text-app-text-2 bg-surface p-2 rounded border border-border">
                    {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Stage Details / Actions / Rejections */}
        <div className="lg:col-span-6 space-y-5">
          {/* Stage 1: Prepared Mode */}
          {submissionStage === 'Prepared' && (
            <div className="rounded-lg border border-border bg-surface p-6 shadow-sh-1">
              <h3 className="font-ui text-base font-semibold text-app-text mb-2">
                Pre-Flight Certification Checklist
              </h3>
              <p className="text-xs text-app-text-2 mb-4 leading-relaxed">
                All pre-submission conditions must pass before Seller Lounge upload is permitted.
              </p>

              <div className="divide-y divide-border text-xs mb-6">
                {preSubmitChecklist.map((item) => (
                  <div key={item.label} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      <span className="font-medium text-app-text">{item.label}</span>
                    </div>
                    <button
                      onClick={() => navigate(item.link)}
                      className="text-muted hover:text-primary transition-colors text-[11px]"
                    >
                      Audit
                    </button>
                  </div>
                ))}
              </div>

              {!canSubmit ? (
                <Tooltip content={`Resolve ${blockers.length} blocker check(s) before submitting.`}>
                  <Button variant="primary" size="lg" disabled className="w-full">
                    Submit to LG Content Store (Blocked)
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setConfirmModalOpen(true)}
                  icon={<Send className="h-4 w-4" />}
                  className="w-full"
                >
                  Submit to LG Content Store (Demo)
                </Button>
              )}
            </div>
          )}

          {/* Rejection / Changes Requested Alert Card */}
          {submissionStage === 'Changes requested' && activeRejection && (
            <div className="rounded-lg border-2 border-warning bg-warning/5 p-6 shadow-sh-2">
              <div className="flex items-center gap-2.5 text-warning font-semibold text-base mb-2">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>LG Certification Feedback: Changes Requested</span>
              </div>

              <div className="rounded border border-warning/30 bg-elevated p-3.5 my-3 text-xs">
                <span className="font-mono text-muted uppercase text-[10px] block mb-1">
                  LG QA Reviewer Note:
                </span>
                <p className="font-medium text-app-text">{activeRejection.reviewerNote}</p>
              </div>

              <div className="space-y-2 text-xs text-app-text-2 mb-4">
                <p>
                  <strong>Root Cause:</strong> {activeRejection.rootCause}
                </p>
                <p>
                  <strong>Remediation:</strong> {activeRejection.fixApplied}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={resolveRejectionAndResubmit}
                  icon={<Send className="h-4 w-4" />}
                  className="flex-1"
                >
                  Apply Fix & Resubmit to QA
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate(activeRejection.screenTarget)}
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  View in Simulator
                </Button>
              </div>
            </div>
          )}

          {/* In QA Status Card */}
          {submissionStage === 'In QA' && !activeRejection && (
            <div className="rounded-lg border border-border bg-surface p-6 shadow-sh-1 text-center">
              <Clock className="h-10 w-10 text-info mx-auto mb-3 animate-spin" />
              <h3 className="font-display text-xl font-medium text-app-text">
                Under Active Review by LG QA
              </h3>
              <p className="mt-2 text-xs text-app-text-2 max-w-sm mx-auto leading-relaxed">
                Automated security sweeps complete. Physical evaluation running on LG smart TVs for remote focus traversal.
              </p>
              <div className="mt-4 font-mono text-[11px] text-muted">
                Typical duration: 2-4 business days (Simulating at {submissionSpeed}× speed)
              </div>
            </div>
          )}

          {/* Approved & Live Status Card */}
          {submissionStage === 'Live' && (
            <div className="rounded-lg border-2 border-success bg-success/5 p-8 shadow-sh-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/20 text-success mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-medium text-app-text">
                Live in the LG Content Store
              </h3>
              <p className="mt-2 text-sm text-app-text-2 max-w-md mx-auto">
                {project.name} has passed all certification criteria and is live for millions of smart TV viewers.
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/console/portfolio')}
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Scale Pipeline to Remaining 40 Apps
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm LG Content Store Submission"
        description="Review intake details before submitting to Seller Lounge QA."
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="rounded border border-border bg-surface p-3 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted">App Name:</span>
              <span className="font-semibold text-app-text">{project.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Package Version:</span>
              <span className="font-mono text-app-text">v{project.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Manifest ID:</span>
              <span className="font-mono text-app-text">{project.appId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Release IPK:</span>
              <span className="font-mono text-app-text">{project.lastBuildIpK}</span>
            </div>
          </div>

          <p className="text-muted">
            This demo will simulate seller intake registration and launch test verification. No real LG account credentials or payment required.
          </p>

          <div className="flex justify-end gap-3 pt-3 border-t border-border">
            <Button variant="secondary" size="sm" onClick={() => setConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmSubmit}
              isLoading={isSubmitting}
              icon={<Send className="h-3.5 w-3.5" />}
            >
              Confirm Submission (Demo)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
