import { Router } from "express";
import { db } from "@workspace/db";
import { trainersTable } from "@workspace/db";
import { routinesTable } from "@workspace/db";
import { dietPlansTable } from "@workspace/db";
import { eq, ilike, or, sql } from "drizzle-orm";
import {
  ListTrainersQueryParams,
  CreateTrainerBody,
  GetTrainerParams,
  GetTrainerStatsParams,
  GetTrainerRoutinesParams,
  GetTrainerDietPlansParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  const parsed = ListTrainersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }
  const { specialty, search } = parsed.data;

  let query = db.select().from(trainersTable).$dynamic();

  if (specialty) {
    query = query.where(ilike(trainersTable.specialty, `%${specialty}%`));
  } else if (search) {
    query = query.where(
      or(
        ilike(trainersTable.name, `%${search}%`),
        ilike(trainersTable.specialty, `%${search}%`),
        ilike(trainersTable.location, `%${search}%`)
      )
    );
  }

  const trainers = await query;
  res.json(
    trainers.map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
    }))
  );
});

router.post("/", async (req, res) => {
  const parsed = CreateTrainerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const [trainer] = await db.insert(trainersTable).values(parsed.data).returning();
  res.status(201).json({ ...trainer, createdAt: trainer.createdAt.toISOString() });
});

router.get("/:id", async (req, res) => {
  const parsed = GetTrainerParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [trainer] = await db.select().from(trainersTable).where(eq(trainersTable.id, parsed.data.id));
  if (!trainer) {
    res.status(404).json({ error: "Trainer not found" });
    return;
  }
  res.json({ ...trainer, createdAt: trainer.createdAt.toISOString() });
});

router.get("/:id/stats", async (req, res) => {
  const parsed = GetTrainerStatsParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const id = parsed.data.id;

  const [trainer] = await db.select().from(trainersTable).where(eq(trainersTable.id, id));
  if (!trainer) {
    res.status(404).json({ error: "Trainer not found" });
    return;
  }

  const [routineCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(routinesTable)
    .where(eq(routinesTable.trainerId, id));

  const [dietCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(dietPlansTable)
    .where(eq(dietPlansTable.trainerId, id));

  res.json({
    trainerId: id,
    totalRoutines: routineCount?.count ?? 0,
    totalDietPlans: dietCount?.count ?? 0,
    totalFollowers: trainer.totalFollowers,
    avgRating: trainer.rating,
  });
});

router.get("/:id/routines", async (req, res) => {
  const parsed = GetTrainerRoutinesParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const routines = await db
    .select()
    .from(routinesTable)
    .where(eq(routinesTable.trainerId, parsed.data.id));

  const trainer = await db
    .select({ name: trainersTable.name })
    .from(trainersTable)
    .where(eq(trainersTable.id, parsed.data.id));

  res.json(
    routines.map((r) => ({
      ...r,
      trainerName: trainer[0]?.name ?? null,
      createdAt: r.createdAt.toISOString(),
    }))
  );
});

router.get("/:id/diet-plans", async (req, res) => {
  const parsed = GetTrainerDietPlansParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const plans = await db
    .select()
    .from(dietPlansTable)
    .where(eq(dietPlansTable.trainerId, parsed.data.id));

  const trainer = await db
    .select({ name: trainersTable.name })
    .from(trainersTable)
    .where(eq(trainersTable.id, parsed.data.id));

  res.json(
    plans.map((p) => ({
      ...p,
      trainerName: trainer[0]?.name ?? null,
      createdAt: p.createdAt.toISOString(),
    }))
  );
});

export default router;
