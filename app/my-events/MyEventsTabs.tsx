"use client";

import { useState } from "react";
import EventCard from "@/app/components/EventCard";
import { Calendar, Users } from "lucide-react";

interface EventProps {
  id: string;
  title: string;
  organizer: string;
  venue: string;
  location: string;
  image: string;
  date: string;
  month: string;
  dateClass: string;
  attendees: number;
  initialGoing?: boolean;
  attendeeAvatars?: string[];
  rawEvent?: any;
}

export default function MyEventsTabs({
  createdEvents,
  joinedEvents,
}: {
  createdEvents: EventProps[];
  joinedEvents: EventProps[];
}) {
  const [activeTab, setActiveTab] = useState<"created" | "joined">("created");

  const eventsToDisplay = activeTab === "created" ? createdEvents : joinedEvents;

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex border-b border-[var(--border)] mb-8">
        <button
          onClick={() => setActiveTab("created")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-200 cursor-pointer ${
            activeTab === "created"
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Created Events ({createdEvents.length})
        </button>
        <button
          onClick={() => setActiveTab("joined")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-200 cursor-pointer ${
            activeTab === "joined"
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
          }`}
        >
          <Users className="w-4 h-4" />
          Joined Events ({joinedEvents.length})
        </button>
      </div>

      {/* Empty State */}
      {eventsToDisplay.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)]">
            {activeTab === "created" ? <Calendar size={32} /> : <Users size={32} />}
          </div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            {activeTab === "created"
              ? "No Created Events"
              : "No Joined Events"}
          </h3>
          <p className="text-[var(--text-secondary)]">
            {activeTab === "created"
              ? "You haven’t created any events yet."
              : "You haven’t joined any events yet."}
          </p>
        </div>
      ) : (
        /* Event Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {eventsToDisplay.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              isOwner={activeTab === "created"} 
              rawEvent={event.rawEvent} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
