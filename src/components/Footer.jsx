const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-ink px-6 pb-10 pt-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-10 font-mono text-[11px] tracking-wider text-white/45 md:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <span className="mb-1 text-white/70">// services</span>
            <p>Full-Stack Development</p>
            <p>GenAI &amp; RAG Systems</p>
            <p>Backend Engineering</p>
          </div>
          <div className="flex flex-col gap-1.5 md:items-center">
            <span className="mb-1 text-white/70">// based in</span>
            <p>Chennai, India</p>
            <a href="#projects" className="text-brand transition-colors hover:text-brand-soft">View Work →</a>
          </div>
          <div className="flex flex-col gap-1.5 md:items-end">
            <span className="mb-1 text-white/70">// status</span>
            <p className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Open to Opportunities
            </p>
            <p>{year}</p>
          </div>
        </div>

        {/* Huge name */}
        <div className="flex w-full justify-center overflow-hidden py-16 md:py-20">
          <h2 className="select-none text-center text-[15vw] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)] md:text-[12vw]">
            Mohammed Anas<span className="text-brand [-webkit-text-stroke:0]">.</span>
          </h2>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-mono text-[11px] text-white/40">
            © {year} Mohammed Anas N — built with React &amp; Three.js
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-wider text-white/50">
            <a href="mailto:nanass21072001@gmail.com" className="transition-colors hover:text-white">Email</a>
            <a href="https://github.com/mohammedanasfl" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">GitHub</a>
            <a href="https://www.linkedin.com/in/mohammed-anas-n-83289a221/" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
            <a href="https://leetcode.com/u/mohammedanas/" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">LeetCode</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
            <a href="#home" className="transition-colors hover:text-white">↑ Top</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
