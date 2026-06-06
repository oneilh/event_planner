import Link from "next/link";
import { Sun, Moon, Plus, LogIn, UserPlus, LogOut, Loader2 } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

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
  const { data: session, isPending } = useSession();

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
            className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg w-full cursor-pointer"
          >
            <Plus size={18} />
            Create Event
          </button>

          {/* Auth Links */}
          {isPending ? (
            <div className="mt-1 flex justify-center py-2">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
            </div>
          ) : session ? (
            <div className="mt-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-3 shadow-sm">
              <div className="flex items-center gap-3 mb-3 px-1">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg text-white">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{session.user.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{session.user.email}</p>
                </div>
              </div>
              <button
                onClick={async () => {
                  await signOut();
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          ) : (
            <div className="mt-1 flex justify-center">
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={18} />
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
