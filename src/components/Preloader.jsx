import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), prefersReduced ? 600 : 2000);
    return () => clearTimeout(t);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-ink"
        >
          <div className="bg-dotgrid absolute inset-0 opacity-30" aria-hidden="true" />

          <div className="relative flex flex-col items-center">
            <span className="mb-4 font-mono text-[11px] tracking-[0.3em] text-white/40">LOADING PORTFOLIO</span>

            {/* Name with a red clip-reveal wipe */}
            <div className="relative text-4xl font-black tracking-tighter md:text-6xl">
              <span className="text-white/12">Mohammed Anas.</span>
              <motion.span
                className="absolute inset-0 overflow-hidden whitespace-nowrap text-white"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: prefersReduced ? 0.3 : 1.5, ease: 'easeInOut', delay: 0.15 }}
              >
                Mohammed Anas<span className="text-brand">.</span>
              </motion.span>
            </div>

            {/* progress line */}
            <div className="relative mt-6 h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: prefersReduced ? 0.4 : 1.9, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
