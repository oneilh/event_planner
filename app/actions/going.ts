"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function toggleGoingStatus(eventId: string, isGoing: boolean) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    return { error: "You must be logged in to join an event", status: 401 };
  }

  const userId = session.user.id;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) throw new Error("Event not found");

  if (isGoing) {
    // They are cancelling
    await prisma.event.update({
      where: { id: eventId },
      data: {
        attendeesCount: Math.max(0, event.attendeesCount - 1),
        attendees: {
          disconnect: { id: userId }
        }
      },
    });
  } else {
    // They are joining
    await prisma.event.update({
      where: { id: eventId },
      data: {
        attendeesCount: event.attendeesCount + 1,
        attendees: {
          connect: { id: userId }
        }
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${eventId}`);
  revalidatePath("/my-events");
}
