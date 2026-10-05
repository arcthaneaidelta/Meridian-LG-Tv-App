import React, { useState } from 'react';
import { EntryLoader } from './EntryLoader';
import { Navbar } from '../../components/layout/Navbar';
import { Hero } from './Hero';
import { CredStrip } from './CredStrip';
import { PathStory } from './PathStory';
import { ConsolePreview } from './ConsolePreview';
import { RejectionLibrary } from './RejectionLibrary';
import { ScaleGrid } from './ScaleGrid';
import { Credentials } from './Credentials';
import { Closing } from './Closing';
import { Footer } from '../../components/layout/Footer';

export const LandingPage: React.FC = () => {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-app-text font-ui selection:bg-primary/20 selection:text-primary">
      {/* 1. Entry Loading Sequence */}
      {!loaderComplete && <EntryLoader onComplete={() => setLoaderComplete(true)} />}

      {/* 2. Top Header & Navigation */}
      <Navbar />

      {/* 3. Story Layer Sections */}
      <main>
        <Hero />
        <CredStrip />
        <PathStory />
        <ConsolePreview />
        <RejectionLibrary />
        <ScaleGrid />
        <Credentials />
        <Closing />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
};
