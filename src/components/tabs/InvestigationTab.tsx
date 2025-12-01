import { motion } from "framer-motion";
import { caseContent } from "@/data/caseContent";
import { FlaskConical, MessageSquare, AlertTriangle } from "lucide-react";

export const InvestigationTab = () => {
  const { investigation } = caseContent;

  return (
    <div className="space-y-8">
      {/* Lab Results */}
      <section>
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FlaskConical className="w-6 h-6 text-burgundy" />
          <h2 className="text-2xl md:text-3xl font-bold text-gold">{investigation.labResults.title}</h2>
        </motion.div>

        <motion.div
          className="p-4 md:p-6 bg-wood-dark/50 rounded-lg border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
            <p className="text-sm font-medium text-gold">تقرير قسم السموم والكيمياء الشرعية</p>
          </div>
          <p className="text-cream leading-relaxed whitespace-pre-line text-sm md:text-base">
            {investigation.labResults.content}
          </p>
        </motion.div>
      </section>

      {/* Statements */}
      <section>
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MessageSquare className="w-6 h-6 text-gold" />
          <h2 className="text-2xl md:text-3xl font-bold text-gold">إفادات الاستجواب</h2>
        </motion.div>

        <div className="space-y-4">
          {investigation.statements.map((statement, index) => (
            <motion.div
              key={statement.suspect}
              className="p-4 md:p-6 bg-card rounded-lg border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <h3 className="text-lg font-bold text-gold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-burgundy rounded-full" />
                {statement.suspect}
              </h3>
              
              <blockquote className="text-cream/90 text-sm md:text-base leading-relaxed pr-4 border-r-2 border-gold/30 mb-4">
                {statement.statement}
              </blockquote>

              {statement.note && (
                <div className="flex items-start gap-2 text-sm bg-muted/30 p-3 rounded">
                  <span className="text-gold font-medium">ملاحظة المحقق:</span>
                  <span className="text-cream/70">{statement.note}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.div
        className="p-6 bg-gradient-to-br from-burgundy/20 to-transparent rounded-lg border-2 border-burgundy/30 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-xl font-bold text-gold mb-2">هل جمعت كل الأدلة؟</h3>
        <p className="text-cream/80 text-sm md:text-base">
          انتقل للوحة التحقيق لربط الخيوط والوصول للقاتل الحقيقي
        </p>
      </motion.div>
    </div>
  );
};
