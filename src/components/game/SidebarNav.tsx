"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Building2, Briefcase, BookOpen, Archive, TrendingUp, BarChart3, Settings } from "lucide-react";

export default function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Office", href: "/office", icon: Building2 },
    { name: "Cases", href: "/office/cases", icon: Briefcase },
    { name: "Notebook", href: "/office/notebook", icon: BookOpen },
    { name: "Archive", href: "/office/archive", icon: Archive },
    { name: "Upgrades", href: "/office/upgrades", icon: TrendingUp },
    { name: "Statistics", href: "/office/statistics", icon: BarChart3 },
    { name: "Settings", href: "/office/settings", icon: Settings },
  ];

  return (
    <nav className="flex flex-col space-y-3 w-64 shrink-0 bg-[#e8e1d5] p-4 border-r-4 border-[#1a1715] shadow-[inset_-4px_0_0_rgba(0,0,0,0.05)]">
      <div className="mb-6 px-2 py-4 border-b-2 border-[#1a1715] flex flex-col items-center justify-center bg-[#f4ebd9] rounded-sm vintage-border-thick">
        <h2 className="text-3xl font-bold tracking-tighter text-[#1a1715] font-heading">EDITORIAL</h2>
        <p className="text-[10px] text-[#5c534d] font-typewriter uppercase tracking-widest mt-1">Mgmt Dept.</p>
      </div>
      
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 border-2 transition-all duration-200 font-bold uppercase tracking-wider text-sm",
              isActive 
                ? "bg-[#1a1715] text-[#f4ebd9] border-[#1a1715] shadow-[2px_2px_0_0_#401a14] translate-y-[1px]" 
                : "bg-[#f4ebd9] text-[#2d2825] border-[#1a1715] hover:bg-[#d8cbb8] hover:text-[#1a1715] shadow-[3px_3px_0_0_#1a1715]"
            )}
          >
            <Icon size={18} className={cn(isActive ? "text-[#f4ebd9]" : "opacity-70")} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
