import { motion } from "framer-motion";
import { caseContent } from "@/data/caseContent";
import { Clock, Video } from "lucide-react";

export const TimelineTab = () => {
  const { timeline } = caseContent;

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Clock className="w-6 h-6 text-gold" />
        <h2 className="text-2xl md:text-3xl font-bold text-gold">الخط الزمني</h2>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 text-muted-foreground mb-8 p-4 bg-wood-dark/50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Video className="w-5 h-5 text-burgundy" />
        <p className="text-sm md:text-base">
          قامت الشرطة بمراجعة دقيقة لتسجيلات كاميرا المراقبة في الممر المؤدي لمكتب الضحية
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute right-6 md:right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold/50 to-burgundy" />

        <div className="space-y-6">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex gap-4 md:gap-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.15 }}
            >
              {/* Time Marker */}
              <div className="flex-shrink-0 w-20 md:w-24 relative z-10">
                <div className="w-4 h-4 bg-gold rounded-full absolute right-4 md:right-6 top-3 border-2 border-wood-dark shadow-gold" />
                <div className="pt-1 pr-12 md:pr-14">
                  <span className="text-gold font-bold text-base md:text-lg whitespace-nowrap drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                    {item.time}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="flex-1 p-4 md:p-5 bg-card rounded-lg border border-border hover:border-gold/30 transition-colors mr-4">
                <p className="text-cream text-sm md:text-base leading-relaxed">
                  {item.event}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* End Marker */}
        <motion.div
          className="relative flex items-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex-shrink-0 w-12 md:w-16 relative">
            <div className="w-6 h-6 bg-burgundy rounded-full absolute right-3 md:right-5 border-2 border-gold flex items-center justify-center">
              <span className="text-cream text-xs">✕</span>
            </div>
          </div>
          <div className="flex-1 p-4 bg-burgundy/20 rounded-lg border-2 border-burgundy/50 mr-4">
            <p className="text-burgundy font-bold text-sm md:text-base">
              لحظة الوفاة - 10:15 مساءً
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
