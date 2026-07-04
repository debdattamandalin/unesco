"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OfficeSettingsPage() {
  const { saveGame, loadGame, currentSaveSlot } = useGameStore();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSave = () => {
    saveGame();
    setMessage("GAME SAVED SUCCESSFULLY.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLoad = () => {
    const success = loadGame(currentSaveSlot);
    if (success) {
      setMessage("GAME LOADED SUCCESSFULLY.");
    } else {
      setMessage("NO SAVE FILE FOUND.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-y-8 h-full">
      <div className="border-b-4 border-foreground pb-4 inline-block">
        <h1 className="text-4xl font-bold font-heading uppercase tracking-tighter" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>System Settings</h1>
        <p className="text-muted-foreground font-typewriter uppercase tracking-widest text-sm mt-2 font-bold">Adjust your experience or return to the main menu.</p>
      </div>
      
      <Card className="max-w-xl paper-texture border-2 border-[#1a1715] shadow-[4px_4px_0_0_#1a1715] rounded-none">
        <CardHeader className="border-b-2 border-[#1a1715] bg-[#e8e1d5]">
          <CardTitle className="font-heading uppercase text-xl">Session Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6 bg-[#f9f4ec]">
          <Button variant="secondary" className="w-full" onClick={handleSave}>Save Game</Button>
          <Button variant="outline" className="w-full" onClick={handleLoad}>Load Game</Button>
          <Button variant="destructive" className="w-full" onClick={() => router.push('/')}>Quit to Main Menu</Button>
          
          {message && (
            <div className="text-center font-typewriter font-bold text-sm text-[#1a1715] pt-2 bg-[#e8e1d5] border-2 border-[#1a1715] p-2 mt-4">
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
