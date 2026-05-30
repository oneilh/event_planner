import Link from "next/link";
// import prisma from '@/lib/prisma';

export default async function Home() {
  // Replace this array with your Prisma query later:
  // const events = await prisma.event.findMany();
  
  const events = [
    {
      id: 1,
      date: "24",
      month: "Sept",
      location: "San Francisco",
      venue: "Golden Gate Pavilion",
      organizer: "Visionary Arts Group",
      title: "Summer Music Festival",
      // Blue card: vibrant in light mode, deeper in dark mode
      cardClass: "bg-indigo-500 text-white dark:bg-indigo-900/60 dark:text-indigo-100 dark:border dark:border-indigo-500/30",
      dateClass: "bg-indigo-950 text-white dark:bg-indigo-950/80 dark:text-indigo-200",
      attendees: 9
    },
    {
      id: 2,
      date: "25",
      month: "Sept",
      location: "San Francisco",
      venue: "Arts and Culture Center",
      organizer: "Visionary Arts Group",
      title: "Spring Art Extravaganza",
      // Green card: pastel/vibrant in light mode, deeper in dark mode
      cardClass: "bg-emerald-300 text-emerald-950 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border dark:border-emerald-500/30",
      dateClass: "bg-emerald-900 text-emerald-50 dark:bg-emerald-950/80 dark:text-emerald-200",
      attendees: 5
    },
    {
      id: 3,
      date: "26",
      month: "Sept",
      location: "San Francisco",
      venue: "Street Style Festival",
      organizer: "Urban Fashion Collective",
      title: "Trendy Threads Festival",
      // Pink card: pastel/vibrant in light mode, deeper in dark mode
      cardClass: "bg-pink-300 text-pink-950 dark:bg-pink-900/40 dark:text-pink-100 dark:border dark:border-pink-500/30",
      dateClass: "bg-pink-900 text-pink-50 dark:bg-pink-950/80 dark:text-pink-200",
      attendees: 10
    },
    {
      id: 4,
      date: "27",
      month: "Sept",
      location: "Los Angeles",
      venue: "Downtown Arena",
      organizer: "Live Nation",
      title: "Neon Nights Concert",
      // Purple card
      cardClass: "bg-purple-400 text-purple-950 dark:bg-purple-900/50 dark:text-purple-100 dark:border dark:border-purple-500/30",
      dateClass: "bg-purple-950 text-purple-50 dark:bg-purple-950/80 dark:text-purple-200",
      attendees: 24
    }
  ];

  return (
    <div className="py-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 px-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Nearby Events</h1>
      </div>

      {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop, 4 cols on extra large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
        {events.map((event) => (
          <div 
            key={event.id}
            className={`${event.cardClass} rounded-[2rem] p-6 shadow-md hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden flex flex-col h-full min-h-[240px]`}
          >
            {/* Top row: Date circle and Location */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`${event.dateClass} rounded-full w-14 h-14 flex flex-col items-center justify-center flex-shrink-0 shadow-inner`}>
                <span className="text-xl font-bold leading-tight">{event.date}</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider">{event.month}</span>
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold opacity-90">{event.location}</p>
                <p className="text-xs font-medium opacity-75">{event.venue}</p>
              </div>
            </div>

            {/* Middle row: Organizer and Title */}
            <div className="mb-8 w-[85%] flex-grow">
              <p className="text-xs font-bold opacity-75 mb-1">{event.organizer}</p>
              <h2 className="text-2xl font-black leading-tight tracking-tight">{event.title}</h2>
            </div>

            {/* Bottom right: Attendees avatars */}
            <div className="absolute bottom-6 right-6 flex items-center">
              <div className="flex -space-x-3">
                <img src={`https://i.pravatar.cc/100?img=${event.id * 10 + 3}`} alt="user" className="w-9 h-9 rounded-full border-2 border-transparent object-cover shadow-sm" />
                <img src={`https://i.pravatar.cc/100?img=${event.id * 10 + 4}`} alt="user" className="w-9 h-9 rounded-full border-2 border-transparent object-cover shadow-sm" />
              </div>
              <div className="w-9 h-9 rounded-full bg-white dark:bg-[var(--bg-secondary)] text-black dark:text-[var(--text-primary)] text-xs font-bold flex items-center justify-center -ml-3 z-10 border-2 border-transparent shadow-sm">
                {event.attendees}+
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
