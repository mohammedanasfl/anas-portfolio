import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const strokeIcon = (d) => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const channels = [
  {
    label: 'Email',
    value: 'nanass21072001@gmail.com',
    href: 'mailto:nanass21072001@gmail.com',
    icon: strokeIcon('M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'),
  },
  {
    label: 'Phone',
    value: '+91 63812 21934',
    href: 'tel:+916381221934',
    icon: strokeIcon('M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'),
  },
  {
    label: 'GitHub',
    value: 'github.com/mohammedanasfl',
    href: 'https://github.com/mohammedanasfl',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'in/mohammed-anas-n',
    href: 'https://www.linkedin.com/in/mohammed-anas-n-83289a221/',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    value: '280+ solved',
    href: 'https://leetcode.com/u/mohammedanas/',
    icon: strokeIcon('M8 9l-3 3 3 3m8-6l3 3-3 3M14 4l-4 16'),
  },
];

const inputCls =
  'peer w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '18%']);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${form.name || 'Hello'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:nanass21072001@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section ref={ref} id="contact" className="relative w-full overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-32">
      {/* Huge parallax background word */}
      <motion.h2
        style={{ y }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center text-[22vw] font-black leading-none tracking-tighter text-white/[0.03]"
      >
        LET&apos;S TALK
      </motion.h2>
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(255,42,42,0.14), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: heading + channels */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="font-mono text-xs tracking-widest text-brand">// contact</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Let's build<br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">something.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
            Open to full-stack, backend, and GenAI opportunities. Have a project or a role in
            mind? Reach out — I usually reply within a day.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-brand/30 hover:bg-white/[0.05]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-inset ring-brand/25 transition-colors group-hover:bg-brand group-hover:text-white">
                  {c.icon}
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40">{c.label}</span>
                  <span className="block text-sm font-semibold text-white">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8"
        >
          {sent ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand ring-1 ring-inset ring-brand/30">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-black text-white">Your mail app is opening…</h3>
              <p className="mt-2 max-w-xs text-sm text-white/55">
                If nothing happened, email me directly at{' '}
                <a href="mailto:nanass21072001@gmail.com" className="text-brand underline underline-offset-2">nanass21072001@gmail.com</a>.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
              >
                Back to form
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="c-name" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-white/45">Name</label>
                <input id="c-name" required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-white/45">Email</label>
                <input id="c-email" type="email" required value={form.email} onChange={set('email')} placeholder="you@example.com" className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-message" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-white/45">Message</label>
                <textarea id="c-message" required rows={5} value={form.message} onChange={set('message')} placeholder="Tell me about your project or role…" className={`${inputCls} resize-none`} />
              </div>
              <button
                type="submit"
                className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(255,42,42,0.6)] transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Send Message
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
