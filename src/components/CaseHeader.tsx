import { motion } from "framer-motion";
import { caseContent } from "@/data/caseContent";

export const CaseHeader = () => {
  return (
    <motion.header
      className="relative py-6 md:py-10 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Stamp Effect */}
      <motion.div
        className="absolute top-2 left-4 md:left-10 -rotate-12 opacity-60"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: -12 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="border-2 border-burgundy rounded px-3 py-1">
          <span className="text-burgundy text-sm md:text-base font-bold tracking-wider">سري للغاية</span>
        </div>
      </motion.div>

      {/* Case Number */}
      <motion.div
        className="inline-block mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <div className="h-px w-8 md:w-16 bg-gold/30" />
          <span className="text-sm md:text-base tracking-widest">ملف القضية رقم</span>
          <div className="h-px w-8 md:w-16 bg-gold/30" />
        </div>
        <p className="text-gold text-2xl md:text-3xl font-bold mt-1 text-shadow-gold">
          {caseContent.caseNumber}
        </p>
      </motion.div>

      {/* Case Title */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold text-shadow-gold"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {caseContent.caseTitle}
      </motion.h1>

      {/* Decorative Line */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-4"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="h-px w-16 md:w-32 bg-gradient-to-l from-gold/50 to-transparent" />
        <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
        </svg>
        <div className="h-px w-16 md:w-32 bg-gradient-to-r from-gold/50 to-transparent" />
      </motion.div>
    </motion.header>
  );
};
