import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const progressTable = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  routineId: integer("routine_id").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
  durationMinutes: integer("duration_minutes").notNull(),
  notes: text("notes"),
  caloriesBurned: integer("calories_burned"),
});

export const insertProgressSchema = createInsertSchema(progressTable).omit({ id: true, completedAt: true });
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type ProgressEntry = typeof progressTable.$inferSelect;
