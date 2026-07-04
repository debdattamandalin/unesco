import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Newspaper, BellRing } from "lucide-react";

const placeholderNotifications = [
  {
    id: 1,
    headline: "Mayor Denies Allegations",
    type: "news",
    time: "2 hours ago",
    content: "Local authorities remain tight-lipped as the scandal unfolds..."
  },
  {
    id: 2,
    headline: "New Tip Received",
    type: "alert",
    time: "5 hours ago",
    content: "An anonymous source has sent a secure message regarding the docks."
  },
  {
    id: 3,
    headline: "Competitor Publishes Scoop",
    type: "market",
    time: "1 day ago",
    content: "The Daily Bugle beat us to the tech sector leak. We lost 50 subscribers."
  }
];

export default function NotificationFeed() {
  return (
    <div className="w-80 shrink-0 bg-[#e8e1d5] border-l-4 border-[#1a1715] shadow-[-4px_0_0_0_rgba(0,0,0,0.05)] flex flex-col h-full z-10">
      <div className="p-4 border-b-2 border-[#1a1715] flex items-center space-x-3 bg-[#f4ebd9]">
        <div className="bg-[#1a1715] text-[#f4ebd9] p-1 border-2 border-[#1a1715]">
          <BellRing size={16} strokeWidth={2.5} />
        </div>
        <h3 className="font-bold tracking-widest text-[#1a1715] font-heading text-lg">THE WIRE</h3>
      </div>
      <ScrollArea className="flex-grow p-4 bg-[#e8e1d5]">
        <div className="space-y-6">
          {placeholderNotifications.map((notif) => (
            <div key={notif.id} className="relative">
              {/* Pin graphic */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-700 border-2 border-red-900 shadow-sm z-10"></div>
              
              <Card className="paper-texture border-2 border-[#1a1715] shadow-[3px_3px_0_0_#1a1715] rounded-none rotate-[0.5deg]">
                <CardHeader className="p-3 pb-2 border-b-2 border-dashed border-[#a89f91]">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-bold font-heading leading-tight uppercase">{notif.headline}</CardTitle>
                  </div>
                  <div className="text-[10px] text-[#5c534d] font-bold uppercase tracking-widest font-typewriter mt-1">
                    {notif.type} • {notif.time}
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <p className="text-xs text-[#2d2825] font-serif leading-relaxed">
                    {notif.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
