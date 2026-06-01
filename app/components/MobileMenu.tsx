import Link from "next/link";
import { Sun, Moon, Plus, LogIn, UserPlus } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mounted: boolean;
  isDark: boolean;
  toggleDarkMode: () => void;
  setShowCreateModal: (show: boolean) => void;
}

export default function MobileMenu({
  isOpen,
  setIsOpen,
  mounted,
  isDark,
  toggleDarkMode,
  setShowCreateModal,
}: MobileMenuProps) {
  return (
    <div
      className={`absolute left-4 right-4 top-[76px] z-50 md:hidden transition-all duration-300 origin-top-right ${
        isOpen
          ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
          : "opacity-0 scale-95 pointer-events-none -translate-y-2"
      }`}
    >
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 shadow-2xl">
        <div className="flex flex-col gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-secondary)]">
                {mounted && isDark ? <Moon size={16} /> : <Sun size={16} />}
              </div>
              {mounted && isDark ? "Dark Mode" : "Light Mode"}
            </span>
            <div
              className={`w-10 h-6 rounded-full p-1 transition-colors flex items-center ${
                mounted && isDark ? "bg-[var(--accent)]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                  mounted && isDark ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </button>

          <div className="h-px w-full bg-[var(--border)] my-1" />

          {/* Create Event */}
          <button
            onClick={() => {
              setShowCreateModal(true);
              setIsOpen(false);
            }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-violet-500 px-4 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg dark:from-white dark:to-gray-200 dark:text-black w-full cursor-pointer"
          >
            <Plus size={18} />
            Create Event
          </button>

          {/* Auth Links */}
          <div className="mt-1 flex gap-3">
            <Link
              href="/login"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={16} />
              Log In
            </Link>
            <Link
              href="/signup"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-violet-600 hover:shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus size={16} />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
