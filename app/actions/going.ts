"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleGoingStatus(eventId: string, isGoing: boolean) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) throw new Error("Event not found");

  const newCount = isGoing 
    ? Math.max(0, event.attendeesCount - 1) // If already going, they are cancelling
    : event.attendeesCount + 1; // If not going, they are joining

  await prisma.event.update({
    where: { id: eventId },
    data: {
      attendeesCount: newCount,
    },
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${eventId}`);
}
