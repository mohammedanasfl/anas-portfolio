import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import portrait from '../assets/about/image.png';
import reactLogo from '../assets/about/react.png';
import pythonLogo from '../assets/about/python.svg';
import javaLogo from '../assets/about/java.svg';
import springLogo from '../assets/about/spring.svg';
import dockerLogo from '../assets/about/docker.svg';
import postgresLogo from '../assets/about/postgresql.svg';

const EASE = [0.22, 1, 0.36, 1];

const skills = [
  'Python', 'Java', 'TypeScript', 'FastAPI', 'Spring Boot',
  'React', 'React Native', 'Angular', 'RAG / LLM', 'FAISS',
  'Ollama', 'AWS', 'Docker', 'PostgreSQL',
];

const logos = [
  { src: reactLogo, alt: 'React' },
  { src: pythonLogo, alt: 'Python' },
  { src: javaLogo, alt: 'Java' },
  { src: springLogo, alt: 'Spring Boot' },
  { src: dockerLogo, alt: 'Docker' },
  { src: postgresLogo, alt: 'PostgreSQL' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* Card shell with hover lift + brand glow */
function Card({ className = '', children }) {
  return (
    <motion.div
      variants={item}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:bg-white/[0.05] ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Count-up number that triggers when scrolled into view */
function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();
  const [n, setN] = useState(prefersReduced ? to : 0);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    let raf;
    const start = performance.now();
    const dur = 1100;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, prefersReduced]);

  return <span ref={ref}>{n}{suffix}</span>;
}

const About = () => {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(255,42,42,0.14), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-widest text-brand">// about</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
            The person behind<br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">the code.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {/* Portrait — tall */}
          <Card className="col-span-2 row-span-2 !p-0 md:col-span-1">
            <div className="relative h-full min-h-[320px] w-full">
              <img src={portrait} alt="Mohammed Anas" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-lg font-black text-white">Mohammed Anas</p>
                <p className="font-mono text-xs text-brand">Full-Stack Developer</p>
              </div>
            </div>
          </Card>

          {/* Bio — wide */}
          <Card className="col-span-2 md:col-span-2">
            <span className="font-mono text-[11px] tracking-widest text-white/40">// intro</span>
            <h3 className="mt-3 text-2xl font-bold text-white">Hello<span className="text-brand">.</span></h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
              Polyglot full-stack developer (Python, Java, JS/TS) based in Chennai, with 1+
              years building web &amp; mobile apps, REST APIs, and GenAI features. Experienced
              in <span className="text-white/90">RAG pipelines, LLM integrations</span> and
              local AI automation, end to end.
            </p>
          </Card>

          {/* Currently */}
          <Card className="col-span-2 md:col-span-1">
            <span className="font-mono text-[11px] tracking-widest text-white/40">// currently</span>
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-xs font-semibold text-white/70">Working</span>
            </div>
            <p className="mt-3 text-lg font-black leading-tight text-white">Software Developer</p>
            <p className="text-sm text-white/50">@ Tarka Labs</p>
          </Card>

          {/* Stats */}
          <Card className="col-span-1 flex flex-col justify-center">
            <p className="text-4xl font-black text-white"><Counter to={1} suffix="+" /></p>
            <p className="mt-1 font-mono text-[11px] tracking-widest text-white/40">YEARS EXP</p>
          </Card>
          <Card className="col-span-1 flex flex-col justify-center">
            <p className="text-4xl font-black text-white"><Counter to={17} suffix="+" /></p>
            <p className="mt-1 font-mono text-[11px] tracking-widest text-white/40">PROJECTS</p>
          </Card>
          <Card className="col-span-2 flex flex-col justify-center md:col-span-1">
            <p className="text-4xl font-black text-white"><Counter to={280} suffix="+" /></p>
            <p className="mt-1 font-mono text-[11px] tracking-widest text-white/40">LEETCODE SOLVED</p>
          </Card>

          {/* Location */}
          <Card className="col-span-2 flex items-center gap-4 md:col-span-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-inset ring-brand/30">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-widest text-white/40">// based in</p>
              <p className="text-lg font-black text-white">Chennai, India</p>
            </div>
          </Card>

          {/* Focus */}
          <Card className="col-span-2 md:col-span-2">
            <span className="font-mono text-[11px] tracking-widest text-white/40">// focus</span>
            <h3 className="mt-3 text-lg font-black text-white">GenAI · RAG systems</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              LLM integrations, RAG pipelines, and local AI automation — document ingestion,
              FAISS vector retrieval, and context-aware generation, end to end.
            </p>
          </Card>

          {/* Tech stack — full width */}
          <Card className="col-span-2 md:col-span-4">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex-1">
                <span className="font-mono text-[11px] tracking-widest text-white/40">// tech stack</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] tracking-wide text-white/60 transition-colors hover:border-brand/40 hover:text-white">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-5">
                {logos.map((l) => (
                  <img
                    key={l.alt}
                    src={l.src}
                    alt={l.alt}
                    title={l.alt}
                    className="h-9 w-9 object-contain opacity-60 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 md:h-11 md:w-11"
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
