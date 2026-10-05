import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 1.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border bg-bg py-16 text-xs text-app-text-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-screen text-surface font-semibold">
                M
              </div>
              <span className="font-display text-lg font-medium text-app-text">Meridian</span>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              webOS TV app packaging, hardware testing, and LG Content Store approval pipeline. Built for operators scaling multi-app catalogs.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-ui text-xs font-semibold uppercase tracking-wider text-app-text mb-3">
              Story Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#path" className="hover:text-primary transition-colors">
                  The 12-Step Launch Path
                </a>
              </li>
              <li>
                <a href="#console" className="hover:text-primary transition-colors">
                  Console Interactive Preview
                </a>
              </li>
              <li>
                <a href="#rejections" className="hover:text-primary transition-colors">
                  Rejection Library
                </a>
              </li>
              <li>
                <a href="#scale" className="hover:text-primary transition-colors">
                  Scale to 40 Apps
                </a>
              </li>
              <li>
                <a href="#start" className="hover:text-primary transition-colors">
                  Availability & Start Dates
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Console Workstations */}
          <div>
            <h4 className="font-ui text-xs font-semibold uppercase tracking-wider text-app-text mb-3">
              Console Workstations
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/console" className="hover:text-primary transition-colors">
                  Project Overview
                </Link>
              </li>
              <li>
                <Link to="/console/simulator" className="hover:text-primary transition-colors">
                  TV Simulator & Remote
                </Link>
              </li>
              <li>
                <Link to="/console/review" className="hover:text-primary transition-colors">
                  14-Point Code Audit
                </Link>
              </li>
              <li>
                <Link to="/console/config" className="hover:text-primary transition-colors">
                  appinfo.json Validator
                </Link>
              </li>
              <li>
                <Link to="/console/build" className="hover:text-primary transition-colors">
                  Build & IPK Packaging
                </Link>
              </li>
              <li>
                <Link to="/console/submission" className="hover:text-primary transition-colors">
                  Submission Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Contact */}
          <div>
            <h4 className="font-ui text-xs font-semibold uppercase tracking-wider text-app-text mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2 text-muted">
              <li>Typical response: &lt; 1 business day</li>
              <li>Physical hardware: LG OLED webOS Lab</li>
              <li>First app intake: Ready immediately</li>
              <li>Batch capacity: 40+ app templates</li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted">
          <p>© {new Date().getFullYear()} Meridian Studio. All rights reserved.</p>
          <p className="font-mono">
            Notice: This demo uses simulated data and local browser tools. Not an official LG product.
          </p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-elevated text-app-text shadow-sh-2 hover:bg-surface transition-all active:scale-95"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </footer>
  );
};
