"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import EditEventModal from "./EditEventModal";
import { deleteEventAction } from "@/app/actions/event";

type RawEvent = {
  id: string;
  title: string;
  organizer: string;
  venue: string;
  location: string;
  description: string;
  date: Date;
  imageUrl: string | null;
};

interface EventCardActionsProps {
  event: RawEvent;
}

export default function EventCardActions({ event }: EventCardActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteEventAction(event.id);
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowEditModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white text-sm font-semibold hover:bg-black/60 hover:border-white/40 hover:-translate-y-0.5 transition-all shadow-md z-20 cursor-pointer"
          aria-label="Edit event"
        >
          <Edit size={16} />
          Edit
        </button>

        {/* 3-Dot Menu */}
        <div className="relative z-20" ref={menuRef}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 hover:-translate-y-0.5 transition-all shadow-md cursor-pointer"
            aria-label="More options"
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] shadow-xl overflow-hidden animate-fade-in-up origin-top-right">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  setShowDeleteModal(true);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && <EditEventModal event={event} onClose={() => setShowEditModal(false)} />}

      {/* Delete Modal */}
      {mounted && showDeleteModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div
            className="relative mx-4 w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-2xl my-auto animate-fade-in-up"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDeleteModal(false);
              }}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete();
                }}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowDeleteModal(false);
                }}
                disabled={isPending}
                className="w-full rounded-xl border-2 border-[var(--border)] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
