"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import EditEventModal from "./EditEventModal";

type Event = {
  id: string;
  title: string;
  organizer: string;
  venue: string;
  location: string;
  description: string;
  date: Date;
  imageUrl: string | null;
};

export default function EditEventButton({ event }: { event: Event }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
      >
        <Edit size={16} />
        Edit Event
      </button>

      {showModal && (
        <EditEventModal
          event={event}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
