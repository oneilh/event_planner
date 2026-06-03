import Link from "next/link";
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const fetchedEvents = await prisma.event.findMany();
  
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
      attendees: event.attendeesCount
    };
  });

  return (
    <div className="py-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-[family-name:var(--font-inter)]">Nearby Events</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1.5 font-medium">Discover what's happening around you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {events.map((event) => (
          <div 
            key={event.id}
            className="group rounded-sm p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 relative overflow-hidden flex flex-col h-full min-h-[340px] border-[1.5px] border-white/30 hover:border-white/60 text-white"
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
            <div className="flex items-start justify-between mb-auto z-10">
              <div className="flex items-center gap-3">
                 <div className={`${event.dateClass} rounded-2xl w-14 h-14 flex flex-col items-center justify-center flex-shrink-0 shadow-md backdrop-blur-md transition-transform group-hover:scale-105 duration-300`}>
                  <span className="text-xl font-black leading-none">{event.date}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest mt-0.5">{event.month}</span>
                </div>
                <div className="flex flex-col drop-shadow-md">
                  <p className="text-sm font-bold opacity-95 leading-tight">{event.location}</p>
                  <p className="text-xs font-medium opacity-80 mt-0.5">{event.venue}</p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            {/* Middle row: Title and Organizer */}
            <div className="mt-8 mb-4 z-10 flex flex-col gap-1 drop-shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-300">{event.organizer}</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight mt-1 mb-4 text-white group-hover:text-gray-200 transition-colors">{event.title}</h2>
            </div>

            {/* Footer row: Attendees */}
            <div className="flex items-center justify-between z-10 mt-auto pt-4 border-t border-white/20">
              <span className="text-sm font-semibold opacity-90 drop-shadow-sm">Going</span>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <img src={`https://i.pravatar.cc/100?img=${event.id * 10 + 3}`} alt="user" className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-black/40" />
                  <img src={`https://i.pravatar.cc/100?img=${event.id * 10 + 4}`} alt="user" className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-black/40" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold flex items-center justify-center -ml-2 z-10 border border-white/30 shadow-sm">
                  +{event.attendees}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
