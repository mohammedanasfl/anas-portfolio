import { useRef, useState } from 'react';

const fmt = (s) => {
  if (!s || Number.isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const IconBtn = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
  >
    {children}
  </button>
);

export default function VideoReel({ src, label = 'INTRO REEL' }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      setMuted(false);
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onTime = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrent(v.currentTime);
    setProgress(v.currentTime / v.duration);
  };

  const seek = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = frac * v.duration;
    setProgress(frac);
  };

  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/12 bg-ink-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      {/* hover glow ring */}
      <div className="pointer-events-none absolute inset-0 z-30 rounded-3xl ring-1 ring-inset ring-white/5 transition-all duration-500 group-hover:ring-brand/40" aria-hidden="true" />

      <video
        ref={videoRef}
        muted={muted}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onTimeUpdate={onTime}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => { const v = videoRef.current; if (v) v.currentTime = 0; setPlaying(false); setProgress(0); }}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Scrims: full dim when paused (button pops); bottom-only when playing (controls readable) */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`}
        style={{ background: 'radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0.35), rgba(0,0,0,0.55))' }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/50 to-transparent" aria-hidden="true" />

      {/* Top-left label */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] tracking-widest text-white/85 backdrop-blur-md ring-1 ring-inset ring-white/10">
          <span className={`h-1.5 w-1.5 rounded-full ${playing ? 'animate-pulse bg-brand' : 'bg-white/70'}`} />
          {label}
        </span>
      </div>

      {/* Center play button — only when paused */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play intro video"
          className="absolute inset-0 z-20 flex items-center justify-center focus-visible:outline-none"
        >
          <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white/10 ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:ring-brand group-hover:shadow-[0_0_50px_rgba(255,42,42,0.6)]">
            <svg className="ml-1 h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {/* Bottom control bar — visible on hover, and always while paused it's hidden (center btn used) */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 px-4 pb-3 pt-6 transition-all duration-300 ${
          playing ? 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <IconBtn label={playing ? 'Pause' : 'Play'} onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
          {playing ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
          ) : (
            <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </IconBtn>

        {/* progress / seek */}
        <div
          onClick={seek}
          className="group/track relative h-4 flex-1 cursor-pointer"
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-brand" style={{ width: `${progress * 100}%` }} />
          </div>
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/track:opacity-100"
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        <span className="shrink-0 font-mono text-[10px] tabular-nums text-white/80">
          {fmt(current)} / {fmt(duration)}
        </span>

        <IconBtn label={muted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
          {muted ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
          )}
        </IconBtn>
      </div>
    </div>
  );
}
