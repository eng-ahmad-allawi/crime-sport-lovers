import { motion } from "framer-motion";
import { CaseHeader } from "./CaseHeader";
import { TabNavigation } from "./TabNavigation";
import { TabContent } from "./TabContent";

export const CaseFilesPage = () => {
  return (
    <div className="min-h-screen bg-background film-grain spotlight vignette">
      {/* Soft Center Glow */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, hsl(6 38% 12% / 0.15) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-10 max-w-5xl">
        <CaseHeader />
        <TabNavigation />
        <TabContent />
      </div>
    </div>
  );
};
