import { Suspense, lazy, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import heroVideo from '../assets/hero video/anas intro.mp4';
import VideoReel from './VideoReel';

// Heavy WebGL bundle — lazy so the hero text paints immediately.
const ParticleField = lazy(() => import('../three/ParticleField'));

const stack = [
  'Python', 'Java', 'TypeScript', 'FastAPI',
  'React', 'React Native', 'RAG / LLM', 'AWS',
];

const EASE = [0.22, 1, 0.36, 1];

const Hero = () => {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  // ── Scroll-driven parallax ──────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  // Zero-out every range when reduced motion is requested (keeps hook order stable).
  const r = (a, b) => (prefersReduced ? [0, 0] : [a, b]);
  const contentY = useTransform(scrollYProgress, [0, 1], r(0, -140));
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], prefersReduced ? [1, 1] : [1, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], r(0, 90)); // opposite direction → depth
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.8], prefersReduced ? [1, 1] : [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.25], prefersReduced ? [1, 1] : [1, 0]);

  // ── Entrance stagger (skipped under reduced motion) ─────
  const container = {
    hidden: {},
    show: { transition: prefersReduced ? {} : { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const item = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-ink text-white"
    >
      {/* ── Background: static base (also the reduced-motion fallback) ── */}
      <div className="absolute inset-0 z-0 bg-dotgrid opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-40 -left-40 z-0 h-[42rem] w-[42rem] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(255,42,42,0.22), transparent 65%)' }}
        aria-hidden="true"
      />

      {/* ── Animated WebGL particle field (skipped under reduced motion) ── */}
      {!prefersReduced && (
        <motion.div style={{ opacity: fieldOpacity }} className="absolute inset-0 z-[1]" aria-hidden="true">
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </motion.div>
      )}

      {/* ── Light legibility aid: soft pad behind the left text + gentle bottom fade.
             Kept subtle so the particle field stays clearly visible. ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'radial-gradient(55% 55% at 24% 48%, rgba(8,8,8,0.62) 0%, rgba(8,8,8,0.18) 45%, transparent 68%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'linear-gradient(to bottom, transparent 72%, rgba(8,8,8,0.82) 100%)' }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-14 px-6 pb-16 pt-32 md:px-12 lg:flex-row lg:items-center lg:gap-16 lg:pt-28">
        {/* Left: editorial copy (rises + fades on scroll) */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="flex-1">
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Eyebrow */}
            <motion.div variants={item} className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[11px] font-medium tracking-wider text-white/70 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                AVAILABLE FOR OPPORTUNITIES
              </span>
              <span className="font-mono text-[11px] tracking-wider text-white/40">
                // software developer @ tarka labs
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={item} className="text-[15vw] font-bold leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="block text-white">Mohammed</span>
              <span className="block text-transparent [-webkit-text-stroke:1.5px_white] sm:[-webkit-text-stroke:2px_white]">
                Anas<span className="text-brand [-webkit-text-stroke:0]">.</span>
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p variants={item} className="mt-7 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
              Polyglot full-stack developer building web &amp; mobile apps, REST APIs, and
              <span className="text-white/90"> GenAI · RAG</span> features with FastAPI,
              Spring Boot, React &amp; React Native.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(255,42,42,0.6)] transition-all duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                View My Work
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Tech stack chips */}
            <motion.ul variants={item} className="mt-10 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li key={tech} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] tracking-wide text-white/55">
                  {tech}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Right: intro video reel (parallax on a different plane) */}
        <motion.div
          style={{ y: videoY }}
          className="w-full max-w-md self-center lg:w-[42%] lg:max-w-none lg:self-auto"
        >
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 30, scale: 0.97 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          >
            <VideoReel src={heroVideo} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator (fades out as you scroll) */}
      <motion.div style={{ opacity: indicatorOpacity }} className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className={prefersReduced ? '' : 'animate-bounce'}>
          <svg className="h-6 w-6 text-white/50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
