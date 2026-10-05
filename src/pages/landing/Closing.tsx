import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { shouldSimulateFailure } from '../../api/delay';
import { CheckCircle2, AlertCircle, Send, RotateCcw } from 'lucide-react';

export const Closing: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    appName: '',
    projectLink: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.appName.trim()) errs.appName = 'App name or concept required';
    if (!formData.message.trim()) errs.message = 'Please share a brief note on your timeline';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    setTimeout(() => {
      if (shouldSimulateFailure()) {
        setSubmitError('Failed to send transmission (?fail=1 active). Try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', appName: '', projectLink: '', message: '' });
    setErrors({});
    setIsSuccess(false);
    setSubmitError(null);
  };

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-xl border border-screen-2 bg-screen p-8 sm:p-12 lg:p-20 text-surface shadow-sh-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Headline & Pitch */}
          <div className="lg:col-span-6">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-3">
              Direct Intake & Review
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Let’s get the first one live.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#9EB0BE] leading-relaxed max-w-lg">
              Send the project. I’ll review it, test it on a real TV, and tell you exactly what stands between you and the store.
            </p>
            <div className="mt-8 flex flex-col gap-2 text-xs text-[#8FA79F] font-mono">
              <span>• Initial audit returned in 24 hours</span>
              <span>• Complete IPK build pipeline included</span>
              <span>• Fixed for all 40 subsequent app deployments</span>
            </div>
          </div>

          {/* Right: Contact Form / Success State */}
          <div className="lg:col-span-6 rounded-lg border border-[#2B3742] bg-[#1A2228] p-6 sm:p-8">
            {isSuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/20 text-success mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-medium text-white">
                  Intake Request Received
                </h3>
                <p className="mt-2 text-sm text-[#CBD5E1]">
                  Thanks. I’ll review the details and reply within one business day.
                </p>
                <div className="mt-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleResetForm}
                    icon={<RotateCcw className="h-3.5 w-3.5" />}
                    className="bg-[#243039] border-[#364654] text-white hover:bg-[#2C3B47]"
                  >
                    Send Another Note
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="rounded border border-error/50 bg-error/15 p-3 text-xs text-error flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    className="bg-[#12161A] text-white border-[#34424E]"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    className="bg-[#12161A] text-white border-[#34424E]"
                  />
                </div>

                <Input
                  label="App Name (e.g. Harbor TV)"
                  value={formData.appName}
                  onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                  error={errors.appName}
                  className="bg-[#12161A] text-white border-[#34424E]"
                />

                <Input
                  label="Share Project Link or Repo (Optional)"
                  value={formData.projectLink}
                  onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
                  className="bg-[#12161A] text-white border-[#34424E]"
                />

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Project Details & Target Launch Timeline
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full rounded-md border bg-[#12161A] p-3 text-sm text-white placeholder-muted outline-none transition-colors ${
                      errors.message ? 'border-error' : 'border-[#34424E] focus:border-primary'
                    }`}
                    placeholder="Briefly describe your app stack and desired timeline..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-error">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    icon={<Send className="h-4 w-4" />}
                    className="w-full bg-accent hover:bg-accent/90 border-transparent text-white"
                  >
                    Start with One App
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
