"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const { settings, updateSettings, resetSettings } = useGameStore();
  
  const [localSettings, setLocalSettings] = useState(settings);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-8">
      <div className="max-w-2xl w-full paper-texture border-2 border-[#1a1715] shadow-[8px_8px_0_0_#1a1715] bg-[#f4ebd9] flex flex-col">
        <div className="border-b-4 border-[#1a1715] bg-[#e8e1d5] p-6 text-center flex items-center justify-center min-h-[120px]">
          <div>
            <h1 className="text-4xl font-heading uppercase tracking-tighter">Settings</h1>
            <p className="font-typewriter uppercase tracking-widest font-bold text-[#5c534d] mt-2">Configure your gameplay experience</p>
          </div>
        </div>
        
        <div className="p-8 space-y-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading uppercase border-b-2 border-dashed border-[#a89f91] pb-2 text-[#1a1715]">Audio</h3>
            <div className="flex justify-between items-center bg-[#e8e1d5] p-3 border-2 border-[#1a1715]">
              <span className="font-typewriter font-bold uppercase tracking-widest text-sm">Master Volume</span>
              <input type="range" min="0" max="100" value={localSettings.masterVolume} onChange={(e) => setLocalSettings({...localSettings, masterVolume: parseInt(e.target.value)})} className="w-1/2 accent-[#1a1715] cursor-pointer h-2 bg-[#a89f91] border border-[#1a1715] rounded-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1715] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#e8e1d5]" />
            </div>
            <div className="flex justify-between items-center bg-[#e8e1d5] p-3 border-2 border-[#1a1715]">
              <span className="font-typewriter font-bold uppercase tracking-widest text-sm">Music Volume</span>
              <input type="range" min="0" max="100" value={localSettings.musicVolume} onChange={(e) => setLocalSettings({...localSettings, musicVolume: parseInt(e.target.value)})} className="w-1/2 accent-[#1a1715] cursor-pointer h-2 bg-[#a89f91] border border-[#1a1715] rounded-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1715] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#e8e1d5]" />
            </div>
            <div className="flex justify-between items-center bg-[#e8e1d5] p-3 border-2 border-[#1a1715]">
              <span className="font-typewriter font-bold uppercase tracking-widest text-sm">SFX Volume</span>
              <input type="range" min="0" max="100" value={localSettings.sfxVolume} onChange={(e) => setLocalSettings({...localSettings, sfxVolume: parseInt(e.target.value)})} className="w-1/2 accent-[#1a1715] cursor-pointer h-2 bg-[#a89f91] border border-[#1a1715] rounded-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1715] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#e8e1d5]" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading uppercase border-b-2 border-dashed border-[#a89f91] pb-2 text-[#1a1715]">Display</h3>
            <div className="flex justify-between items-center bg-[#e8e1d5] p-3 border-2 border-[#1a1715]">
              <span className="font-typewriter font-bold uppercase tracking-widest text-sm">UI Scale</span>
              
              {/* Custom Select Box */}
              <div className="relative w-40">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex justify-between items-center bg-[#f4ebd9] border-2 border-[#1a1715] shadow-[2px_2px_0_0_#1a1715] px-4 py-2 font-typewriter font-bold text-sm outline-none cursor-pointer uppercase tracking-wider"
                >
                  {localSettings.uiScale}
                  <span className="ml-2 text-[10px]">▼</span>
                </button>
                
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#f4ebd9] border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] z-50">
                    {(["Small", "Medium", "Large"] as const).map((scale) => (
                      <div 
                        key={scale}
                        onClick={() => {
                          setLocalSettings({...localSettings, uiScale: scale});
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2 font-typewriter font-bold text-sm uppercase tracking-wider cursor-pointer hover:bg-[#d8cbb8] border-b-2 border-dashed border-[#a89f91] last:border-b-0 flex items-center justify-between"
                      >
                        {scale}
                        {localSettings.uiScale === scale && <span className="text-[#1a1715]">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
            <div className="flex justify-between items-center bg-[#e8e1d5] p-3 border-2 border-[#1a1715]">
              <span className="font-typewriter font-bold uppercase tracking-widest text-sm">Reduce Motion</span>
              <input type="checkbox" checked={localSettings.reduceMotion} onChange={(e) => setLocalSettings({...localSettings, reduceMotion: e.target.checked})} className="h-6 w-6 accent-[#1a1715] cursor-pointer rounded-none border-2 border-[#1a1715] appearance-none checked:bg-[#1a1715] checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3%208L6%2011L11%203.5%22%20stroke%3D%22%23f4ebd9%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat bg-[length:80%_80%]" />
            </div>
          </div>

          <div className="pt-8 mt-8 border-t-4 border-double border-[#a89f91] flex justify-between items-center gap-4">
            <button 
              onClick={() => router.push('/')}
              className="px-6 py-3 border-2 border-[#1a1715] font-typewriter font-bold uppercase tracking-widest text-[#1a1715] bg-[#e8e1d5] shadow-[4px_4px_0_0_#1a1715] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#1a1715] transition-all"
            >
              ← Back
            </button>
            <div className="flex space-x-4">
              <button 
                onClick={resetSettings} 
                className="px-6 py-3 border-2 border-[#1a1715] font-typewriter font-bold uppercase tracking-widest text-[#1a1715] bg-[#e8e1d5] shadow-[4px_4px_0_0_#1a1715] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#1a1715] transition-all"
              >
                Reset Defaults
              </button>
              <button 
                onClick={() => updateSettings(localSettings)} 
                className="px-6 py-3 border-2 border-[#1a1715] font-typewriter font-bold uppercase tracking-widest text-[#f4ebd9] bg-[#1a1715] shadow-[4px_4px_0_0_#1a1715] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#1a1715] transition-all"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
