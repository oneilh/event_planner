"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function CreateEventModal({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend / Prisma
    console.log({ title, date, location, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="relative mx-4 w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h2 className="mb-1 text-xl font-bold text-[var(--text-primary)]">
          Create New Event
        </h2>
        <p className="mb-6 text-sm text-[var(--text-muted)]">
          Fill in the details below to create your event.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
              Event Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Music Festival"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Central Park, New York"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell people about your event..."
              rows={3}
              className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          {/* Actions */}
          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
