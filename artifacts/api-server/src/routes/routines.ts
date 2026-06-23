import { Router } from "express";
import { db } from "@workspace/db";
import { routinesTable, trainersTable } from "@workspace/db";
import { eq, ilike, and, sql, inArray } from "drizzle-orm";
import {
  ListRoutinesQueryParams,
  CreateRoutineBody,
  GetRoutineParams,
  UpdateRoutineParams,
  UpdateRoutineBody,
  DeleteRoutineParams,
} from "@workspace/api-zod";

const router = Router();

async function attachTrainerName(routines: (typeof routinesTable.$inferSelect)[]) {
  if (routines.length === 0) return [];
  const trainerIds = [...new Set(routines.map((r) => r.trainerId))];
  const trainers = await db
    .select({ id: trainersTable.id, name: trainersTable.name })
    .from(trainersTable)
    .where(inArray(trainersTable.id, trainerIds));
  const nameMap = Object.fromEntries(trainers.map((t) => [t.id, t.name]));
  return routines.map((r) => ({
    ...r,
    trainerName: nameMap[r.trainerId] ?? null,
    createdAt: r.createdAt.toISOString(),
  }));
}

router.get("/featured", async (_req, res) => {
  const routines = await db
    .select()
    .from(routinesTable)
    .where(eq(routinesTable.isFeatured, true))
    .limit(8);
  res.json(await attachTrainerName(routines));
});

router.get("/", async (req, res) => {
  const parsed = ListRoutinesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }
  const { category, difficulty, trainerId } = parsed.data;

  const conditions = [];
  if (category) conditions.push(ilike(routinesTable.category, `%${category}%`));
  if (difficulty) conditions.push(ilike(routinesTable.difficulty, `%${difficulty}%`));
  if (trainerId) conditions.push(eq(routinesTable.trainerId, trainerId));

  const routines = conditions.length
    ? await db.select().from(routinesTable).where(and(...conditions))
    : await db.select().from(routinesTable);

  res.json(await attachTrainerName(routines));
});

router.post("/", async (req, res) => {
  const parsed = CreateRoutineBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const [routine] = await db.insert(routinesTable).values(parsed.data).returning();
  const [withName] = await attachTrainerName([routine]);
  res.status(201).json(withName);
});

router.get("/:id", async (req, res) => {
  const parsed = GetRoutineParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [routine] = await db
    .select()
    .from(routinesTable)
    .where(eq(routinesTable.id, parsed.data.id));
  if (!routine) {
    res.status(404).json({ error: "Routine not found" });
    return;
  }
  const [withName] = await attachTrainerName([routine]);
  res.json(withName);
});

router.patch("/:id", async (req, res) => {
  const paramsParsed = UpdateRoutineParams.safeParse({ id: Number(req.params.id) });
  const bodyParsed = UpdateRoutineBody.safeParse(req.body);
  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const [updated] = await db
    .update(routinesTable)
    .set(bodyParsed.data)
    .where(eq(routinesTable.id, paramsParsed.data.id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Routine not found" });
    return;
  }
  const [withName] = await attachTrainerName([updated]);
  res.json(withName);
});

router.delete("/:id", async (req, res) => {
  const parsed = DeleteRoutineParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  await db.delete(routinesTable).where(eq(routinesTable.id, parsed.data.id));
  res.status(204).send();
});

export default router;
