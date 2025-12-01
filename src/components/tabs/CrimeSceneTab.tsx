import { motion } from "framer-motion";
import { caseContent } from "@/data/caseContent";
import { AlertTriangle, FileText, Eye } from "lucide-react";

export const CrimeSceneTab = () => {
  const { crimeScene } = caseContent;

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <section>
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AlertTriangle className="w-6 h-6 text-burgundy" />
          <h2 className="text-2xl md:text-3xl font-bold text-gold">{crimeScene.summary.title}</h2>
        </motion.div>

        {/* Threat Section */}
        <motion.div
          className="mb-6 p-4 md:p-6 bg-wood-dark/50 rounded-lg border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-burgundy rounded-full" />
            التهديد السابق
          </h3>
          <p className="text-cream leading-relaxed whitespace-pre-line text-sm md:text-base">
            {crimeScene.summary.threat}
          </p>
        </motion.div>

        {/* Crime Night Section */}
        <motion.div
          className="mb-6 p-4 md:p-6 bg-wood-dark/50 rounded-lg border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-burgundy rounded-full" />
            ليلة الجريمة
          </h3>
          <p className="text-cream leading-relaxed whitespace-pre-line text-sm md:text-base">
            {crimeScene.summary.crimeNight}
          </p>
        </motion.div>

        {/* Forensic Report */}
        <motion.div
          className="p-4 md:p-6 bg-burgundy/10 rounded-lg border-2 border-burgundy/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-burgundy mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            تقرير الطب الشرعي الأولي
          </h3>
          <p className="text-cream leading-relaxed whitespace-pre-line text-sm md:text-base">
            {crimeScene.summary.forensicReport}
          </p>
        </motion.div>
      </section>

      {/* Inspection Section */}
      <section>
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Eye className="w-6 h-6 text-gold" />
          <h2 className="text-2xl md:text-3xl font-bold text-gold">{crimeScene.inspection.title}</h2>
        </motion.div>

        <motion.p
          className="text-cream mb-6 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {crimeScene.inspection.intro}
        </motion.p>

        <div className="grid gap-4">
          {crimeScene.inspection.items.map((item, index) => (
            <motion.div
              key={item.name}
              className="p-4 bg-card rounded-lg border border-border hover:border-gold/30 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <h4 className="font-bold text-gold mb-2">{item.name}</h4>
              <p className="text-cream/80 text-sm md:text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
