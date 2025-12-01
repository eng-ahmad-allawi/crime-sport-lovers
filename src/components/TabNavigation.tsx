import { motion, AnimatePresence } from "framer-motion";
import { Lock, LockOpen, FileText, Users, Archive, Clock, Search } from "lucide-react";
import { caseContent } from "@/data/caseContent";
import { useGameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";

const tabIcons = {
  "crime-scene": FileText,
  "suspects": Users,
  "archive": Archive,
  "timeline": Clock,
  "investigation": Search,
};

export const TabNavigation = () => {
  const { currentTab, unlockedTabs, setCurrentTab } = useGameStore();

  const handleTabClick = (tabId: number) => {
    if (unlockedTabs.includes(tabId)) {
      setCurrentTab(tabId);
    }
  };

  return (
    <nav className="relative mb-8">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {caseContent.tabs.map((tab, index) => {
          const isLocked = !unlockedTabs.includes(tab.id);
          const isActive = currentTab === tab.id;
          const Icon = tabIcons[tab.icon as keyof typeof tabIcons] || FileText;

          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              disabled={isLocked}
              className={cn(
                "relative group px-3 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300",
                "flex items-center gap-2 text-sm md:text-base",
                isActive && "bg-card border-2 border-gold/50 shadow-gold",
                !isActive && !isLocked && "bg-card/50 border border-border hover:bg-card hover:border-gold/30",
                isLocked && "bg-muted/50 border border-border/50 cursor-not-allowed opacity-60"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={!isLocked ? { scale: 1.02 } : {}}
              whileTap={!isLocked ? { scale: 0.98 } : {}}
            >
              {/* Icon */}
              <Icon className={cn(
                "w-4 h-4 md:w-5 md:h-5",
                isActive ? "text-gold" : "text-muted-foreground"
              )} />

              {/* Tab Title */}
              <span className={cn(
                "font-medium hidden sm:inline",
                isActive ? "text-gold" : isLocked ? "text-muted-foreground" : "text-cream"
              )}>
                {tab.title}
              </span>

              {/* Tab Number (Mobile) */}
              <span className={cn(
                "font-bold sm:hidden",
                isActive ? "text-gold" : isLocked ? "text-muted-foreground" : "text-cream"
              )}>
                {index + 1}
              </span>

              {/* Lock Icon */}
              <AnimatePresence mode="wait">
                {isLocked && (
                  <motion.div
                    key="lock"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-2 -left-2 bg-wood-dark rounded-full p-1"
                  >
                    <Lock className="w-3 h-3 md:w-4 md:h-4 text-gold/70" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
