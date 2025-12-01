import { useCallback, useState, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Node,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { caseContent } from "@/data/caseContent";
import { SuspectNode } from "./nodes/SuspectNode";
import { VictimNode } from "./nodes/VictimNode";
import { StickyNoteNode } from "./nodes/StickyNoteNode";
import { AccusationModal } from "./AccusationModal";
import { Button } from "@/components/ui/button";
import { 
  StickyNote, 
  Target, 
  ArrowRight, 
  Plus,
  Trash2,
  Hand,
  GripVertical
} from "lucide-react";

const nodeTypes = {
  suspect: SuspectNode,
  victim: VictimNode,
  stickyNote: StickyNoteNode,
};

const initialNodes: Node[] = [
  {
    id: "victim",
    type: "victim",
    position: { x: 400, y: 200 },
    data: { 
      name: "عصام الخولي", 
      role: "الضحية - كاتب وجامع كتب ثري" 
    },
  },
  ...caseContent.suspects.map((suspect, index) => ({
    id: suspect.id,
    type: "suspect",
    position: {
      x: 100 + (index % 2) * 600,
      y: 50 + Math.floor(index / 2) * 350,
    },
    data: {
      name: suspect.name,
      role: suspect.role,
      motive: suspect.motive,
    },
  })),
];

const initialEdges: Edge[] = [];

export const InvestigationBoard = () => {
  const { setShowInvestigationBoard } = useGameStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showAccusation, setShowAccusation] = useState(false);
  const [noteCounter, setNoteCounter] = useState(0);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#7A3A34", strokeWidth: 3 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const addStickyNote = useCallback(() => {
    const newNote: Node = {
      id: `note-${noteCounter}`,
      type: "stickyNote",
      position: { x: 250 + noteCounter * 30, y: 100 + noteCounter * 20 },
      data: { 
        content: "اكتب ملاحظتك هنا...",
        onDelete: (id: string) => {
          setNodes((nds) => nds.filter((n) => n.id !== id));
        },
        onContentChange: (id: string, content: string) => {
          setNodes((nds) =>
            nds.map((n) =>
              n.id === id ? { ...n, data: { ...n.data, content } } : n
            )
          );
        },
      },
    };
    setNodes((nds) => [...nds, newNote]);
    setNoteCounter((c) => c + 1);
  }, [noteCounter, setNodes]);

  const clearEdges = useCallback(() => {
    setEdges([]);
  }, [setEdges]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-wood-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Film Grain */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(15 50% 3% / 0.6) 100%)",
        }}
      />

      {/* React Flow */}
      <div ref={reactFlowWrapper} className="w-full h-full" style={{ cursor: "grab" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.3}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          proOptions={{ hideAttribution: true }}
          style={{ cursor: "grab" }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={30}
            size={1}
            color="hsl(42 65% 47% / 0.15)"
          />
          <Controls 
            className="!bg-card !border-border !rounded-lg overflow-hidden [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-gold [&>button:hover]:!bg-wood"
          />

          {/* Top Panel - Tools */}
          <Panel position="top-center" className="!top-4">
            <motion.div
              className="flex items-center gap-3 bg-card/95 backdrop-blur-sm p-3 rounded-xl border border-border shadow-deep"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={addStickyNote}
                variant="outline"
                className="bg-sticky-note/20 border-sticky-note/50 text-sticky-note hover:bg-sticky-note/30"
              >
                <Plus className="w-4 h-4 ml-2" />
                ملاحظة جديدة
              </Button>

              <div className="w-px h-8 bg-border" />

              <Button
                onClick={clearEdges}
                variant="outline"
                className="border-burgundy/50 text-burgundy hover:bg-burgundy/20"
              >
                <Trash2 className="w-4 h-4 ml-2" />
                مسح الخطوط
              </Button>
            </motion.div>
          </Panel>

          {/* Bottom Panel - Actions */}
          <Panel position="bottom-center" className="!bottom-4">
            <motion.div
              className="flex items-center gap-3 bg-card/95 backdrop-blur-sm p-3 rounded-xl border border-border shadow-deep"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={() => setShowInvestigationBoard(false)}
                variant="outline"
                className="border-border text-cream hover:bg-wood"
              >
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة لملفات القضية
              </Button>

              <div className="w-px h-8 bg-border" />

              <Button
                onClick={() => setShowAccusation(true)}
                className="bg-burgundy hover:bg-burgundy-light text-cream border-2 border-gold/30 hover:border-gold/60 shadow-gold"
              >
                <Target className="w-4 h-4 ml-2" />
                حل القضية
              </Button>
            </motion.div>
          </Panel>

          {/* Instructions Panel */}
          <Panel position="top-right" className="!top-4 !right-4">
            <motion.div
              className="hidden md:block bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border max-w-xs text-sm"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="font-bold text-gold mb-2 flex items-center gap-2">
                <Hand className="w-4 h-4" />
                تعليمات
              </h4>
              <ul className="text-cream/70 space-y-1 text-xs">
                <li>• اسحب البطاقات لترتيبها</li>
                <li>• اسحب من النقاط لربط العناصر</li>
                <li>• استخدم العجلة للتقريب والتبعيد</li>
                <li>• أضف ملاحظات لتدوين استنتاجاتك</li>
              </ul>
            </motion.div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Accusation Modal */}
      <AnimatePresence>
        {showAccusation && (
          <AccusationModal onClose={() => setShowAccusation(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
