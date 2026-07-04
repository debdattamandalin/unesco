"use client";

import { motion } from "framer-motion";
import { Case } from "@/store/useGameStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, AlertTriangle, User, Check, X } from "lucide-react";
import Link from "next/link";

interface CaseCardProps {
  caseData: Case;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  isActive?: boolean;
}

export default function CaseCard({ caseData, onAccept, onDecline, isActive = false }: CaseCardProps) {
  const isEasy = caseData.difficulty === "Easy";
  const isHard = caseData.difficulty === "Hard";
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
    >
      <Card className="paper-texture border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] rounded-none overflow-hidden h-full flex flex-col">
        {/* Top folder tab styling */}
        <div className="bg-[#1a1715] text-[#f4ebd9] px-3 py-1 flex justify-between items-center border-b-2 border-[#1a1715]">
          <span className="font-typewriter text-xs font-bold uppercase tracking-widest">FILE: #{caseData.id.split('-')[1].padStart(4, '0')}</span>
          <span className="font-typewriter text-xs font-bold uppercase tracking-widest text-[#a89f91]">{caseData.era}</span>
        </div>
        
        <CardHeader className="p-4 pb-2 border-b-2 border-dashed border-[#a89f91] bg-[#e8e1d5]">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="font-heading uppercase text-xl leading-tight pr-2">{caseData.headline}</CardTitle>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-2 text-sm text-[#5c534d] font-bold font-typewriter">
              <User size={14} />
              <span className="truncate">{caseData.client}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#5c534d] font-bold font-typewriter">
              <AlertTriangle size={14} className={isHard ? "text-red-700" : isEasy ? "text-green-700" : "text-amber-600"} />
              <span>{caseData.difficulty}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <p className="text-sm text-[#2d2825] font-serif leading-relaxed mb-4">
              {caseData.summary}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t-2 border-dashed border-[#a89f91] pt-3 mb-4">
            <div className="flex items-center gap-2 font-bold font-typewriter text-sm">
              <Clock size={16} className="text-[#a89f91]" />
              <span>{caseData.estimatedTime} Days</span>
            </div>
            <div className="flex items-center gap-2 font-bold font-typewriter text-sm text-green-800">
              <DollarSign size={16} />
              <span>{caseData.reward}</span>
            </div>
          </div>
          
          {!isActive && onAccept && onDecline && (
            <div className="flex gap-3 mt-auto">
              <Button 
                onClick={() => onDecline(caseData.id)}
                variant="outline" 
                className="flex-1 h-10"
              >
                <X size={16} className="mr-2" /> Decline
              </Button>
              <Button 
                onClick={() => onAccept(caseData.id)}
                className="flex-1 h-10"
              >
                <Check size={16} className="mr-2" /> Accept
              </Button>
            </div>
          )}
          
          {isActive && (
            <div className="mt-auto pt-4 border-t-2 border-dashed border-[#a89f91]">
              <div className="w-full text-center border-2 border-[#401a14] bg-[#f9f4ec] text-[#401a14] font-bold font-typewriter uppercase tracking-widest py-1 rounded-sm transform -rotate-2 mb-3 text-[10px]">
                ACTIVE INVESTIGATION
              </div>
              <Link href={`/investigation/${caseData.id}`} className="w-full block">
                <Button className="w-full h-10">
                  Investigate
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
