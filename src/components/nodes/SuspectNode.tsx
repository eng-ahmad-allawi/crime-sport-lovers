import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import { User, AlertCircle } from "lucide-react";
import { useState } from "react";

interface SuspectNodeProps {
  data: {
    name: string;
    role: string;
    motive: string;
  };
}

export const SuspectNode = ({ data }: SuspectNodeProps) => {
  const [showMotive, setShowMotive] = useState(false);

  return (
    <motion.div
      className="relative bg-card border-2 border-border rounded-lg p-4 min-w-[180px] max-w-[220px] shadow-card hover:border-gold/50 transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setShowMotive(true)}
      onMouseLeave={() => setShowMotive(false)}
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-5 !h-5 !bg-gold !border-2 !border-card !opacity-60 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-5 !h-5 !bg-gold !border-2 !border-card !opacity-60 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="!w-5 !h-5 !bg-gold !border-2 !border-card !opacity-60 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!w-5 !h-5 !bg-gold !border-2 !border-card !opacity-60 hover:!opacity-100 !transition-opacity"
      />

      {/* Icon */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-wood rounded-full border border-gold/50 flex items-center justify-center">
        <User className="w-3 h-3 text-gold" />
      </div>

      {/* Content */}
      <div className="text-center pt-2">
        <h3 className="text-lg font-bold text-gold mb-1">{data.name}</h3>
        <p className="text-muted-foreground text-xs">{data.role}</p>
      </div>

      {/* Motive Tooltip */}
      {showMotive && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 bg-wood-dark border border-border rounded-lg shadow-deep z-50 w-64"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex items-center gap-2 text-burgundy mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="font-semibold text-xs">الدافع</span>
          </div>
          <p className="text-cream/80 text-xs leading-relaxed">{data.motive}</p>
          
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-wood-dark border-t border-l border-border rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
};
