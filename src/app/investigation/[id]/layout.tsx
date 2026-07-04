"use client";

import Link from "next/link";
import { useGameStore } from "@/store/useGameStore";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";

export default function InvestigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const caseId = params.id as string;
  const { activeCases } = useGameStore();
  
  const currentCase = activeCases.find(c => c.id === caseId);

  if (!currentCase) {
    return (
      <div className="fixed inset-0 bg-[#f4ebd9] text-[#2d2825] flex items-center justify-center font-typewriter">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case File Not Found</h1>
          <Link href="/office/cases">
            <Button variant="outline">
              Return to Office
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#f4ebd9] text-[#2d2825] flex flex-col overflow-hidden paper-texture">
      {/* Top Bar */}
      <div className="h-16 border-b-4 border-[#1a1715] flex items-center justify-between px-4 bg-[#e8e1d5] z-10 shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-4">
          <Link href="/office/cases">
            <Button variant="outline" className="h-10">
              <ArrowLeft size={16} className="mr-2" /> Office
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3 ml-4 border-l-2 border-[#4a423d] pl-4">
            <span className="font-typewriter text-xs font-bold uppercase tracking-widest text-[#a89f91]">Case File:</span>
            <span className="font-heading font-bold text-xl uppercase text-[#1a1715] truncate max-w-md">
              {currentCase.headline}
            </span>
            <span className={`text-[10px] font-bold font-typewriter uppercase tracking-widest px-2 py-0.5 border border-current ${
              currentCase.difficulty === 'Hard' ? 'text-red-600' : 
              currentCase.difficulty === 'Medium' ? 'text-amber-600' : 'text-green-600'
            }`}>
              {currentCase.difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border-2 border-[#1a1715] bg-[#d8cbb8] text-[#1a1715] px-4 py-1">
            <span className="font-typewriter text-xs uppercase tracking-widest text-[#5c534d]">Time Limit:</span>
            <span className="font-mono text-lg font-bold">{currentCase.estimatedTime}:00:00</span>
          </div>
          
          <Link href={`/investigation/${caseId}/publish`}>
            <Button className="h-10">
              <Send size={16} className="mr-2" /> Publish
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-grow flex relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
