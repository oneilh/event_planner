"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEventAction(formData: FormData) {
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
    },
  });

  revalidatePath("/");
  revalidatePath("/events");
}
