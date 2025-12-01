import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { caseContent } from "@/data/caseContent";
import { Button } from "@/components/ui/button";
import { X, Target, CheckCircle, XCircle, Award } from "lucide-react";

interface AccusationModalProps {
  onClose: () => void;
}

export const AccusationModal = ({ onClose }: AccusationModalProps) => {
  const { accusationResult, setAccusationResult } = useGameStore();
  const [selectedKiller, setSelectedKiller] = useState("");
  const [weapon, setWeapon] = useState("");
  const [method, setMethod] = useState("");

  const suspects = caseContent.suspects;
  const solution = caseContent.solution;

  const isFormValid = selectedKiller && weapon.trim() && method.trim();

  const checkAnswer = () => {
    const isKillerCorrect = selectedKiller === solution.killer;
    const isWeaponCorrect = solution.weapon.some(w => 
      weapon.toLowerCase().includes(w.toLowerCase())
    );
    const isMethodCorrect = solution.methodKeywords.some(k => 
      method.toLowerCase().includes(k.toLowerCase())
    );

    if (isKillerCorrect && isWeaponCorrect && isMethodCorrect) {
      setAccusationResult("correct");
    } else {
      setAccusationResult("incorrect");
    }
  };

  const resetForm = () => {
    setAccusationResult("none");
    setSelectedKiller("");
    setWeapon("");
    setMethod("");
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative bg-card border-2 border-gold/50 rounded-xl shadow-gold max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gold">نموذج الاتهام الرسمي</h2>
              <p className="text-muted-foreground text-sm">القضية {caseContent.caseNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-wood rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {accusationResult === "none" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Killer Selection */}
                <div>
                  <label className="block text-gold font-medium mb-3">اسم القاتل</label>
                  <div className="grid grid-cols-2 gap-3">
                    {suspects.map((suspect) => (
                      <button
                        key={suspect.id}
                        onClick={() => setSelectedKiller(suspect.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-right ${
                          selectedKiller === suspect.id
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border hover:border-gold/50 text-cream"
                        }`}
                      >
                        <span className="font-bold">{suspect.name}</span>
                        <span className="text-xs text-muted-foreground block mt-1">{suspect.role}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weapon */}
                <div>
                  <label className="block text-gold font-medium mb-3">أداة الجريمة</label>
                  <input
                    type="text"
                    value={weapon}
                    onChange={(e) => setWeapon(e.target.value)}
                    placeholder="ما هي الأداة المستخدمة في القتل؟"
                    className="w-full p-4 bg-wood-dark border-2 border-border rounded-lg text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
                    dir="rtl"
                  />
                </div>

                {/* Method */}
                <div>
                  <label className="block text-gold font-medium mb-3">الدليل السلوكي وطريقة التسميم</label>
                  <textarea
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    placeholder="كيف تم تنفيذ الجريمة؟ اشرح طريقة وصول السم للضحية..."
                    className="w-full p-4 bg-wood-dark border-2 border-border rounded-lg text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors min-h-[120px] resize-none"
                    dir="rtl"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={checkAnswer}
                  disabled={!isFormValid}
                  className="w-full py-6 text-lg bg-burgundy hover:bg-burgundy-light text-cream border-2 border-gold/30 hover:border-gold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تقديم الاتهام
                </Button>
              </motion.div>
            )}

            {accusationResult === "correct" && (
              <motion.div
                key="correct"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Award className="w-10 h-10 text-gold" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gold mb-4">تهانينا! حللت القضية</h3>
                
                <div className="text-right bg-wood-dark/50 rounded-lg p-6 mt-6 border border-border">
                  <h4 className="text-lg font-bold text-gold mb-4">الحل الكامل</h4>
                  <p className="text-cream leading-relaxed whitespace-pre-line text-sm">
                    {solution.fullExplanation}
                  </p>
                </div>

                <Button
                  onClick={onClose}
                  className="mt-6 bg-gold hover:bg-gold-light text-wood-dark"
                >
                  إغلاق
                </Button>
              </motion.div>
            )}

            {accusationResult === "incorrect" && (
              <motion.div
                key="incorrect"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-20 h-20 bg-burgundy/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <XCircle className="w-10 h-10 text-burgundy" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-burgundy mb-4">استنتاج خاطئ!</h3>
                <p className="text-cream/80 mb-6">
                  راجع الأدلة والشهادات بعناية أكبر وحاول مرة أخرى.
                  <br />
                  القاتل الحقيقي لا يزال طليقاً...
                </p>

                <Button
                  onClick={resetForm}
                  className="bg-burgundy hover:bg-burgundy-light text-cream"
                >
                  المحاولة مرة أخرى
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr" />
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl" />
      </motion.div>
    </motion.div>
  );
};
