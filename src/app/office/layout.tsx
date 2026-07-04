import SidebarNav from "@/components/game/SidebarNav";
import StatsBar from "@/components/game/StatsBar";
import NotificationFeed from "@/components/game/NotificationFeed";
import PageTransition from "@/components/layout/PageTransition";
import GameClockManager from "@/components/game/GameClockManager";
import DayEndShutter from "@/components/game/DayEndShutter";

export default function OfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-[#f4ebd9] text-[#2d2825] flex overflow-hidden paper-texture">
      <GameClockManager />
      <DayEndShutter />
      
      {/* Left Sidebar */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow relative overflow-hidden">
        {/* Top Stats Bar */}
        <StatsBar />

        {/* Dashboard Content */}
        <main className="flex-grow p-8 overflow-y-auto [scrollbar-gutter:stable]">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>

      {/* Right Sidebar - Notifications */}
      <NotificationFeed />
    </div>
  );
}
