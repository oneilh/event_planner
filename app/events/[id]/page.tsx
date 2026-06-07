import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GoingButton from "@/app/components/GoingButton";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, Info } from "lucide-react";
import EditEventButton from "@/app/components/EditEventButton";
import DeleteEventButton from "@/app/components/DeleteEventButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      attendees: {
        where: { id: session?.user?.id || "" },
        select: { id: true }
      }
    }
  });

  if (!event) {
    notFound();
  }

  const isOwner = session?.user?.id === event.userId;
  const isGoing = event.attendees.length > 0;

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const imageUrl = event.imageUrl || "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
      
      {/* Back Navigation */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to all events
      </Link>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Content Column */}
        <div className="flex-1 space-y-8">
          
          {/* Header Info */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">
                By {event.organizer}
              </p>
              <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tight">
                {event.title}
              </h1>
            </div>
            {isOwner && (
              <div className="pt-2 flex-shrink-0 flex items-center gap-3">
                <EditEventButton event={event} />
                <DeleteEventButton eventId={event.id} />
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="w-full h-[400px] rounded-sm overflow-hidden relative border border-[var(--border)]">
            <img 
              src={imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="bg-[var(--bg-card)] p-8 rounded-sm border-[1.5px] border-[var(--border)]">
            <div className="flex items-center gap-3 mb-4 text-[var(--text-primary)]">
              <Info className="w-6 h-6 text-[var(--text-secondary)]" />
              <h2 className="text-2xl font-bold">About this event</h2>
            </div>
            <div className="max-w-none text-[var(--text-secondary)] text-lg leading-relaxed whitespace-pre-wrap">
              {event.description}
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="sticky top-24 flex flex-col gap-6">
            
            {/* Event Details Card */}
            <div className="bg-[var(--bg-card)] border-[1.5px] border-[var(--border)] rounded-sm p-6 sm:p-8">
              
              <div className="space-y-6">
                {/* Date/Time */}
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-3 rounded-sm">
                    <Calendar className="w-6 h-6 text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] font-medium mb-1">Date and Time</p>
                    <p className="text-base font-bold text-[var(--text-primary)]">{formattedDate}</p>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-3 rounded-sm">
                    <MapPin className="w-6 h-6 text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] font-medium mb-1">Location</p>
                    <p className="text-base font-bold text-[var(--text-primary)]">{event.venue}</p>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">{event.location}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Registration Action Card */}
            <div className="bg-[var(--bg-card)] border-[1.5px] border-[var(--border)] rounded-sm p-6 sm:p-8 text-center">
              
              <div className="flex justify-center mb-4">
                <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-4 rounded-full">
                  <Users className="w-8 h-8 text-[var(--text-primary)]" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Join the Event</h3>
              
              <div className="flex items-center justify-center gap-2 mb-6 text-[var(--text-secondary)]">
                <span className="text-3xl font-black text-[var(--text-primary)]">{event.attendeesCount}</span>
                <span className="text-base font-medium">people going</span>
              </div>

              <div className="w-full">
                <GoingButton eventId={event.id} initialGoing={isGoing} size="large" />
              </div>
              
              <p className="text-xs text-[var(--text-muted)] mt-4 font-medium">
                Free to attend. Reserve your spot now.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
