"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";

export default function GameClockManager() {
  const { tickClock, isDayEnded } = useGameStore();

  useEffect(() => {
    // If the day is ended, don't set up the interval
    if (isDayEnded) return;

    // 1 real-life second = 1 game minute
    // 12 real-life minutes = 720 game minutes (12 game hours)
    const interval = setInterval(() => {
      tickClock();
    }, 1000);

    return () => clearInterval(interval);
  }, [tickClock, isDayEnded]);

  // This is a logic-only component, it renders nothing
  return null;
}
