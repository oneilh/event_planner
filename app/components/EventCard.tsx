"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoingButton from "./GoingButton";
import EventCardActions from "./EventCardActions";

interface EventProps {
  id: string;
  title: string;
  organizer: string;
  venue: string;
  location: string;
  image: string;
  date: string;
  month: string;
  dateClass: string;
  attendees: number;
  initialGoing?: boolean;
  attendeeAvatars?: string[];
}

export default function EventCard({ 
  event, 
  isOwner,
  rawEvent
}: { 
  event: EventProps;
  isOwner?: boolean;
  rawEvent?: any;
}) {
  const router = useRouter();
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  return (
    <div 
      onClick={() => router.push(`/events/${event.id}`)}
      className="cursor-pointer group rounded-sm p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full min-h-[340px] border-[1.5px] border-white/30 hover:border-white/60 text-white block"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${event.image})` }}
      />
      {/* Elegant dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 pointer-events-none" />
      
      {/* Subtle dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />

      {/* Top row: Date and Location */}
      <div className="flex items-start justify-between mb-auto z-10 gap-2">
        <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`${event.dateClass} rounded-2xl w-14 h-14 flex flex-col items-center justify-center flex-shrink-0 shadow-md backdrop-blur-md transition-transform group-hover:scale-105 duration-300`}>
            <span className="text-xl font-black leading-none">{event.date}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest mt-0.5">{event.month}</span>
          </div>
          <div className="flex flex-col drop-shadow-md min-w-0 flex-1">
            <p className="text-sm font-bold opacity-95 leading-tight truncate">{event.location}</p>
            <p className="text-xs font-medium opacity-80 mt-0.5 truncate">{event.venue}</p>
          </div>
        </div>
        <div className="z-20 relative flex-shrink-0">
          {isOwner && rawEvent ? (
            <EventCardActions event={rawEvent} />
          ) : (
            <GoingButton eventId={event.id} initialGoing={event.initialGoing} size="small" />
          )}
        </div>
      </div>

      {/* Middle row: Title and Organizer */}
      <div className="mt-8 mb-4 z-10 flex flex-col gap-1 drop-shadow-lg">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-300">{event.organizer}</p>
        <Link href={`/events/${event.id}`} onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight mt-1 mb-4 text-white group-hover:text-gray-200 transition-colors">
            {event.title}
          </h2>
        </Link>
      </div>

      {/* Footer row: Attendees */}
      <div className="flex items-center justify-between z-10 mt-auto pt-4 border-t border-white/20">
        <span className="text-sm font-semibold opacity-90 drop-shadow-sm">Going</span>
        <div className="flex items-center">
          {event.attendees > 0 ? (
            <>
              <div className="flex -space-x-2">
                {event.attendees >= 1 && (
                  <img 
                    src={!img1Error && event.attendeeAvatars?.[0] ? event.attendeeAvatars[0] : `https://i.pravatar.cc/100?img=${event.id.charCodeAt(0) % 10 + 3}`} 
                    alt="user" 
                    className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-black/40" 
                    onError={() => setImg1Error(true)}
                  />
                )}
                {event.attendees >= 2 && (
                  <img 
                    src={!img2Error && event.attendeeAvatars?.[1] ? event.attendeeAvatars[1] : `https://i.pravatar.cc/100?img=${event.id.charCodeAt(0) % 10 + 4}`} 
                    alt="user" 
                    className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-black/40" 
                    onError={() => setImg2Error(true)}
                  />
                )}
              </div>
              {event.attendees > 2 && (
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold flex items-center justify-center -ml-2 z-10 border border-white/30 shadow-sm">
                  +{event.attendees - 2}
                </div>
              )}
            </>
          ) : (
            <span className="text-xs text-white/70 italic font-medium">Be the first to join</span>
          )}
        </div>
      </div>
    </div>
  );
}
