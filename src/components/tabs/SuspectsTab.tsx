import { motion } from "framer-motion";
import { caseContent } from "@/data/caseContent";
import { User, AlertCircle } from "lucide-react";

export const SuspectsTab = () => {
  const { suspects } = caseContent;

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <User className="w-6 h-6 text-burgundy" />
        <h2 className="text-2xl md:text-3xl font-bold text-gold">المشتبه بهم</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {suspects.map((suspect, index) => (
          <motion.div
            key={suspect.id}
            className="group relative p-6 bg-card rounded-lg border-2 border-border hover:border-burgundy/50 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            whileHover={{ y: -4 }}
          >
            {/* Suspect Number Badge */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-burgundy rounded-full flex items-center justify-center border-2 border-gold/30">
              <span className="text-cream font-bold text-sm">{index + 1}</span>
            </div>

            {/* Header */}
            <div className="mb-4 pb-4 border-b border-border">
              <h3 className="text-xl md:text-2xl font-bold text-gold">{suspect.name}</h3>
              <p className="text-muted-foreground text-sm md:text-base">{suspect.role}</p>
            </div>

            {/* Motive */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-burgundy">
                <AlertCircle className="w-4 h-4" />
                <span className="font-semibold text-sm">الدافع المحتمل</span>
              </div>
              <p className="text-cream/90 text-sm md:text-base leading-relaxed">
                {suspect.motive}
              </p>
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/20 rounded-bl-lg" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
