import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const dietPlansTable = pgTable("diet_plans", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  goal: text("goal").notNull(),
  dailyCalories: integer("daily_calories").notNull(),
  mealsPerDay: integer("meals_per_day").notNull(),
  durationWeeks: integer("duration_weeks").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDietPlanSchema = createInsertSchema(dietPlansTable).omit({ id: true, createdAt: true });
export type InsertDietPlan = z.infer<typeof insertDietPlanSchema>;
export type DietPlan = typeof dietPlansTable.$inferSelect;
