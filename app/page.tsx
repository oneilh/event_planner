import Link from "next/link";
import { ArrowRight, Calendar, Users, Zap, Shield, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-[var(--bg-primary)]">
      {/* Background blurred shapes */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[var(--accent)] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] clip-path-polygon"></div>
      </div>

      <div className="w-full pb-24 pt-10 sm:pb-32 lg:flex lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6 rounded-full bg-[var(--accent-light)]/50 px-3 py-1 text-sm font-semibold leading-6 text-[var(--accent)] ring-1 ring-inset ring-[var(--accent)]/20 hover:ring-[var(--accent)]/40 transition-all hover:scale-105">
              <span className="flex items-center gap-1"><Sparkles size={14}/> What's new</span>
              <span className="inline-flex items-center space-x-2 text-[var(--text-secondary)] font-medium">
                <span>Just shipped v1.0</span>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-6xl text-balance">
            Plan extraordinary events with effortless precision
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)] text-pretty animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            EventPlanner is the modern platform designed to help you organize, manage, and execute flawless events. From small meetups to massive conferences, we've got you covered.
          </p>
          <div className="mt-10 flex items-center gap-x-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link
              href="/signup"
              className="rounded-xl bg-gradient-to-r from-[var(--accent)] to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:from-white dark:to-gray-200 dark:text-black"
            >
              Get started
            </Link>
            <Link href="/demo" className="group text-sm font-semibold leading-6 text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
              View live demo <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
        
        {/* Right side floating UI elements */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative rounded-2xl bg-[var(--bg-secondary)]/60 backdrop-blur-xl border border-[var(--border)] shadow-2xl ring-1 ring-white/10 w-full sm:w-[40rem] p-8">
              <div className="flex justify-between items-center mb-8 border-b border-[var(--border)] pb-4">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Upcoming Events</h3>
                <span className="text-sm text-[var(--accent)] font-medium cursor-pointer hover:underline">View all</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Annual Tech Summit", date: "Oct 24", attendees: 1200, icon: <Zap size={20} className="text-yellow-500"/> },
                  { name: "Design Leadership Workshop", date: "Nov 12", attendees: 45, icon: <Sparkles size={20} className="text-purple-500"/> },
                  { name: "Community Meetup", date: "Dec 05", attendees: 150, icon: <Users size={20} className="text-blue-500"/> },
                ].map((event, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)]/50 hover:bg-[var(--bg-primary)] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-[var(--bg-secondary)] shadow-sm border border-[var(--border)] transition-transform group-hover:scale-110">
                        {event.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{event.name}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{event.date} • {event.attendees} attending</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full pb-24">
        <div className="mx-auto max-w-2xl lg:text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h2 className="text-base font-semibold leading-7 text-[var(--accent)]">Deploy faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl text-balance">
            Everything you need to run events
          </p>
          <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)] text-pretty">
            Streamline your workflow with powerful tools designed specifically for modern event organizers.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {[
              {
                name: 'Seamless Scheduling',
                description: 'Drag-and-drop interfaces make coordinating multiple tracks and speakers a breeze. Never double-book again.',
                icon: Calendar,
              },
              {
                name: 'Attendee Management',
                description: 'Keep track of RSVPs, dietary restrictions, and custom ticketing tiers all in one unified dashboard.',
                icon: Users,
              },
              {
                name: 'Lightning Fast',
                description: 'Built on edge infrastructure ensuring your event pages load instantly for users anywhere in the world.',
                icon: Zap,
              },
              {
                name: 'Enterprise Security',
                description: 'Bank-grade encryption for attendee data and payment processing, ensuring total compliance and peace of mind.',
                icon: Shield,
              },
            ].map((feature, i) => (
              <div key={feature.name} className="relative pl-16 group hover:bg-[var(--bg-secondary)] p-6 rounded-2xl transition-colors border border-transparent hover:border-[var(--border)] hover:shadow-lg animate-fade-in-up" style={{ animationDelay: `${500 + i * 100}ms` }}>
                <dt className="text-base font-semibold leading-7 text-[var(--text-primary)]">
                  <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] text-white shadow-md transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-[var(--text-secondary)]">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      {/* Background blurred shape bottom */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[var(--accent)] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] clip-path-polygon"></div>
      </div>
    </div>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
  )
}
