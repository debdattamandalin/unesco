"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, Users, Clock, Image as ImageIcon, Edit3 } from "lucide-react";
import EvidenceDirectory from "@/components/investigation/EvidenceDirectory";
import EvidenceBoard from "@/components/investigation/EvidenceBoard";
import NotebookEditor from "@/components/investigation/NotebookEditor";
import { useParams } from "next/navigation";

export type Tab = "Evidence" | "Sources" | "Timeline" | "Media" | "Notes";

export default function InvestigationWorkspace() {
  const [activeTab, setActiveTab] = useState<Tab>("Evidence");
  const params = useParams();
  const caseId = params.id as string;
  
  const tabs: { id: Tab, icon: any }[] = [
    { id: "Evidence", icon: FileText },
    { id: "Sources", icon: Users },
    { id: "Timeline", icon: Clock },
    { id: "Media", icon: ImageIcon },
    { id: "Notes", icon: Edit3 },
  ];

  return (
    <div className="flex flex-col flex-grow h-full w-full">
      {/* 3-Column Layout */}
      <div className="flex flex-grow overflow-hidden">
        
        {/* Left: Dynamic Resource List (based on active tab) */}
        <EvidenceDirectory caseId={caseId} activeTab={activeTab} />

        {/* Middle: Main Workspace (Corkboard / Desk) */}
        <div className="w-2/4 h-full relative border-r-4 border-[#1a1715]">
          <EvidenceBoard caseId={caseId} />
        </div>

        {/* Right: Notebook Editor */}
        <NotebookEditor caseId={caseId} />
        
      </div>

      {/* Bottom Tabs */}
      <div className="h-14 border-t-4 border-[#1a1715] bg-[#2d2825] flex items-end justify-center z-20">
        <div className="flex space-x-2 px-4 h-full pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 h-full rounded-t-sm border-2 border-b-0 transition-all font-bold uppercase tracking-widest font-typewriter text-sm",
                  isActive 
                    ? "bg-[#e8e1d5] border-[#1a1715] text-[#1a1715] pb-1 translate-y-[2px]" 
                    : "bg-[#4a423d] border-[#1a1715] text-[#a89f91] hover:bg-[#5c534d]"
                )}
              >
                <Icon size={16} />
                {tab.id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
