"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { creatures, type InsertCreature } from "@/db/schema";

const saveCreature = async (creature: InsertCreature) => {
  try {
    const [newCreature] = await db
      .insert(creatures)
      .values(creature)
      .returning();
    return newCreature;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save creature");
  }
};

const getCreature = async (creatureId: string) => {
  try {
    const creature = await db.query.creatures.findFirst({
      where: eq(creatures.id, creatureId),
    });
    return creature;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { saveCreature, getCreature };
