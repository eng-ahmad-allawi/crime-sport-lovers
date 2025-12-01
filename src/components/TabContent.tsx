import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { CrimeSceneTab } from "./tabs/CrimeSceneTab";
import { SuspectsTab } from "./tabs/SuspectsTab";
import { MemoryArchiveTab } from "./tabs/MemoryArchiveTab";
import { TimelineTab } from "./tabs/TimelineTab";
import { InvestigationTab } from "./tabs/InvestigationTab";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, LockOpen } from "lucide-react";
import { useState, useEffect } from "react";

const tabComponents = [
  CrimeSceneTab,
  SuspectsTab,
  MemoryArchiveTab,
  TimelineTab,
  InvestigationTab,
];

export const TabContent = () => {
  const { currentTab, unlockedTabs, unlockTab, setShowInvestigationBoard } = useGameStore();
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

  const CurrentTabComponent = tabComponents[currentTab];
  const isLastTab = currentTab === tabComponents.length - 1;
  const nextTabLocked = !unlockedTabs.includes(currentTab + 1);

  const handleNext = async () => {
    if (isLastTab) {
      setShowInvestigationBoard(true);
    } else {
      setIsUnlocking(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      unlockTab(currentTab + 1);
      setIsUnlocking(false);
    }
  };

  return (
    <div className="relative">
      {/* Content Area */}
      <div className="investigation-card min-h-[400px] md:min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="p-4 md:p-8"
          >
            <CurrentTabComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Button */}
      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleNext}
          className="group relative px-8 py-6 text-lg bg-burgundy hover:bg-burgundy-light text-cream border-2 border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-deep hover:shadow-gold"
        >
          <span className="relative z-10 flex items-center gap-3">
            {isLastTab ? "الانتقال للوحة التحقيق" : "التالي"}
            
            {/* Lock Animation */}
            {!isLastTab && nextTabLocked && (
              <motion.div
                animate={isUnlocking ? { rotate: [0, -15, 15, -10, 0], scale: [1, 1.2, 0] } : {}}
                transition={{ duration: 0.6 }}
              >
                {isUnlocking ? (
                  <LockOpen className="w-5 h-5 text-gold" />
                ) : (
                  <Lock className="w-5 h-5 text-gold/70 group-hover:text-gold transition-colors" />
                )}
              </motion.div>
            )}
            
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </span>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-lg bg-gold/0 group-hover:bg-gold/5 transition-colors" />
        </Button>
      </motion.div>
    </div>
  );
};
