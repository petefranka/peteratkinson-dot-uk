'use client';

import { useState, useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/about-me', label: 'About' },
  { href: '/#get-in-touch', label: 'Contact' },
  { href: '/#work', label: 'Work' },
];

const ease = [0.76, 0, 0.24, 1] as const;

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY === 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setOrigin(`${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`);
    }
    setOpen((prev) => !prev);
  };

  const visible = atTop || open;

  return (
    <>
      {/* Button — right-aligned with content, vertically centred with the site-dot */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="container lg:ml-32 max-w-5xl px-8 flex justify-end pt-[26px]">
          <motion.button
            ref={buttonRef}
            data-testid="hamburger-button"
            onClick={handleToggle}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            animate={{
              color: open ? 'var(--bg-matte)' : 'var(--text-heading)',
              opacity: visible ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{ pointerEvents: visible ? 'auto' : 'none' }}
            className="pointer-events-auto flex flex-col justify-center items-center w-14 h-14 gap-[7px] rounded-full
              focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px]"
          >
            <motion.span
              aria-hidden="true"
              animate={open ? { rotate: 45, y: 9.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease }}
              className="block w-7 h-[2.5px] bg-current origin-center rounded-full"
            />
            <motion.span
              aria-hidden="true"
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-7 h-[2.5px] bg-current origin-center rounded-full"
            />
            <motion.span
              aria-hidden="true"
              animate={open ? { rotate: -45, y: -9.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease }}
              className="block w-7 h-[2.5px] bg-current origin-center rounded-full"
            />
          </motion.button>
        </div>
      </div>

      {/* Full-screen overlay — expands as a circle from the button's exact centre */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-overlay"
            initial={{ clipPath: `circle(0% at ${origin})` }}
            animate={{ clipPath: `circle(170% at ${origin})` }}
            exit={{ clipPath: `circle(0% at ${origin})` }}
            transition={{ duration: 0.65, ease }}
            style={{ willChange: 'clip-path' }}
            className="fixed inset-0 z-40 bg-[var(--text-heading)] flex flex-col justify-center"
          >
            <nav
              id={menuId}
              data-testid="hamburger-menu"
              aria-label="Site navigation"
              className="container lg:ml-32 max-w-5xl px-8"
            >
              {navItems.map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.5, ease, delay: 0.12 + i * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-5xl sm:text-6xl lg:text-7xl site-heading
                        text-[var(--bg-matte)] hover:text-[var(--accent-soft)] transition-colors
                        focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent-soft)] focus-visible:outline-offset-[3px]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
