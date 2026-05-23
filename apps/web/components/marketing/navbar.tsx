'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { MagneticButton } from '@/components/primitives/magnetic-button';
import { cn } from '@/lib/utils';
import { EASE_SOFT } from '@/lib/animations';

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/ai-solutions', label: 'AI Solutions' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-control ease-soft',
        scrolled ? 'pt-3' : 'pt-5',
      )}
    >
      <div className="container-wide">
        <div
          className={cn(
            'flex items-center justify-between gap-6 rounded-full px-3 pl-5 transition-all duration-control ease-soft',
            scrolled
              ? 'glass h-14 shadow-[0_8px_30px_-12px_hsl(0_0%_0%/0.6)]'
              : 'h-16 bg-transparent',
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-control ease-soft',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {active && (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-muted/60"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <MagneticButton href="/contact" size="sm">
              Book consultation
            </MagneticButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full surface md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE_SOFT }}
            className="container-wide md:hidden"
          >
            <div className="glass mt-3 rounded-3xl p-4">
              <nav className="flex flex-col">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base text-foreground/90 hover:bg-muted/60"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden className="text-muted-foreground">→</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <ThemeToggle />
                <MagneticButton href="/contact" size="sm">
                  Book consultation
                </MagneticButton>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
