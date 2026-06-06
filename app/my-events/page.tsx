import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyEventsTabs from "./MyEventsTabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function formatEvent(event: any) {
  const eventDate = new Date(event.date);
  const date = eventDate.getDate().toString();
  const month = eventDate.toLocaleString("default", { month: "short" });

  return {
    id: event.id,
    date: date,
    month: month,
    location: event.location,
    venue: event.venue,
    organizer: event.organizer,
    title: event.title,
    image: event.imageUrl || "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
    dateClass: "bg-white/20 dark:bg-black/40 text-white border border-white/30",
    attendees: event.attendeesCount,
  };
}

export default async function MyEventsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  // Fetch created events
  const dbCreatedEvents = await prisma.event.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  // Fetch joined events
  const dbJoinedEvents = await prisma.event.findMany({
    where: {
      attendees: {
        some: { id: userId },
      },
    },
    orderBy: { date: "asc" },
  });

  const createdEvents = dbCreatedEvents.map(formatEvent);
  const joinedEvents = dbJoinedEvents.map(formatEvent);

  return (
    <div className="py-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Back Navigation */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to all events
      </Link>

      <div className="flex flex-col mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-[family-name:var(--font-inter)] mb-2">
          My Events
        </h1>
        <p className="text-base text-[var(--text-muted)] font-medium">
          Manage your created events and track events you are attending
        </p>
      </div>

      <MyEventsTabs createdEvents={createdEvents} joinedEvents={joinedEvents} />
    </div>
  );
}
