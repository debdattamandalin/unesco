"use client";

import { useRef, useEffect, useState } from "react";
import { useBoardStore } from "@/store/useBoardStore";
import BoardItem from "./BoardItem";
import ConnectionsOverlay from "./ConnectionsOverlay";

interface EvidenceBoardProps {
  caseId: string;
}

export default function EvidenceBoard({ caseId }: EvidenceBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { items, connectingFrom, cancelConnection } = useBoardStore();
  const [mounted, setMounted] = useState(false);

  // Filter items to only show ones for this case
  const caseItems = items.filter(item => item.caseId === caseId);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle clicking on the background to cancel a connection in progress
  const handleBackgroundClick = () => {
    if (connectingFrom) {
      cancelConnection();
    }
  };

  if (!mounted) return <div className="w-full h-full bg-[#e8e1d5]"></div>; // Prevent hydration mismatch

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden bg-[#e8e1d5]"
      onClick={handleBackgroundClick}
    >
      {/* Corkboard Texture */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d8cbb8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      
      {/* Red String Connections */}
      <ConnectionsOverlay />

      {/* Helper text when empty */}
      {caseItems.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="text-center">
            <h2 className="text-[#5c534d] font-heading text-3xl font-bold uppercase tracking-widest opacity-30">Evidence Board</h2>
            <p className="text-[#5c534d] font-typewriter mt-2 text-sm uppercase tracking-widest opacity-40">Add items from the directory</p>
          </div>
        </div>
      )}

      {/* Helper text when linking */}
      {connectingFrom && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#e8e1d5] border-2 border-red-800 text-red-900 font-bold font-typewriter uppercase text-sm px-4 py-2 shadow-lg animate-bounce">
          Select another item to link, or click background to cancel.
        </div>
      )}

      {/* Evidence Items */}
      {caseItems.map(item => (
        <BoardItem 
          key={item.id} 
          item={item} 
          containerRef={containerRef} 
        />
      ))}
    </div>
  );
}
