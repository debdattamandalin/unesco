"use client";

import { useBoardStore, BoardItemType } from "@/store/useBoardStore";
import { Plus, FileText, Image as ImageIcon, Volume2, Video, Edit3 } from "lucide-react";

interface EvidenceDirectoryProps {
  caseId: string;
  activeTab: string;
}

// Mock database of items
const MOCK_EVIDENCE = [
  { id: "e1", type: "article", title: "Police Report #442", content: "Officer Miller reported seeing the suspect flee through the alleyway at 2:14 AM. The suspect dropped a matchbook from 'The Velvet Lounge'." },
  { id: "e2", type: "image", title: "Crime Scene Photo", content: "scene-1.jpg" },
  { id: "e3", type: "audio", title: "Witness Interview", content: "interview-tape-1.mp3" },
  { id: "e4", type: "article", title: "Forensic Analysis", content: "Fingerprints on the safe match those of known safecracker 'Fingers' McGee, recently released from state penitentiary." },
  { id: "e5", type: "video", title: "Security Footage", content: "cam-alley.mp4" },
  { id: "e6", type: "note", title: "Reporter's Hunch", content: "Why was the alarm turned off exactly 5 minutes before the break-in? Someone on the inside had to pull the switch." },
];

export default function EvidenceDirectory({ caseId, activeTab }: EvidenceDirectoryProps) {
  const { addItem, items } = useBoardStore();
  
  // Filter mock items by tab conceptually
  const getItemsForTab = () => {
    switch (activeTab) {
      case "Evidence": return MOCK_EVIDENCE.filter(e => e.type === "article" || e.type === "image");
      case "Sources": return MOCK_EVIDENCE.filter(e => e.id === "e3");
      case "Media": return MOCK_EVIDENCE.filter(e => e.type === "video" || e.type === "image" || e.type === "audio");
      case "Notes": return MOCK_EVIDENCE.filter(e => e.type === "note");
      case "Timeline": return [];
      default: return MOCK_EVIDENCE;
    }
  };

  const currentItems = getItemsForTab();

  const getIcon = (type: string) => {
    switch (type) {
      case "image": return <ImageIcon size={16} />;
      case "video": return <Video size={16} />;
      case "audio": return <Volume2 size={16} />;
      case "note": return <Edit3 size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const handleAdd = (mockItem: any) => {
    addItem({
      caseId,
      type: mockItem.type as BoardItemType,
      title: mockItem.title,
      content: mockItem.content
    });
  };

  return (
    <div className="w-1/4 h-full border-r-4 border-[#1a1715] bg-[#e8e1d5] flex flex-col shadow-[inset_-2px_0_10px_rgba(0,0,0,0.05)]">
      <div className="p-3 border-b-2 border-dashed border-[#a89f91] bg-[#d8cbb8]">
        <h2 className="font-heading font-bold text-lg uppercase tracking-wider">{activeTab} Directory</h2>
      </div>
      <div className="p-4 flex-grow overflow-y-auto space-y-3">
        {currentItems.length === 0 ? (
          <div className="border-2 border-dashed border-[#a89f91] p-6 text-center text-[#5c534d] font-typewriter uppercase tracking-widest text-sm font-bold bg-[#f9f4ec]">
            No {activeTab.toLowerCase()} collected yet.
          </div>
        ) : (
          currentItems.map((item) => (
            <div key={item.id} className="bg-[#f9f4ec] border-2 border-[#1a1715] p-3 flex flex-col gap-2 group hover:bg-white transition-colors shadow-[2px_2px_0_0_#1a1715]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-[#2d2825] font-bold font-typewriter text-xs uppercase">
                  {getIcon(item.type)}
                  <span className="truncate">{item.title}</span>
                </div>
                <button 
                  onClick={() => handleAdd(item)}
                  className="bg-[#e8e1d5] hover:bg-[#401a14] hover:text-[#f4ebd9] border border-[#1a1715] p-1 rounded-sm transition-colors"
                  title="Add to Board"
                >
                  <Plus size={14} />
                </button>
              </div>
              <p className="text-xs font-serif text-[#5c534d] line-clamp-2">{item.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
