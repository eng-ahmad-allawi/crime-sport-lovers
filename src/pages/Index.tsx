import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CaseFilesPage } from "@/components/CaseFilesPage";
import { InvestigationBoard } from "@/components/InvestigationBoard";
import { useGameStore } from "@/store/gameStore";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const { showInvestigationBoard, setIsLoading } = useGameStore();

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showLoading && !showInvestigationBoard && (
          <CaseFilesPage key="casefiles" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInvestigationBoard && (
          <InvestigationBoard key="board" />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
