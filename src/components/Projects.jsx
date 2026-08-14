import { useRef } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  {
    number: '01',
    title: 'Gym Assistant',
    description:
      'An AI-powered adaptive workout planner: a multi-user fitness platform with equipment-aware planning across an 873-exercise dataset, shared-gym equipment tracking, and adaptive daily plans driven by workout logs. A hybrid pipeline runs deterministic rules first (equipment filtering, injury exclusion, muscle-group rotation) and lets the LLM select only from a pre-validated safe pool.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Claude API', 'SQLAlchemy'],
    link: null,
    tag: 'GenAI',
    highlights: ['873-exercise dataset', 'Equipment-aware planning', 'Rules-gated LLM safety'],
  },
  {
    number: '02',
    title: 'Shorts Automation',
    description:
      "An end-to-end pipeline that generates and publishes YouTube Shorts — AI script generation, Veo-driven visuals, edge-tts narration with word-level caption timing, and automated publishing. Drives Google's Veo (no public API) via Playwright over Chrome DevTools Protocol, with YouTube Data API metadata and staggered scheduling.",
    skills: ['Python', 'FastAPI', 'Playwright', 'edge-tts', 'Gemini Veo', 'YouTube API', 'ffmpeg'],
    link: 'https://github.com/mohammedanasfl/shorts-automation',
    tag: 'Automation',
    highlights: ['AI script + Veo visuals', 'Word-level captions', 'Auto YouTube publishing'],
  },
  {
    number: '03',
    title: 'FaceFind',
    description:
      'An AI-powered event photo search: search large event photo libraries via facial-embedding matching from a single selfie upload. Deployed as a containerized service with a live demo, handling the facial-recognition inference pipeline end to end.',
    skills: ['Python', 'FastAPI', 'React', 'Docker', 'Facial Recognition'],
    link: 'https://github.com/mohammedanasfl/Face-Finder',
    tag: 'AI',
    highlights: ['Selfie → face match', 'Containerized + live demo', 'End-to-end inference'],
  },
  {
    number: '04',
    title: 'Saloon API',
    description:
      'A RESTful service for managing a salon business — employees, customers, products, and sales — with JPA/Hibernate persistence to MySQL and Swagger-documented endpoints.',
    skills: ['Java', 'Spring Boot', 'Hibernate/JPA', 'MySQL', 'Maven', 'Swagger'],
    link: 'https://github.com/mohammedanasfl/saloonBackend',
    tag: 'Backend',
    highlights: ['Full CRUD REST API', 'JPA/Hibernate + MySQL', 'Swagger docs'],
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function ProjectCard({ p }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const Comp = p.link ? motion.a : motion.div;
  const linkProps = p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {};

  return (
    <Comp
      ref={ref}
      variants={item}
      {...linkProps}
      onMouseMove={onMove}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 md:p-8"
    >
      {/* cursor-follow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgba(255,42,42,0.13), transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* top row */}
        <div className="mb-5 flex items-start justify-between">
          <span className="font-mono text-3xl font-black text-white/15">{p.number}</span>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand/12 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-brand ring-1 ring-inset ring-brand/25">
              {p.tag}
            </span>
            {p.link ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </span>
            ) : (
              <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white/45">
                In progress
              </span>
            )}
          </div>
        </div>

        {/* title + description */}
        <h3 className="text-xl font-black tracking-tight text-white md:text-2xl">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55">{p.description}</p>

        {/* highlights */}
        <div className="mt-5 flex flex-wrap gap-2">
          {p.highlights.map((h) => (
            <span key={h} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {h}
            </span>
          ))}
        </div>

        {/* skills */}
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {p.skills.map((s) => (
            <span key={s} className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/45">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Comp>
  );
}

const Projects = () => {
  return (
    <section id="projects" className="relative w-full overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-32 h-[34rem] w-[34rem] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(255,42,42,0.12), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs tracking-widest text-brand">// projects</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Selected<br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_white]">work.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/50">
            From GenAI pipelines to REST APIs — real projects across my stack.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-70px' }}
          className="grid gap-4 md:grid-cols-2"
        >
          {projects.map((p) => (
            <ProjectCard key={p.number} p={p} />
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://github.com/mohammedanasfl"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View all 17 repos on GitHub
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
