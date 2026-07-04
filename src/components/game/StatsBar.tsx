"use client";

import { useGameStore } from "@/store/useGameStore";
import { Calendar, DollarSign, Users, Award, Clock, FileSearch } from "lucide-react";

function formatGameTime(minutes: number) {
  // Game starts at 8:00 AM (8 * 60 minutes)
  const totalMinutes = 8 * 60 + minutes;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  
  const ampm = h >= 12 && h < 24 ? 'PM' : 'AM';
  let displayH = h % 12;
  if (displayH === 0) displayH = 12;
  const displayM = m.toString().padStart(2, '0');
  
  return `${displayH}:${displayM} ${ampm}`;
}

export default function StatsBar() {
  const { currentDay, currentYear, funds, reputation, subscribers, currentEra, activeCases, gameTimeMinutes } = useGameStore();

  return (
    <div className="flex items-center justify-between w-full p-2 px-6 bg-[#e8e1d5] border-b-4 border-[#1a1715] shadow-md z-10">
      <div className="flex space-x-6 items-center">
        <div className="flex items-center space-x-2 bg-[#f4ebd9] text-[#2d2825] px-3 py-1 border-2 border-[#1a1715] shadow-[2px_2px_0_0_#1a1715]">
          <Calendar size={16} strokeWidth={2.5} />
          <span className="text-xs font-bold uppercase tracking-widest font-typewriter">Day {currentDay}</span>
          <span className="text-xs font-bold uppercase tracking-widest font-typewriter border-l-2 border-[#2d2825] pl-2 ml-2">{currentYear}</span>
        </div>
        <div className="flex items-center space-x-2 px-2">
          <Clock size={16} className="text-[#a89f91]" />
          <span className="text-xs font-bold uppercase tracking-widest font-typewriter text-[#a89f91]">
            {formatGameTime(gameTimeMinutes)}
          </span>
        </div>
      </div>

      <div className="flex space-x-4 items-center">
        <StatBadge icon={DollarSign} value={`$${funds.toLocaleString()}`} />
        <StatBadge icon={Award} value={reputation} color="text-amber-700" />
        <StatBadge icon={Users} value={`${(subscribers/1000).toFixed(1)}k`} />
        <StatBadge icon={FileSearch} value={activeCases.length} color="text-red-800" />
      </div>
    </div>
  );
}

function StatBadge({ icon: Icon, value, color = "text-[#2d2825]" }: { icon: any, value: string | number, color?: string }) {
  return (
    <div className="flex items-center space-x-2 bg-[#f4ebd9] px-3 py-1 border-2 border-[#1a1715] shadow-[2px_2px_0_0_#1a1715]">
      <Icon size={14} className={color} strokeWidth={3} />
      <span className={`text-sm font-bold font-typewriter ${color}`}>{value}</span>
    </div>
  );
}
