import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface StickyNoteNodeProps {
  id: string;
  data: {
    content: string;
    onDelete: (id: string) => void;
    onContentChange: (id: string, content: string) => void;
  };
}

export const StickyNoteNode = ({ id, data }: StickyNoteNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(data.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    data.onContentChange(id, content);
  };

  const rotation = Math.random() * 6 - 3; // Random rotation between -3 and 3 degrees

  return (
    <motion.div
      className="relative bg-sticky-note text-wood-dark p-4 min-w-[150px] max-w-[200px] shadow-lg cursor-grab active:cursor-grabbing"
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ scale: 0, rotate: rotation - 10 }}
      animate={{ scale: 1, rotate: rotation }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      whileHover={{ scale: 1.02, zIndex: 100 }}
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-4 !h-4 !bg-wood !border-2 !border-sticky-note !opacity-50 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-4 !h-4 !bg-wood !border-2 !border-sticky-note !opacity-50 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="!w-4 !h-4 !bg-wood !border-2 !border-sticky-note !opacity-50 hover:!opacity-100 !transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!w-4 !h-4 !bg-wood !border-2 !border-sticky-note !opacity-50 hover:!opacity-100 !transition-opacity"
      />

      {/* Delete Button */}
      <button
        onClick={() => data.onDelete(id)}
        className="absolute -top-2 -left-2 w-5 h-5 bg-burgundy rounded-full flex items-center justify-center hover:bg-burgundy-light transition-colors"
      >
        <X className="w-3 h-3 text-cream" />
      </button>

      {/* Pin */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-burgundy rounded-full border border-burgundy-light shadow-sm" />

      {/* Content */}
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          className="w-full h-20 bg-transparent resize-none text-sm font-medium focus:outline-none nodrag"
          dir="rtl"
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="cursor-text min-h-[5rem] text-sm font-medium leading-relaxed nodrag"
        >
          {content}
        </div>
      )}

      {/* Paper Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fold Effect */}
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-gradient-to-br from-transparent via-transparent to-wood/10" />
    </motion.div>
  );
};
