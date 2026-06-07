import Link from "next/link";
import { prisma } from '@/lib/prisma';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import GoingButton from "@/app/components/GoingButton";
import EventCard from "@/app/components/EventCard";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userJoinedEvents = session?.user?.id 
    ? await prisma.event.findMany({
        where: {
          attendees: { some: { id: session.user.id } }
        },
        select: { id: true }
      }).then(events => new Set(events.map(e => e.id)))
    : new Set();

  const fetchedEvents = await prisma.event.findMany({
    include: {
      attendees: {
        take: 2,
        select: { id: true, image: true, name: true }
      }
    }
  });
  
  const events = fetchedEvents.map(event => {
    const eventDate = new Date(event.date);
    const date = eventDate.getDate().toString();
    const month = eventDate.toLocaleString('default', { month: 'short' });

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
      initialGoing: userJoinedEvents.has(event.id),
      attendeeAvatars: event.attendees.map(a => a.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}`)
    };
  });

  return (
    <div className="py-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-[family-name:var(--font-inter)]">Nearby Events</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1.5 font-medium">Discover what's happening around you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {fetchedEvents.map((rawEvent, index) => {
          const event = events[index];
          const isOwner = session?.user?.id === rawEvent.userId;
          return (
            <EventCard 
              key={event.id} 
              event={event} 
              isOwner={isOwner} 
              rawEvent={rawEvent} 
            />
          );
        })}
      </div>
    </div>
  );
}
