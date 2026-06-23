import { pgTable, serial, text, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const trainersTable = pgTable("trainers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
  location: text("location").notNull(),
  specialty: text("specialty").notNull(),
  avatarUrl: text("avatar_url"),
  certificationLevel: text("certification_level").notNull(),
  rating: real("rating").notNull().default(4.5),
  totalFollowers: integer("total_followers").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTrainerSchema = createInsertSchema(trainersTable).omit({ id: true, createdAt: true });
export type InsertTrainer = z.infer<typeof insertTrainerSchema>;
export type Trainer = typeof trainersTable.$inferSelect;
