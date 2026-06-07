import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyEventsTabs from "./MyEventsTabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function formatEvent(event: any, userId: string, initialGoing: boolean) {
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
    initialGoing,
    attendeeAvatars: event.attendees?.map((a: any) => a.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}`) || [],
    rawEvent: event,
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
    include: {
      attendees: {
        take: 2,
        select: { id: true, image: true, name: true }
      },
    },
    orderBy: { date: "asc" },
  });

  // Fetch joined events
  const dbJoinedEvents = await prisma.event.findMany({
    where: {
      attendees: {
        some: { id: userId },
      },
    },
    include: {
      attendees: {
        take: 2,
        select: { id: true, image: true, name: true }
      },
    },
    orderBy: { date: "asc" },
  });

  const joinedEventIds = new Set(dbJoinedEvents.map(e => e.id));

  // The user might have created events they also joined. We check against `joinedEventIds`
  // Wait, `dbJoinedEvents` only fetches joined events. To be perfectly accurate for created events,
  // we check if they are in `joinedEventIds`, but wait! If a created event is not in `dbJoinedEvents`, 
  // they didn't join it. But wait, `dbJoinedEvents` will contain ALL joined events, which is correct.
  const createdEvents = dbCreatedEvents.map(e => formatEvent(e, userId, joinedEventIds.has(e.id)));
  const joinedEvents = dbJoinedEvents.map(e => formatEvent(e, userId, true));

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
