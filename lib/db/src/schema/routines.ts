import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const routinesTable = pgTable("routines", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  isFeatured: boolean("is_featured").notNull().default(false),
  totalEnrollments: integer("total_enrollments").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRoutineSchema = createInsertSchema(routinesTable).omit({ id: true, createdAt: true });
export type InsertRoutine = z.infer<typeof insertRoutineSchema>;
export type Routine = typeof routinesTable.$inferSelect;
