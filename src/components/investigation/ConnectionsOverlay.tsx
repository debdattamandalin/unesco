"use client";

import { useBoardStore, BoardItem } from "@/store/useBoardStore";
import { useEffect, useState, useRef } from "react";

export default function ConnectionsOverlay() {
  const { connections, items, deleteConnection } = useBoardStore();
  const [svgPath, setSvgPath] = useState<React.ReactNode[]>([]);
  
  // We use requestAnimationFrame to update the lines during drag if necessary,
  // but since we update store onDragEnd, it will snap. 
  // To make it follow during drag, we'd need a more complex setup reading DOM rects.
  // For now, we'll draw based on the Zustand store's x/y coordinates.

  const getWidthOffset = (type: string) => {
    switch (type) {
      case "image": return 192 / 2; // w-48
      case "video": return 224 / 2; // w-56
      case "audio": return 192 / 2; // w-48
      case "article":
      case "note":
      default: return 256 / 2; // w-64
    }
  };

  useEffect(() => {
    const paths = connections.map((conn) => {
      const fromItem = items.find(i => i.id === conn.from);
      const toItem = items.find(i => i.id === conn.to);
      
      if (!fromItem || !toItem) return null;

      // The link node is roughly at the top center of the item
      const x1 = fromItem.x + getWidthOffset(fromItem.type);
      const y1 = fromItem.y;
      
      const x2 = toItem.x + getWidthOffset(toItem.type);
      const y2 = toItem.y;
      
      // Calculate a nice curve
      const dx = Math.abs(x2 - x1) * 0.5;
      const dy = Math.abs(y2 - y1) * 0.5;
      const cp1x = x1;
      const cp1y = y1 - 50 - dy * 0.2; // Curve up slightly
      const cp2x = x2;
      const cp2y = y2 - 50 - dy * 0.2;

      const pathData = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;

      return (
        <g key={conn.id} className="group cursor-pointer" onClick={() => deleteConnection(conn.id)}>
          {/* Invisible thick path for easier clicking/hovering */}
          <path
            d={pathData}
            fill="none"
            stroke="transparent"
            strokeWidth="20"
          />
          {/* Actual red string */}
          <path
            d={pathData}
            fill="none"
            stroke="#b91c1c"
            strokeWidth="3"
            strokeDasharray="5,5"
            className="group-hover:stroke-red-500 group-hover:stroke-[4px] transition-all"
            style={{ filter: "drop-shadow(2px 4px 2px rgba(0,0,0,0.3))" }}
          />
          {/* Delete icon that appears on hover (approximation) */}
          <circle cx={(x1+x2)/2} cy={((y1+y2)/2) - 20} r="10" className="fill-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          <text x={(x1+x2)/2} y={((y1+y2)/2) - 16} textAnchor="middle" fill="white" fontSize="12" className="opacity-0 group-hover:opacity-100 font-bold font-sans pointer-events-none">×</text>
        </g>
      );
    });

    setSvgPath(paths);
  }, [connections, items]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {/* Enable pointer events only on the lines themselves */}
      <g className="pointer-events-auto">
        {svgPath}
      </g>
    </svg>
  );
}
