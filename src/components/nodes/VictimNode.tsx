import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import { Skull } from "lucide-react";

interface VictimNodeProps {
  data: {
    name: string;
    role: string;
  };
}

export const VictimNode = ({ data }: VictimNodeProps) => {
  return (
    <motion.div
      className="relative bg-burgundy/90 border-2 border-gold rounded-lg p-6 min-w-[200px] shadow-deep"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-5 !h-5 !bg-gold !border-2 !border-burgundy !opacity-60 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-5 !h-5 !bg-gold !border-2 !border-burgundy !opacity-60 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="!w-5 !h-5 !bg-gold !border-2 !border-burgundy !opacity-60 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!w-5 !h-5 !bg-gold !border-2 !border-burgundy !opacity-60 hover:!opacity-100 !transition-opacity"
      />

      {/* Icon */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-burgundy rounded-full border-2 border-gold flex items-center justify-center">
        <Skull className="w-4 h-4 text-gold" />
      </div>

      {/* Content */}
      <div className="text-center pt-2">
        <h3 className="text-xl font-bold text-gold mb-1">{data.name}</h3>
        <p className="text-cream/80 text-sm">{data.role}</p>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-gold/50 rounded-tr" />
      <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-gold/50 rounded-tl" />
      <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-gold/50 rounded-br" />
      <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-gold/50 rounded-bl" />
    </motion.div>
  );
};
