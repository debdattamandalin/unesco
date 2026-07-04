"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";

interface SaveData {
  currentDay: number;
  reputation: number;
  funds: number;
}

export default function ContinuePage() {
  const router = useRouter();
  const { loadGame } = useGameStore();
  const [saves, setSaves] = useState<Record<number, SaveData | null>>({
    1: null, 2: null, 3: null
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadedSaves: Record<number, SaveData | null> = {1: null, 2: null, 3: null};
    for (let i = 1; i <= 3; i++) {
      try {
        const saved = localStorage.getItem(`editorial-save-${i}`);
        if (saved) {
          loadedSaves[i] = JSON.parse(saved) as SaveData;
        }
      } catch (e) {
        // ignore
      }
    }
    setSaves(loadedSaves);
  }, []);

  const handleLoad = (slot: number) => {
    const success = loadGame(slot);
    if (success) {
      router.push("/office");
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-8">
      <div className="max-w-2xl w-full paper-texture border-2 border-[#1a1715] shadow-[8px_8px_0_0_#1a1715] bg-[#f4ebd9] flex flex-col">
        <div className="border-b-4 border-[#1a1715] bg-[#e8e1d5] p-6 text-center flex items-center justify-center min-h-[120px]">
          <div>
            <h1 className="text-4xl font-heading uppercase tracking-tighter">Load Game</h1>
            <p className="font-typewriter uppercase tracking-widest font-bold text-[#5c534d] mt-2">Resume an existing investigation</p>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          {[1, 2, 3].map((slot) => {
            const data = saves[slot];
            
            return (
              <div key={slot} className="border-2 border-[#1a1715] bg-[#e8e1d5] p-6 shadow-[4px_4px_0_0_#1a1715]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-heading">Save Slot {slot}</h2>
                  {data && <span className="font-typewriter uppercase tracking-widest text-[#5c534d] text-sm font-bold">Day {data.currentDay}</span>}
                </div>
                
                {data ? (
                  <>
                    <p className="text-sm font-typewriter uppercase tracking-widest text-[#5c534d] mb-6">
                      Reputation: {data.reputation} | Funds: ${data.funds}
                    </p>
                    <button 
                      onClick={() => handleLoad(slot)}
                      className="w-full bg-[#1a1715] hover:bg-[#2a2725] text-[#f4ebd9] font-typewriter uppercase tracking-widest font-bold border-2 border-[#1a1715] rounded-none py-4 transition-all hover:translate-y-[2px] hover:translate-x-[2px] shadow-[4px_4px_0_0_#1a1715] hover:shadow-[2px_2px_0_0_#1a1715]"
                    >
                      Load Latest Save
                    </button>
                  </>
                ) : (
                  <div className="py-8 text-center border-2 border-dashed border-[#a89f91]">
                    <p className="text-[#5c534d] font-typewriter uppercase tracking-widest font-bold">Empty Slot</p>
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-8 mt-8 border-t-4 border-double border-[#a89f91] flex justify-start">
            <button 
              onClick={() => router.push('/')}
              className="px-8 py-3 border-2 border-[#1a1715] font-typewriter font-bold uppercase tracking-widest text-[#1a1715] bg-[#e8e1d5] shadow-[4px_4px_0_0_#1a1715] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#1a1715] transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
