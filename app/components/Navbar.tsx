"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Menu,
  X,
  Plus,
  User,
  LogIn,
  UserPlus,
  ChevronDown,
  CalendarDays,
  LogOut,
  Loader2,
} from "lucide-react";
import CreateEventModal from "./CreateEventModal";
import MobileMenu from "./MobileMenu";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <nav className="sticky top-4 z-50 rounded-2xl border border-[var(--border)] bg-transparent backdrop-blur-md mb-4">
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-md">
              <CalendarDays size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
              EventPlanner
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all hover:bg-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {mounted ? (
                isDark ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )
              ) : (
                <div className="h-[18px] w-[18px]" />
              )}
            </button>

            {/* Create Event Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
            >
              <Plus size={16} />
              Create Event
            </button>

            {/* Auth Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAuthDropdown((prev) => !prev)}
                disabled={isPending}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer disabled:opacity-70"
              >
                {isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : session ? (
                  session.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="h-5 w-5 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] text-white">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )
                ) : (
                  <User size={16} />
                )}
                {isPending ? "Loading..." : session ? session.user.name?.split(" ")[0] : "Account"}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${showAuthDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showAuthDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] py-1 shadow-xl">
                  {session ? (
                    <>
                      <div className="px-4 py-3 border-b border-[var(--border)]">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">{session.user.name}</p>
                        <p className="text-xs text-[var(--text-secondary)] truncate">{session.user.email}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await signOut();
                          setShowAuthDropdown(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 cursor-pointer"
                      >
                        <LogOut size={16} />
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                        onClick={() => setShowAuthDropdown(false)}
                      >
                        <LogIn size={16} />
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                        onClick={() => setShowAuthDropdown(false)}
                      >
                        <UserPlus size={16} />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border bg-[var(--bg-secondary)] md:hidden transition-colors cursor-pointer ${
              mobileMenuOpen
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--border)]"
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Floating Mobile Dropdown */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          setIsOpen={setMobileMenuOpen}
          mounted={mounted}
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          setShowCreateModal={setShowCreateModal}
        />
      </nav>

      {/* Create Event Modal */}
      {showCreateModal && (
        <CreateEventModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}
