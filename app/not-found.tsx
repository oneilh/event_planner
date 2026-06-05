import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-[var(--bg-card)] border-[1.5px] border-[var(--border)] rounded-sm p-8 sm:p-12 max-w-lg w-full text-center flex flex-col items-center">
        
        {/* Icon Container */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-5 rounded-full mb-6">
          <FileQuestion className="w-12 h-12 text-[var(--text-primary)]" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4">
          404
        </h1>
        
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
          Page not found
        </h2>
        
        <p className="text-[var(--text-secondary)] text-base mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 rounded-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all events
        </Link>
      </div>
    </div>
  );
}
