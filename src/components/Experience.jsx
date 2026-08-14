import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const experiences = [
  {
    company: 'Tarka Labs',
    role: 'Software Developer',
    period: 'Oct 2025 — Present',
    location: 'Chennai',
    current: true,
    points: [
      'Built end-to-end full-stack applications spanning backend services, React frontends, and AI-assisted features.',
      'Designed and implemented Retrieval-Augmented Generation (RAG) pipelines covering document ingestion, embedding generation, retrieval, and LLM response generation.',
      'Developed GenAI-powered document Q&A workflows to improve query resolution accuracy and speed.',
      'Iterated on full-stack architecture through structured development, testing, and code-review cycles.',
    ],
  },
  {
    company: 'Infotel IT Consulting Pvt. Ltd.',
    role: 'Trainee Software Developer',
    period: 'Jun 2024 — Oct 2025',
    location: 'Chennai',
    current: false,
    points: [
      'Automated invoice processing for a Nissan Motors enterprise project (DDI) using AWS Lambda + S3, cutting manual effort by 50%.',
      'Built secure REST APIs enabling dealers to retrieve invoice and transaction data reliably.',
      'Designed scheduled batch workflows processing 60+ report files daily, saving hours of manual work each week.',
      'Developed backend services automating employee attendance and timesheet reporting, improving efficiency by 30%.',
    ],
  },
  {
    company: 'Anna University College of Engineering',
    role: 'B.E. — Computer Science Engineering',
    period: 'Aug 2019 — May 2023',
    location: 'Dindigul',
    current: false,
    tag: 'Education',
    points: [
      'HackerRank certified — Problem Solving, Java, MySQL, and Angular.',
      'LeetCode — 280+ problems solved; active contest participant.',
    ],
  },
];

const Experience = () => {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section id="experience" className="relative w-full overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-40 h-[34rem] w-[34rem] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(255,42,42,0.12), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-brand">// journey</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Experience &amp;<br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">education.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={trackRef} className="relative pl-8 md:pl-12">
          {/* track + animated fill */}
          <div className="absolute bottom-2 left-[9px] top-2 w-px bg-white/12 md:left-[13px]" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-2 left-[9px] top-2 w-px origin-top bg-gradient-to-b from-brand via-brand to-brand/0 md:left-[13px]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
                className="relative"
              >
                {/* dot */}
                <span
                  className={`absolute -left-8 top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 md:-left-12 ${
                    exp.current ? 'border-brand bg-brand' : 'border-white/30 bg-ink'
                  }`}
                >
                  {exp.current && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                  )}
                </span>

                {/* card */}
                <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-brand/30 hover:bg-white/[0.05] md:p-8">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-black text-white md:text-2xl">{exp.company}</h3>
                        {exp.current && (
                          <span className="rounded-full bg-brand/15 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-brand ring-1 ring-inset ring-brand/30">
                            Current
                          </span>
                        )}
                        {!exp.current && exp.tag && (
                          <span className="rounded-full bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white/60 ring-1 ring-inset ring-white/15">
                            {exp.tag}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-white/60">{exp.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs tracking-wider text-brand">{exp.period}</p>
                      <p className="font-mono text-[11px] tracking-wider text-white/35">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-white/60">
                        <span className="mt-0.5 shrink-0 font-mono text-brand">→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
