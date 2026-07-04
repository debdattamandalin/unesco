import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UpgradesPage() {
  return (
    <div className="space-y-8 h-full">
      <div className="border-b-4 border-foreground pb-4 inline-block">
        <h1 className="text-4xl font-bold font-heading uppercase tracking-tighter" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>Upgrades</h1>
        <p className="text-muted-foreground font-typewriter uppercase tracking-widest text-sm mt-2 font-bold">Invest in new equipment, hire staff, and expand your reach.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <Card className="paper-texture border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] rounded-none">
          <CardHeader className="border-b-2 border-[#1a1715] bg-[#e8e1d5]">
            <CardTitle className="font-heading uppercase text-xl">Staff Management</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm font-typewriter font-bold uppercase tracking-widest text-[#5c534d] mb-6">Current Staff: 1</p>
            <Button className="w-full">Hire Junior Reporter ($500)</Button>
          </CardContent>
        </Card>
        
        <Card className="paper-texture border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] rounded-none">
          <CardHeader className="border-b-2 border-[#1a1715] bg-[#e8e1d5]">
            <CardTitle className="font-heading uppercase text-xl">Equipment</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm font-typewriter font-bold uppercase tracking-widest text-[#5c534d] mb-6">Current Equipment: Basic Press</p>
            <Button className="w-full">Upgrade Press ($2000)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
