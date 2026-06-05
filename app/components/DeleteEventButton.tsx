"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteEventAction } from "@/app/actions/event";

type Props = {
  eventId: string;
};

export default function DeleteEventButton({ eventId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteEventAction(eventId);
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-semibold text-red-500 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/10 cursor-pointer"
        aria-label="Delete Event"
      >
        <Trash2 className="h-4 w-4" />
        <span className="hidden sm:inline">Delete</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
          <div
            className="relative mx-4 w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-2xl my-auto animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={isPending}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] disabled:opacity-50 cursor-pointer"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 mb-4 mx-auto">
              <Trash2 className="h-6 w-6" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)] text-center">
              Delete Event?
            </h2>
            <p className="mb-8 text-sm text-[var(--text-muted)] text-center">
              This action cannot be undone. Are you sure you want to permanently delete this event?
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Yes, delete event"
                )}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isPending}
                className="w-full rounded-xl border-2 border-[var(--border)] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
