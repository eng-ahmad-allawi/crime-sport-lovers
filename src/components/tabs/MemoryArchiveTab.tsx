import { motion } from "framer-motion";
import { caseContent } from "@/data/caseContent";
import { Film, Clock, User } from "lucide-react";
import { useState } from "react";

export const MemoryArchiveTab = () => {
  const { memoryArchive } = caseContent;
  const [expandedScene, setExpandedScene] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Film className="w-6 h-6 text-gold" />
        <h2 className="text-2xl md:text-3xl font-bold text-gold">أرشيف الذاكرة</h2>
      </motion.div>

      <motion.p
        className="text-cream/80 mb-6 text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        شهادات الشهود وإعادة بناء الأحداث التي سبقت الجريمة
      </motion.p>

      <div className="space-y-4">
        {memoryArchive.map((scene, index) => (
          <motion.div
            key={scene.id}
            className="bg-card rounded-lg border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            {/* Scene Header */}
            <button
              onClick={() => setExpandedScene(expandedScene === scene.id ? null : scene.id)}
              className="w-full p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-wood-dark/30 transition-colors text-right"
            >
              <div className="flex items-start md:items-center gap-4">
                <div className="w-10 h-10 bg-burgundy/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gold">{scene.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {scene.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {scene.suspect}
                    </span>
                  </div>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: expandedScene === scene.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="self-end md:self-center"
              >
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.div>
            </button>

            {/* Scene Content */}
            <motion.div
              initial={false}
              animate={{
                height: expandedScene === scene.id ? "auto" : 0,
                opacity: expandedScene === scene.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 md:p-6 pt-0 border-t border-border">
                <p className="text-cream leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {scene.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
