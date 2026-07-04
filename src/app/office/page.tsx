import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, TrendingDown } from "lucide-react";

export default function OfficeDashboardPage() {
  return (
    <div className="space-y-8 h-full">
      <div className="border-b-4 border-foreground pb-4 inline-block">
        <h1 className="text-4xl font-bold font-heading uppercase tracking-tighter" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>Today's Briefing</h1>
        <p className="text-muted-foreground font-typewriter uppercase tracking-widest text-sm mt-2 font-bold">Confidential • For Editor's Eyes Only</p>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <Card className="paper-texture border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] rounded-none">
          <CardHeader className="border-b-2 border-[#1a1715] bg-[#e8e1d5]">
            <CardTitle className="font-heading uppercase text-xl">Morning Headlines</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="border-2 border-dashed border-[#a89f91] p-4 bg-[#f9f4ec] text-center mb-6">
              <p className="text-sm text-[#5c534d] font-typewriter uppercase tracking-wider font-bold">No Breaking News Received</p>
            </div>
            <Button className="w-full flex items-center justify-center gap-2 h-12">
              <Send size={16} />
              Dispatch Reporters
            </Button>
          </CardContent>
        </Card>
        
        <Card className="paper-texture border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] rounded-none">
          <CardHeader className="border-b-2 border-[#1a1715] bg-[#e8e1d5]">
            <CardTitle className="font-heading uppercase text-xl">Daily Ledger</CardTitle>
          </CardHeader>
          <CardContent className="p-6 font-typewriter text-sm font-bold">
            <div className="space-y-3">
              <div className="flex justify-between border-b-2 border-dashed border-[#a89f91] pb-1">
                <span>Office Rent</span>
                <span>$150.00</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-[#a89f91] pb-1">
                <span>Staff Salaries</span>
                <span>$300.00</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-[#a89f91] pb-1">
                <span>Printing Ink</span>
                <span>$50.00</span>
              </div>
              <div className="flex justify-between pt-2 text-[#7f1d1d] text-base">
                <span className="flex items-center gap-2"><TrendingDown size={16} /> Total Expenses</span>
                <span>-$500.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
