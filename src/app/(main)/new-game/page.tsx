"use client";

import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewGamePage() {
  const { setPlayerName, resetGame, saveGame } = useGameStore();
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<number>(1);
  const [name, setName] = useState("");

  const handleStart = () => {
    resetGame(selectedSlot);
    if (name) setPlayerName(name);
    saveGame(selectedSlot);
    router.push("/office");
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-8">
      <div className="max-w-2xl w-full paper-texture border-2 border-[#1a1715] shadow-[8px_8px_0_0_#1a1715] bg-[#f4ebd9] flex flex-col">
        <div className="border-b-4 border-[#1a1715] bg-[#e8e1d5] p-6 text-center flex items-center justify-center min-h-[120px]">
          <div>
            <h1 className="text-4xl font-heading uppercase tracking-tighter">New Investigation</h1>
            <p className="font-typewriter uppercase tracking-widest font-bold text-[#5c534d] mt-2">Establish your new bureau</p>
          </div>
        </div>
        
        <div className="p-8 space-y-10">
          <div className="space-y-3">
            <label className="text-sm font-typewriter font-bold uppercase tracking-widest text-[#1a1715]">Editor's Name</label>
            <input 
              type="text" 
              className="w-full bg-[#e8e1d5] border-2 border-[#1a1715] px-4 py-3 font-typewriter font-bold text-[#1a1715] placeholder:text-[#a89f91] focus:outline-none focus:ring-2 focus:ring-[#1a1715]"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-typewriter font-bold uppercase tracking-widest text-[#1a1715]">Save Slot</label>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 border-2 border-[#1a1715] font-typewriter font-bold uppercase tracking-wider ${selectedSlot === slot ? 'bg-[#1a1715] text-[#f4ebd9]' : 'bg-[#e8e1d5] text-[#1a1715] hover:bg-[#d8cbb8]'}`}
                >
                  Slot {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 mt-8 border-t-4 border-double border-[#a89f91] flex justify-between gap-4">
            <button 
              onClick={() => router.push('/')}
              className="px-6 py-3 border-2 border-[#1a1715] font-typewriter font-bold uppercase tracking-widest text-[#1a1715] bg-[#e8e1d5] shadow-[4px_4px_0_0_#1a1715] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#1a1715] transition-all"
            >
              ← Back
            </button>
            <button 
              onClick={handleStart}
              className="flex-grow bg-[#1a1715] hover:bg-[#2a2725] text-[#f4ebd9] font-typewriter uppercase tracking-widest font-bold border-2 border-[#1a1715] rounded-none py-3 transition-all hover:translate-y-[2px] hover:translate-x-[2px] shadow-[4px_4px_0_0_#1a1715] hover:shadow-[2px_2px_0_0_#1a1715]"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
