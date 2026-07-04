"use client";

import { useRouter } from "next/navigation";

export default function CreditsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-8">
      <div className="max-w-2xl w-full paper-texture border-2 border-[#1a1715] shadow-[8px_8px_0_0_#1a1715] bg-[#f4ebd9] flex flex-col">
        <div className="border-b-4 border-[#1a1715] bg-[#e8e1d5] p-6 text-center flex items-center justify-center min-h-[120px]">
          <div>
            <h1 className="text-4xl font-heading uppercase tracking-tighter">Credits</h1>
            <p className="font-typewriter uppercase tracking-widest font-bold text-[#5c534d] mt-2">The architects of your office</p>
          </div>
        </div>
        
        <div className="p-12 space-y-12 text-center">
          <div className="space-y-4">
            <h3 className="text-sm font-bold font-typewriter uppercase tracking-widest text-[#a89f91]">A Game For</h3>
            <p className="text-3xl font-heading font-bold text-[#1a1715]">UNESCO MIL Hackathon</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold font-typewriter uppercase tracking-widest text-[#a89f91]">Developed By</h3>
            <p className="text-xl font-heading font-bold text-[#1a1715]">Your Team Name</p>
          </div>

          <div className="space-y-4 pt-8 border-t-2 border-dashed border-[#a89f91]">
            <h3 className="text-sm font-bold font-typewriter uppercase tracking-widest text-[#a89f91]">Special Thanks</h3>
            <p className="font-typewriter font-bold text-[#5c534d] max-w-md mx-auto leading-relaxed">
              To everyone who participated in the hackathon and supports Media & Information Literacy.
            </p>
          </div>

          <div className="pt-12 flex justify-center">
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
