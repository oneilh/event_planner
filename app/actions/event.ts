"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createEventAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const organizer = formData.get("organizer") as string;
  const venue = formData.get("venue") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const dateString = formData.get("date") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!title || !organizer || !venue || !location || !description || !dateString) {
    throw new Error("Missing required fields");
  }

  const date = new Date(dateString);

  await prisma.event.create({
    data: {
      title,
      organizer,
      venue,
      location,
      description,
      date,
      imageUrl: imageUrl || null,
      userId: session.user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/events");
}

export async function updateEventAction(id: string, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) throw new Error("Unauthorized");

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) throw new Error("Event not found");
  if (event.userId !== session.user.id) throw new Error("Unauthorized: you do not own this event");

  const title = formData.get("title") as string;
  const organizer = formData.get("organizer") as string;
  const venue = formData.get("venue") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const dateString = formData.get("date") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!title || !organizer || !venue || !location || !description || !dateString) {
    throw new Error("Missing required fields");
  }

  const date = new Date(dateString);

  await prisma.event.update({
    where: { id },
    data: {
      title,
      organizer,
      venue,
      location,
      description,
      date,
      imageUrl: imageUrl || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
}

export async function deleteEventAction(id: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) throw new Error("Unauthorized");

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) throw new Error("Event not found");
  if (event.userId !== session.user.id) throw new Error("Unauthorized: you do not own this event");

  await prisma.event.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/events");
  redirect("/");
}
