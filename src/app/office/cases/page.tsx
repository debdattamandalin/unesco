"use client";

import { useGameStore } from "@/store/useGameStore";
import CaseCard from "@/components/game/CaseCard";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { RefreshCcw, Briefcase } from "lucide-react";

export default function CasesPage() {
  const { inboxCases, activeCases, acceptCase, declineCase, generateMockCases } = useGameStore();

  return (
    <div className="space-y-8 h-full">
      <div className="flex justify-between items-end border-b-4 border-foreground pb-4">
        <div>
          <h1 className="text-4xl font-bold font-heading uppercase tracking-tighter" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>Active Cases</h1>
          <p className="text-muted-foreground font-typewriter uppercase tracking-widest text-sm mt-2 font-bold">Manage ongoing investigations and incoming leads.</p>
        </div>
        
        <Button 
          onClick={generateMockCases}
          variant="outline"
          className="h-10"
        >
          <RefreshCcw size={16} className="mr-2" /> Refresh Inbox
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#1a1715] text-[#f4ebd9] p-2 rounded-sm">
            <Briefcase size={20} />
          </div>
          <h2 className="text-2xl font-bold font-heading uppercase tracking-tighter">Case Inbox ({inboxCases.length})</h2>
        </div>
        
        {inboxCases.length === 0 ? (
          <div className="border-2 border-dashed border-[#a89f91] p-8 bg-[#f9f4ec] text-center">
            <p className="text-[#5c534d] font-typewriter uppercase tracking-wider font-bold">No new leads. Send reporters to investigate.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {inboxCases.map((caseData) => (
                <CaseCard 
                  key={caseData.id} 
                  caseData={caseData} 
                  onAccept={acceptCase} 
                  onDecline={declineCase} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="space-y-4 mt-12 pt-8 border-t-4 border-double border-[#a89f91]">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold font-heading uppercase tracking-tighter">Active Investigations ({activeCases.length})</h2>
        </div>
        
        {activeCases.length === 0 ? (
          <div className="border-2 border-dashed border-[#a89f91] p-8 bg-[#f9f4ec] text-center">
            <p className="text-[#5c534d] font-typewriter uppercase tracking-wider font-bold">No ongoing cases.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {activeCases.map((caseData) => (
                <CaseCard 
                  key={caseData.id} 
                  caseData={caseData} 
                  isActive={true} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
