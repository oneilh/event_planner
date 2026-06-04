"use client";

import { useState } from "react";
import { toggleGoingStatus } from "@/app/actions/going";

interface GoingButtonProps {
  eventId: string;
  initialGoing?: boolean;
  size?: "small" | "large";
}

export default function GoingButton({ eventId, initialGoing = false, size = "large" }: GoingButtonProps) {
  const [isGoing, setIsGoing] = useState(initialGoing);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link
    e.stopPropagation(); // Prevent card click
    
    setLoading(true);
    try {
      await toggleGoingStatus(eventId, isGoing);
      setIsGoing(!isGoing);
    } catch (error) {
      console.error("Failed to toggle going status", error);
    } finally {
      setLoading(false);
    }
  };

  if (size === "small") {
    return (
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`min-w-[85px] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 shadow-md ${
          isGoing 
            ? "bg-white/40 border border-white/60 text-white hover:bg-white/50" 
            : "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isGoing ? "Going ✓" : "Join"}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`w-full py-4 rounded-xl text-base font-bold tracking-wide shadow-lg transition-all duration-300 ${
        isGoing 
          ? "bg-white/30 border border-white/50 text-white hover:bg-white/40" 
          : "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 hover:border-white/50"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "Updating..." : isGoing ? "✓ You are Going" : "Count Me In"}
    </button>
  );
}
