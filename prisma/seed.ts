import { prisma } from '../lib/prisma';

async function main() {
  await prisma.event.deleteMany(); // Clear existing events just in case

  const events = [
    {
      title: "Summer Music Festival",
      organizer: "Visionary Arts Group",
      venue: "Golden Gate Pavilion",
      location: "San Francisco",
      description: "Join us for the Summer Music Festival.",
      date: new Date('2024-09-24T18:00:00Z'),
      imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
      attendeesCount: 9,
    },
    {
      title: "Spring Art Extravaganza",
      organizer: "Visionary Arts Group",
      venue: "Arts and Culture Center",
      location: "San Francisco",
      description: "Experience beautiful art.",
      date: new Date('2024-09-25T10:00:00Z'),
      imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=800&auto=format&fit=crop",
      attendeesCount: 5,
    },
    {
      title: "Trendy Threads Festival",
      organizer: "Urban Fashion Collective",
      venue: "Street Style Festival",
      location: "San Francisco",
      description: "The best fashion event of the year.",
      date: new Date('2024-09-26T12:00:00Z'),
      imageUrl: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop",
      attendeesCount: 10,
    },
    {
      title: "Neon Nights Concert",
      organizer: "Live Nation",
      venue: "Downtown Arena",
      location: "Los Angeles",
      description: "A night of neon and music.",
      date: new Date('2024-09-27T20:00:00Z'),
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      attendeesCount: 24,
    }
  ];

  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
  }

  console.log('Seeded events successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
