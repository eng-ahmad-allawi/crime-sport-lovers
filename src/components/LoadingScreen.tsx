import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [text, setText] = useState("");
  const fullText = "جاري فتح الملف السري 409-B...";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wood-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/60" />
      
      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(6 38% 12% / 0.3) 0%, transparent 50%)",
        }}
      />
      
      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Folder Icon */}
        <motion.div
          className="relative"
          animate={{ 
            rotateY: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <svg
            width="120"
            height="100"
            viewBox="0 0 120 100"
            className="text-gold"
          >
            <path
              d="M10 25 L10 85 C10 90 15 95 20 95 L100 95 C105 95 110 90 110 85 L110 35 C110 30 105 25 100 25 L55 25 L45 15 L20 15 C15 15 10 20 10 25 Z"
              fill="currentColor"
              opacity="0.2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M5 30 L5 80 C5 85 10 90 15 90 L95 90 C100 90 105 85 105 80 L115 40 C115 35 110 30 105 30 L5 30 Z"
              fill="hsl(var(--wood))"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x="60"
              y="65"
              textAnchor="middle"
              fill="currentColor"
              fontSize="14"
              fontWeight="bold"
              fontFamily="IBM Plex Sans Arabic"
            >
              سري
            </text>
          </svg>
          
          {/* Lock Animation */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <svg width="24" height="28" viewBox="0 0 24 28" className="text-gold">
              <rect x="4" y="12" width="16" height="14" rx="2" fill="currentColor" opacity="0.8"/>
              <path
                d="M8 12 V8 C8 5 10 3 12 3 C14 3 16 5 16 8 V12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-gold text-xl md:text-2xl font-medium min-h-[2rem] text-shadow-gold">
            {text}
            <motion.span
              className="inline-block w-0.5 h-6 bg-gold mr-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </p>
        </div>

        {/* Loading Spinner */}
        <motion.div
          className="relative w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="hsl(var(--gold) / 0.2)"
              strokeWidth="3"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="hsl(var(--gold))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="40 140"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Film Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
};
