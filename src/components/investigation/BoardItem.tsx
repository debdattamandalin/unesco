"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { BoardItem as BoardItemType, useBoardStore } from "@/store/useBoardStore";
import { Pin, PinOff, X, Link as LinkIcon, FileText, Image as ImageIcon, Volume2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BoardItemProps {
  item: BoardItemType;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function BoardItem({ item, containerRef }: BoardItemProps) {
  const { updateItemPosition, togglePin, deleteItem, startConnection, finishConnection, connectingFrom, cancelConnection, bringToFront } = useBoardStore();
  const controls = useDragControls();
  const itemRef = useRef<HTMLDivElement>(null);
  const [isLinking, setIsLinking] = useState(false);

  // If this item is currently being linked FROM
  const isSource = connectingFrom === item.id;
  // If we are currently in linking mode
  const isLinkingMode = connectingFrom !== null;

  const handleDragEnd = (event: any, info: any) => {
    if (item.pinned) return;
    
    // Calculate new position relative to container
    if (containerRef.current && itemRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const itemRect = itemRef.current.getBoundingClientRect();
      
      const newX = itemRect.left - containerRect.left;
      const newY = itemRect.top - containerRect.top;
      
      updateItemPosition(item.id, newX, newY);
    }
  };

  const handlePointerDown = () => {
    bringToFront(item.id);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLinkingMode) {
      if (isSource) {
        cancelConnection();
      } else {
        finishConnection(item.id);
      }
    } else {
      startConnection(item.id);
    }
  };

  const renderContent = () => {
    switch (item.type) {
      case "image":
        return (
          <div className="w-48 h-48 bg-[#d8cbb8] flex items-center justify-center overflow-hidden border-2 border-[#1a1715] p-2 bg-white">
            <div className="w-full h-full bg-black/10 flex flex-col items-center justify-center">
              <ImageIcon size={32} className="text-[#5c534d] mb-2" />
              <span className="text-xs font-bold font-typewriter text-[#5c534d] uppercase">Image Evidence</span>
            </div>
          </div>
        );
      case "video":
        return (
          <div className="w-56 bg-[#2d2825] p-2 border-2 border-[#1a1715]">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <Video size={32} className="text-[#a89f91]" />
              <div className="absolute inset-0 flex items-center justify-center opacity-50">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="w-48 bg-[#e8e1d5] p-3 border-2 border-[#1a1715] shadow-[2px_2px_0_0_#1a1715]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#401a14] rounded-full flex items-center justify-center text-[#f4ebd9]">
                <Volume2 size={20} />
              </div>
              <div className="flex-1 h-2 bg-[#d8cbb8] rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#a89f91]"></div>
              </div>
            </div>
          </div>
        );
      case "article":
      case "note":
      default:
        return (
          <div className="w-64 min-h-[120px] bg-[#f9f4ec] p-4 border-2 border-dashed border-[#a89f91] shadow-md font-serif text-[#2d2825] text-sm">
            <p className="line-clamp-4">{item.content}</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      id={item.id}
      ref={itemRef}
      className={`absolute cursor-grab active:cursor-grabbing ${item.pinned ? "cursor-default active:cursor-default" : ""}`}
      drag={!item.pinned}
      dragConstraints={containerRef}
      dragMomentum={false}
      initial={{ x: item.x, y: item.y }}
      animate={{ x: item.x, y: item.y }}
      onDragEnd={handleDragEnd}
      onPointerDown={handlePointerDown}
      style={{
        boxShadow: item.pinned ? "2px 2px 0px 0px rgba(0,0,0,0.8)" : "8px 8px 15px rgba(0,0,0,0.3)",
      }}
    >
      {/* Red string connection node (visual only, for clicking) */}
      <button 
        onClick={handleLinkClick}
        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 z-20 flex items-center justify-center transition-all ${
          isSource ? "bg-red-600 border-red-800 scale-125 animate-pulse" : 
          isLinkingMode ? "bg-red-300 border-red-500 hover:bg-red-400 hover:scale-110" :
          "bg-[#e8e1d5] border-[#1a1715] hover:bg-red-200"
        }`}
        title="Link Evidence"
      >
        <LinkIcon size={12} className={isSource ? "text-white" : "text-[#1a1715]"} />
      </button>

      {/* Main Item Container */}
      <div className={`bg-[#f4ebd9] border-2 border-[#1a1715] p-2 relative ${
        isSource ? "ring-4 ring-red-500/50" : 
        isLinkingMode && !isSource ? "ring-2 ring-red-300/50 hover:ring-red-400" : ""
      }`}>
        
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-[#1a1715] pb-2 mb-2 bg-[#e8e1d5] px-2 -mx-2 -mt-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="font-typewriter font-bold text-xs uppercase tracking-widest truncate max-w-[120px]">
              {item.title}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); togglePin(item.id); }}
              className={`p-1 rounded-sm border ${item.pinned ? "bg-[#401a14] text-[#f4ebd9] border-[#1a1715]" : "bg-transparent text-[#1a1715] border-transparent hover:border-[#1a1715]"}`}
              title={item.pinned ? "Unpin" : "Pin"}
            >
              {item.pinned ? <PinOff size={14} /> : <Pin size={14} />}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
              className="p-1 rounded-sm bg-transparent text-[#1a1715] hover:bg-red-200 border border-transparent hover:border-red-900"
              title="Delete"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="pointer-events-auto">
          {renderContent()}
        </div>
        
      </div>
      
      {/* Tape styling for visual flair */}
      {item.pinned && (
        <div className="absolute -top-4 -right-4 w-12 h-6 bg-yellow-900/20 rotate-12 backdrop-blur-sm z-30 pointer-events-none border border-yellow-900/10"></div>
      )}
      {item.pinned && (
        <div className="absolute -bottom-4 -left-4 w-12 h-6 bg-yellow-900/20 -rotate-12 backdrop-blur-sm z-30 pointer-events-none border border-yellow-900/10"></div>
      )}

    </motion.div>
  );
}
