import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, Play } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-nav transition-all duration-260 ${
        isScrolled
          ? 'bg-surface/95 border-b border-border shadow-sh-1 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-screen border border-primary/40 shadow-sm transition-transform duration-140 group-hover:scale-105">
            {/* Notch cursor mark */}
            <div className="h-3 w-4 rounded-xs bg-primary" />
            <div className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
          <span className="font-display text-xl font-medium tracking-tight text-app-text">
            Meridian
          </span>
          <span className="hidden sm:inline-block rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
            webOS Launch
          </span>
        </Link>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-app-text-2">
          <a href="#path" className="hover:text-app-text transition-colors">
            Launch Path
          </a>
          <a href="#console" className="hover:text-app-text transition-colors">
            Console Demo
          </a>
          <a href="#rejections" className="hover:text-app-text transition-colors">
            Rejection Library
          </a>
          <a href="#scale" className="hover:text-app-text transition-colors">
            40-App Scale
          </a>
          <a href="#start" className="hover:text-app-text transition-colors">
            Credentials & Start
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/console')}
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Open Launch Console
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded p-2 text-app-text md:hidden hover:bg-surface"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-6 py-6 shadow-sh-2">
          <nav className="flex flex-col gap-4 text-base font-medium text-app-text">
            <a
              href="#path"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-primary"
            >
              The 12-Step Launch Path
            </a>
            <a
              href="#console"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-primary"
            >
              Console Interactive Preview
            </a>
            <a
              href="#rejections"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-primary"
            >
              Rejection Library
            </a>
            <a
              href="#scale"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-primary"
            >
              Scale to 40 Apps
            </a>
            <a
              href="#start"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-primary"
            >
              Credentials & Start Date
            </a>
            <div className="pt-4 border-t border-border">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/console');
                }}
              >
                Open Launch Console
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
