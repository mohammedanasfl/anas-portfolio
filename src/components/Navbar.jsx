import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const EASE = [0.22, 1, 0.36, 1];

/* Magnetic wrapper — element is gently pulled toward the cursor (clamped so it
   never leaves its hit box), springs back on leave. Disabled for reduced motion. */
function Magnetic({ children, className, strength = 0.3, ...props }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, willChange: 'transform' }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [hovered, setHovered] = useState(null);
  const prefersReduced = useReducedMotion();

  // Indicator follows the hovered link, falling back to the active section
  const indicatorTarget = hovered ?? activeId;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={prefersReduced ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-3 z-50 px-4 md:top-5"
      >
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border py-2 pl-5 pr-2 transition-all duration-500 ${
            isScrolled
              ? 'border-white/10 bg-black/55 shadow-[0_12px_44px_rgba(0,0,0,0.55)] backdrop-blur-xl'
              : 'border-white/10 bg-white/[0.04] backdrop-blur-xl'
          }`}
        >
          {/* Logo */}
          <Magnetic
            href="#home"
            strength={0.4}
            className="shrink-0 rounded-md text-xl font-black tracking-tight text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Anas<span className="text-brand">.</span>
          </Magnetic>

          {/* Center links with hover-following indicator + slide-up text */}
          <div
            className="relative hidden items-center md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((link) => {
              const active = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onMouseEnter={() => setHovered(link.id)}
                  className="group relative rounded-full px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {indicatorTarget === link.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-inset ring-white/10"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {/* slide-up text reveal */}
                  <span className="relative z-10 block h-5 overflow-hidden text-sm">
                    <span
                      className={`block h-5 leading-5 transition-transform duration-300 ease-out group-hover:-translate-y-full ${
                        active ? 'font-semibold text-white' : 'font-medium text-white/60'
                      }`}
                    >
                      {link.label}
                    </span>
                    <span className="absolute inset-0 block h-5 translate-y-full leading-5 font-semibold text-white transition-transform duration-300 ease-out group-hover:translate-y-0">
                      {link.label}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right: CTA + mobile toggle */}
          <div className="flex shrink-0 items-center gap-2">
            <Magnetic
              href="#contact"
              className="group relative hidden items-center overflow-hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_24px_-6px_rgba(255,42,42,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:inline-flex"
            >
              <span className="relative z-10">Hire Me</span>
              {/* shine sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />
            </Magnetic>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:hidden"
            >
              <div className="relative h-4 w-5">
                <span className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${isOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${isOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-2xl md:hidden"
          >
            <span className="mb-8 font-mono text-xs tracking-widest text-white/40">// navigation</span>
            <nav className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  initial={prefersReduced ? false : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: EASE }}
                  className={`flex items-baseline gap-3 text-4xl font-black tracking-tight transition-colors ${
                    activeId === link.id ? 'text-white' : 'text-white/50'
                  }`}
                >
                  <span className="font-mono text-xs text-brand">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-12 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(255,42,42,0.6)]"
            >
              Hire Me
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
