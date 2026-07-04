import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatisticsPage() {
  return (
    <div className="space-y-8 h-full">
      <div className="border-b-4 border-foreground pb-4 inline-block">
        <h1 className="text-4xl font-bold font-heading uppercase tracking-tighter" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>Statistics</h1>
        <p className="text-muted-foreground font-typewriter uppercase tracking-widest text-sm mt-2 font-bold">Track your performance and audience growth over time.</p>
      </div>
      
      <Card className="paper-texture border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] rounded-none">
        <CardHeader className="border-b-2 border-[#1a1715] bg-[#e8e1d5]">
          <CardTitle className="font-heading uppercase text-xl">Subscriber Growth</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center p-6">
          <div className="w-full h-full border-2 border-dashed border-[#a89f91] p-4 bg-[#f9f4ec] flex items-center justify-center">
            <p className="text-sm text-[#5c534d] font-typewriter uppercase tracking-wider font-bold">Chart placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
