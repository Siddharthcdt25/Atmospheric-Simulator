/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Play, Sparkles, HelpCircle, ArrowUp, Compass } from 'lucide-react';

interface SnowflakeItem {
  id: number;
  startX: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  initialRotate: number;
  rotateSpeed: number;
}

interface BalloonItem {
  id: number;
  startX: number;
  delay: number;
  duration: number;
  width: number;
  height: number;
  drift: number;
  tilt: number;
  color: string;
  stringColor: string;
}

// Curated luxury corporate palette for formal balloons
const BALLOON_PALETTE = [
  { name: "Sovereign Gold", fill: "#d4af37", string: "#aa8c2c" },
  { name: "Champagne Pearl", fill: "#ece2ca", string: "#beb6a3" },
  { name: "Burgundy Velvet", fill: "#800020", string: "#5e0017" },
  { name: "Deep Sapphire", fill: "#1a365d", string: "#122541" },
  { name: "Emerald Slate", fill: "#2e5a44", string: "#203f30" },
  { name: "Rose Damask", fill: "#c08081", string: "#9c6768" },
  { name: "Warm Bronze", fill: "#cd7f32", string: "#9b6026" },
];

export default function App() {
  const [activeType, setActiveType] = useState<'snowflakes' | 'balloons' | null>(null);
  const [snowflakes, setSnowflakes] = useState<SnowflakeItem[]>([]);
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Trigger snowflakes animation
  const triggerSnowflakes = () => {
    // Clear and stop currently running actions
    setActiveType(null);
    setBalloons([]);
    
    // Generate organic distinct snowflake paths
    const newSnowflakes: SnowflakeItem[] = Array.from({ length: 45 }).map((_, i) => {
      const startX = Math.random() * 92 + 4; // Margin safeguards
      const delay = Math.random() * 2.0; // Stagger entrance
      const duration = 2.5 + Math.random() * 1.5; // Stays active throughout 5s window
      const size = 18 + Math.random() * 8; // Medium range centering ~22px
      const drift = 6 + Math.random() * 8; // Gentle horizontal sway
      const initialRotate = Math.random() * 360;
      const rotateSpeed = -90 + Math.random() * 185; 

      return { id: i, startX, delay, duration, size, drift, initialRotate, rotateSpeed };
    });

    setSnowflakes(newSnowflakes);
    setActiveType('snowflakes');
    setTimeLeft(5.0);
  };

  // Trigger balloons animation
  const triggerBalloons = () => {
    // Clear and stop currently running actions
    setActiveType(null);
    setSnowflakes([]);

    // Generate organic distinct balloon paths
    const newBalloons: BalloonItem[] = Array.from({ length: 30 }).map((_, i) => {
      const startX = Math.random() * 90 + 5; // Margin safeguards
      const delay = Math.random() * 1.8; // Stagger entrance
      const duration = 2.8 + Math.random() * 1.4; // Controlled ascent rate
      const width = 36 + Math.random() * 8; // Balanced medium-sized width
      const height = width * 1.28; // Elegant vertical taper
      const drift = 5 + Math.random() * 6; // Drifting factor
      const tilt = -12 + Math.random() * 24; // Slight air tilts
      const colorScheme = BALLOON_PALETTE[Math.floor(Math.random() * BALLOON_PALETTE.length)];

      return {
        id: i,
        startX,
        delay,
        duration,
        width,
        height,
        drift,
        tilt,
        color: colorScheme.fill,
        stringColor: colorScheme.string,
      };
    });

    setBalloons(newBalloons);
    setActiveType('balloons');
    setTimeLeft(5.0);
  };

  // High-performance countdown clock with 100ms granularity
  useEffect(() => {
    if (!activeType) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);
          setActiveType(null); // Smooth AnimatePresence fade out triggers on null state
          return 0;
        }
        return parseFloat((prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeType]);

  // Visual percentages for the dynamic progress bar
  const progressPercent = (timeLeft / 5.0) * 100;

  return (
    <div className="relative min-h-screen text-slate-900 flex flex-col justify-between p-0 overflow-hidden select-none" id="app-container">
      {/* Geometric Dot Grid Underlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} id="grid-underlay" />

      {/* Header Brand Seal */}
      <header className="relative w-full h-24 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 md:px-16 z-20" id="header-brand">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 font-mono">System Interface</span>
          <h1 className="text-lg md:text-xl font-light tracking-tight text-slate-800">
            AERODYNAMICS <span className="font-bold">SYSTEM</span>
          </h1>
        </div>
        <div className="flex gap-8 items-center">
          <div className="text-right hidden sm:block">
            <div className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">Aero-Engine Status</div>
            <div className={`text-xs font-mono uppercase tracking-tighter font-semibold ${
              activeType ? 'text-blue-600' : 'text-emerald-600'
            }`}>
              ● {activeType ? `${activeType} Active` : 'Nominal Operational'}
            </div>
          </div>
          <div className="h-10 w-[1px] bg-slate-200 hidden sm:block"></div>
          <div className="text-xs font-mono tabular-nums text-slate-500">40.7128° N, 74.0060° W</div>
        </div>
      </header>

      {/* Centerpiece Interactive Console */}
      <main className="relative flex-1 flex flex-col items-center justify-center p-6 py-12 z-10" id="main-content">
        <div 
          className="w-full max-w-xl bg-white border border-slate-200 shadow-2xl p-6 md:p-8 space-y-8 relative"
          id="control-console-card"
        >
          {/* Text Deck */}
          <div className="text-center space-y-2">
            <span className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase font-mono">
              Atmospheric Simulator
            </span>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-800 pt-1">
              GEOMETRIC <span className="font-bold">BALANCE</span>
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Synthesize smooth physical displacements of natural climate elements or helium assets for a five-second simulation sweep.
            </p>
          </div>

          {/* Active Simulation Status Track */}
          <div className="bg-slate-50/80 border border-slate-200/60 rounded-none p-4 space-y-3" id="diagnostics-panel">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Current Phase:</span>
              <span className={`font-semibold tracking-wider text-[10px] uppercase ${
                activeType === 'snowflakes' ? 'text-sky-600' : 
                activeType === 'balloons' ? 'text-rose-600' : 'text-slate-500'
              }`}>
                {activeType === 'snowflakes' ? 'Crystalline Descent' : 
                 activeType === 'balloons' ? 'Buoyant Ascent' : 'Idle State'}
              </span>
            </div>
            
            {/* Countdown and Progress visual state */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400 uppercase tracking-widest">Emission Window Remaining:</span>
                <span className="text-slate-700 font-bold">{timeLeft.toFixed(1)}s</span>
              </div>
              <div className="w-full h-1 bg-slate-200 overflow-hidden rounded-none">
                <div 
                  className={`h-full smooth-all ${
                    activeType === 'snowflakes' ? 'bg-sky-400' : 
                    activeType === 'balloons' ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                  style={{ width: `${progressPercent}%`, transition: activeType ? 'width 100ms linear' : 'width 0.4s ease' }}
                />
              </div>
            </div>
          </div>

          {/* Core Simulation Selection Triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-100 shadow-sm" id="sim-trigger-grid">
            
            {/* Snowflakes Control Area */}
            <button
              onClick={triggerSnowflakes}
              disabled={activeType !== null}
              id="trigger-snowflakes"
              className={`group relative flex flex-col items-center p-6 text-center bg-white hover:bg-slate-50 smooth-all overflow-hidden ${
                activeType === 'snowflakes'
                  ? 'bg-sky-50/20'
                  : activeType !== null
                  ? 'opacity-40 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <div className={`mb-4 w-12 h-12 border border-slate-200 flex items-center justify-center smooth-all ${
                activeType === 'snowflakes' ? 'border-sky-400 text-sky-500 bg-sky-50/40' : 'group-hover:border-slate-400 text-slate-300 group-hover:text-slate-600 bg-white'
              }`}>
                <Snowflake className={`w-5 h-5 ${activeType === 'snowflakes' ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-[0.3em] smooth-all ${
                activeType === 'snowflakes' ? 'text-sky-600' : 'text-slate-500 group-hover:text-slate-900'
              }`}>Snowflakes</span>
              <p className="mt-2 text-[10px] text-slate-400 uppercase tracking-widest">
                Down-draft medium crystal fall
              </p>
              
              {/* Active Stripe Indicator */}
              {activeType === 'snowflakes' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-400" />
              )}
            </button>

            {/* Balloons Control Area */}
            <button
              onClick={triggerBalloons}
              disabled={activeType !== null}
              id="trigger-balloons"
              className={`group relative flex flex-col items-center p-6 text-center bg-white hover:bg-slate-50 smooth-all overflow-hidden ${
                activeType === 'balloons'
                  ? 'bg-amber-50/20'
                  : activeType !== null
                  ? 'opacity-40 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <div className={`mb-4 w-12 h-12 border border-slate-200 flex items-center justify-center smooth-all ${
                activeType === 'balloons' ? 'border-amber-400 text-amber-500 bg-amber-50/40' : 'group-hover:border-slate-400 text-slate-300 group-hover:text-slate-600 bg-white'
              }`}>
                <ArrowUp className={`w-5 h-5 ${activeType === 'balloons' ? 'animate-bounce' : ''}`} />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-[0.3em] smooth-all ${
                activeType === 'balloons' ? 'text-amber-600' : 'text-slate-500 group-hover:text-slate-900'
              }`}>Balloons</span>
              <p className="mt-2 text-[10px] text-slate-400 uppercase tracking-widest">
                Buoyant thermal lift helium
              </p>

              {/* Active Stripe Indicator */}
              {activeType === 'balloons' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500" />
              )}
            </button>
          </div>

          {/* Quick Notice */}
          <div className="flex items-center space-x-2.5 text-xxs text-slate-400 border-t border-slate-100 pt-4" id="disclaimer-note">
            <Sparkles className="w-4 h-4 text-slate-300 shrink-0" />
            <p className="leading-normal">
              Particle dimensions are strictly calibrated to standard medium metrics. Layout is fully responsive and leverages native hardware acceleration.
            </p>
          </div>
        </div>

        {/* Dynamic Log Row mirroring the system state info below main */}
        <div id="simulation-log" className="mt-8 w-full max-w-xl flex justify-between px-2 text-[9px] uppercase tracking-[0.2em] text-slate-400 font-mono">
          <span>READY FOR PROTOCOL</span>
          <span>SYSTEM V.4.1.2</span>
          <span>SECURED INTERFACE</span>
        </div>
      </main>

      {/* Corporate Dashboard Footer */}
      <footer className="w-full h-16 border-t border-slate-200 bg-white flex items-center justify-between px-6 md:px-16 z-20 text-[10px] font-sans text-slate-500" id="footer-branding">
        <div className="flex gap-4 items-center">
          <div className="w-2 h-2 rounded-full bg-slate-900"></div>
          <span className="font-bold uppercase tracking-widest text-[#0f172a]">Operational Control Center</span>
        </div>
        <div className="hidden md:block uppercase tracking-wider">
          © 2026 FORMAL SYSTEMS CORP. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* FULL-SCREEN OVERLAYS WITH SEAMLESS EXIT REMOVAL */}
      <AnimatePresence>
        {activeType === 'snowflakes' && (
          <motion.div
            key="snowflakes-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-40"
            id="snowflake-stage"
          >
            {snowflakes.map((snowflake) => (
              <motion.div
                key={snowflake.id}
                initial={{ y: "-10vh", x: `${snowflake.startX}%`, opacity: 0, rotate: snowflake.initialRotate }}
                animate={{
                  y: "112vh",
                  x: [
                    `${snowflake.startX}%`,
                    `${snowflake.startX + snowflake.drift}%`,
                    `${snowflake.startX - snowflake.drift}%`,
                    `${snowflake.startX + snowflake.drift / 2}%`
                  ],
                  opacity: [0, 0.9, 0.9, 0.6, 0],
                  rotate: snowflake.initialRotate + snowflake.rotateSpeed,
                }}
                transition={{
                  duration: snowflake.duration,
                  delay: snowflake.delay,
                  ease: "linear",
                }}
                className="absolute pointer-events-none"
                style={{ width: snowflake.size, height: snowflake.size }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-sky-400/90 [filter:drop-shadow(0_1px_4px_rgba(56,189,248,0.3))]">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
                  <circle cx="12" cy="12" r="3.5" className="fill-none stroke-sky-400/90" />
                  <path d="M12 5l2.5 2.5m-5 0l2.5-2.5" />
                  <path d="M12 19l2.5-2.5m-5 0l2.5 2.5" />
                  <path d="M5 12l2.5 2.5m0-5L5 12" />
                  <path d="M19 12l-2.5-2.5m0 5L19 12" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeType === 'balloons' && (
          <motion.div
            key="balloons-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-40"
            id="balloon-stage"
          >
            {balloons.map((balloon) => (
              <motion.div
                key={balloon.id}
                initial={{ y: "112vh", x: `${balloon.startX}%`, opacity: 0, rotate: balloon.tilt }}
                animate={{
                  y: "-20vh",
                  x: [
                    `${balloon.startX}%`,
                    `${balloon.startX - balloon.drift}%`,
                    `${balloon.startX + balloon.drift}%`,
                    `${balloon.startX - balloon.drift / 2}%`
                  ],
                  opacity: [0, 0.95, 0.95, 0.85, 0],
                  rotate: [balloon.tilt, -balloon.tilt, balloon.tilt, -balloon.tilt / 2],
                }}
                transition={{
                  duration: balloon.duration,
                  delay: balloon.delay,
                  ease: "easeOut",
                }}
                className="absolute pointer-events-none"
                style={{ width: balloon.width, height: balloon.height }}
              >
                <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-[0_8px_16px_rgba(15,23,42,0.18)]" style={{ color: balloon.color }}>
                  {/* Balloon Main Bubble Canvas */}
                  <path d="M12 2 C 5.5 2, 1 6.5, 1 12.5 C 1 18.5, 5.5 22.5, 12 22.5 C 18.5 22.5, 23 18.5, 23 12.5 C 23 6.5, 18.5 2, 12 2 Z" fill="currentColor" />
                  
                  {/* Elegant High-end White Gloss Crescent Overlay */}
                  <ellipse cx="7.5" cy="8.2" rx="2.2" ry="3.8" transform="rotate(-15 7.5 8.2)" fill="rgba(255, 255, 255, 0.42)" />
                  
                  {/* Knot Attachment */}
                  <path d="M12 22.5 L 8.5 25.5 L 15.5 25.5 Z" fill="currentColor" />
                  
                  {/* Rigid Swaying Hanging String */}
                  <path d="M12 25.5 Q 14 28.5, 12 31.5 T 12 38" fill="none" stroke={balloon.stringColor} strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
