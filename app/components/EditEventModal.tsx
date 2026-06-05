"use client";

import { useTransition } from "react";
import { updateEventAction } from "@/app/actions/event";

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

type Props = {
  event: Event;
  onClose: () => void;
};

export default function EditEventModal({ event, onClose }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      try {
        await updateEventAction(event.id, formData);
        onClose();
      } catch (error) {
        console.error("Failed to update event:", error);
      }
    });
  };

  // Format date for datetime-local input: "YYYY-MM-DDThh:mm"
  const formattedDate = new Date(event.date.getTime() - event.date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
      <div
        className="relative mx-4 w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-2xl my-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isPending}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] disabled:opacity-50 cursor-pointer"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h2 className="mb-1 text-2xl font-bold text-[var(--text-primary)]">
          Edit Event
        </h2>
        <p className="mb-8 text-sm text-[var(--text-muted)]">
          Update the details below to edit your event.
        </p>

        {/* Form */}
        <form action={handleAction} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Event Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={event.title}
                placeholder="e.g. Summer Music Festival"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]"
              />
            </div>

            {/* Organizer */}
            <div>
              <label htmlFor="organizer" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Organizer
              </label>
              <input
                id="organizer"
                name="organizer"
                type="text"
                defaultValue={event.organizer}
                placeholder="e.g. Acme Corp"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Date & Time
              </label>
              <input
                id="date"
                name="date"
                type="datetime-local"
                defaultValue={formattedDate}
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]"
              />
            </div>

            {/* Venue */}
            <div>
              <label htmlFor="venue" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Venue Name
              </label>
              <input
                id="venue"
                name="venue"
                type="text"
                defaultValue={event.venue}
                placeholder="e.g. Central Park"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Address / City
              </label>
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={event.location}
                placeholder="e.g. New York, NY"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]"
              />
            </div>
            
            {/* Image URL */}
            <div className="sm:col-span-2">
              <label htmlFor="imageUrl" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Image URL (Optional)
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={event.imageUrl || ""}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={event.description}
                placeholder="Tell people about your event..."
                rows={3}
                required
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 rounded-xl border-2 border-[var(--border)] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
