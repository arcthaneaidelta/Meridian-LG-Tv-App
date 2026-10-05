import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Tv } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg p-6 text-center text-app-text font-ui">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
        <Tv className="h-8 w-8" />
      </div>
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
        404 — Screen Not Found
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-app-text mt-2">
        Channel Signal Lost
      </h1>
      <p className="mt-3 max-w-md text-sm text-app-text-2 leading-relaxed">
        The requested webOS workstation or route does not exist. Please return to the launch console or landing story.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/">
          <Button variant="secondary" size="md" icon={<ArrowLeft className="h-4 w-4" />}>
            Back to Story
          </Button>
        </Link>
        <Link to="/console">
          <Button variant="primary" size="md">
            Open Launch Console
          </Button>
        </Link>
      </div>
    </div>
  );
};
