import React from 'react';
import { Terminal, Tv, UploadCloud, ShieldCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const CredStrip: React.FC = () => {
  const credentials = [
    {
      title: 'webOS SDK + CLI',
      subtitle: 'ares-* Command Suite',
      description: 'Packaging, appinfo verification, certificate signing, and service-bridge luna integration.',
      icon: Terminal,
    },
    {
      title: 'Real-TV Physical Testing',
      subtitle: 'LG Smart TV Hardware',
      description: 'Physical testing with authentic LG Magic Remote pointer and 5-way D-pad navigation on OLED hardware.',
      icon: Tv,
    },
    {
      title: 'Direct Store Submission',
      subtitle: 'LG Seller Lounge',
      description: 'Direct ingestion into LG Seller Lounge with complete metadata compliance, category mapping, and build delivery.',
      icon: UploadCloud,
    },
    {
      title: 'Review Fixes Included',
      subtitle: 'Zero Rejection Loops',
      description: 'Hands-on triage and remediation for QA feedback: Back key behaviors, focus preservation, and safe areas.',
      icon: ShieldCheck,
      highlight: true,
    },
  ];

  return (
    <section className="border-y border-border bg-surface/50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((cred) => {
            const Icon = cred.icon;
            return (
              <Card
                key={cred.title}
                variant="elevated"
                className={`flex flex-col justify-between p-6 ${
                  cred.highlight ? 'border-primary/40 bg-surface' : ''
                }`}
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-ui text-base font-semibold text-app-text">{cred.title}</h3>
                  <span className="font-mono text-xs font-semibold text-accent block mt-0.5">
                    {cred.subtitle}
                  </span>
                  <p className="mt-2 text-xs text-app-text-2 leading-relaxed">
                    {cred.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
