"use client";

import { useGameStore } from "@/store/useGameStore";
import { Calendar, DollarSign, Award } from "lucide-react";

export default function DayEndShutter() {
  const { isDayEnded, advanceDay, currentDay, currentYear, reputation, funds } = useGameStore();

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.2,1,0.2,1)] ${isDayEnded ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className={`absolute inset-0 bg-[#1a1715]/80 backdrop-blur-sm transition-opacity duration-1000 ${isDayEnded ? 'opacity-100 delay-500' : 'opacity-0'}`} />
      
      <div className="relative z-10 w-full max-w-3xl bg-[#e8e1d5] border-y-[12px] border-[#1a1715] p-12 paper-texture shadow-[0_30px_0_0_rgba(26,23,21,0.8)]">
        
        <div className="text-center mb-10 border-b-4 border-[#1a1715] pb-8 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#1a1715]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#1a1715]" />
          <h1 className="text-6xl font-heading font-bold text-[#1a1715] uppercase tracking-tighter">Day Concluded</h1>
          <p className="font-typewriter text-xl font-bold uppercase tracking-widest text-[#5c534d] mt-4">The presses have stopped</p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="bg-[#f4ebd9] border-4 border-[#1a1715] p-6 shadow-[8px_8px_0_0_#1a1715] flex justify-between items-center">
             <div className="flex items-center gap-4">
               <Calendar className="text-[#1a1715]" size={36} />
               <span className="font-typewriter text-xl font-bold uppercase tracking-widest text-[#5c534d]">Date</span>
             </div>
             <span className="font-typewriter text-3xl font-bold text-[#1a1715]">Day {currentDay}, {currentYear}</span>
          </div>

          <div className="bg-[#f4ebd9] border-4 border-[#1a1715] p-6 shadow-[8px_8px_0_0_#1a1715] flex justify-between items-center">
             <div className="flex items-center gap-4">
               <Award className="text-[#1a1715]" size={36} />
               <span className="font-typewriter text-xl font-bold uppercase tracking-widest text-[#5c534d]">Reputation</span>
             </div>
             <span className="font-typewriter text-3xl font-bold text-[#1a1715]">{reputation}</span>
          </div>

          <div className="bg-[#f4ebd9] border-4 border-[#1a1715] p-6 shadow-[8px_8px_0_0_#1a1715] flex justify-between items-center">
             <div className="flex items-center gap-4">
               <DollarSign className="text-[#1a1715]" size={36} />
               <span className="font-typewriter text-xl font-bold uppercase tracking-widest text-[#5c534d]">Total Funds</span>
             </div>
             <span className="font-typewriter text-3xl font-bold text-[#1a1715]">${funds}</span>
          </div>
        </div>

        <div className="flex justify-center border-t-4 border-double border-[#a89f91] pt-10">
          <button 
            onClick={advanceDay}
            className="w-full bg-[#1a1715] hover:bg-[#2a2725] text-[#f4ebd9] font-typewriter text-2xl uppercase tracking-widest font-bold border-4 border-[#1a1715] rounded-none py-6 transition-all hover:translate-y-[2px] hover:translate-x-[2px] shadow-[8px_8px_0_0_#1a1715] hover:shadow-[4px_4px_0_0_#1a1715]"
          >
            Commence Next Day
          </button>
        </div>
      </div>
    </div>
  );
}
