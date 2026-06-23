import { Router } from "express";
import { db } from "@workspace/db";
import { dietPlansTable, trainersTable } from "@workspace/db";
import { eq, ilike, and, sql, inArray } from "drizzle-orm";
import {
  ListDietPlansQueryParams,
  CreateDietPlanBody,
  GetDietPlanParams,
} from "@workspace/api-zod";

const router = Router();

async function attachTrainerName(plans: (typeof dietPlansTable.$inferSelect)[]) {
  if (plans.length === 0) return [];
  const trainerIds = [...new Set(plans.map((p) => p.trainerId))];
  const trainers = await db
    .select({ id: trainersTable.id, name: trainersTable.name })
    .from(trainersTable)
    .where(inArray(trainersTable.id, trainerIds));
  const nameMap = Object.fromEntries(trainers.map((t) => [t.id, t.name]));
  return plans.map((p) => ({
    ...p,
    trainerName: nameMap[p.trainerId] ?? null,
    createdAt: p.createdAt.toISOString(),
  }));
}

router.get("/", async (req, res) => {
  const parsed = ListDietPlansQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }
  const { goal, trainerId } = parsed.data;

  const conditions = [];
  if (goal) conditions.push(ilike(dietPlansTable.goal, `%${goal}%`));
  if (trainerId) conditions.push(eq(dietPlansTable.trainerId, trainerId));

  const plans = conditions.length
    ? await db.select().from(dietPlansTable).where(and(...conditions))
    : await db.select().from(dietPlansTable);

  res.json(await attachTrainerName(plans));
});

router.post("/", async (req, res) => {
  const parsed = CreateDietPlanBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const [plan] = await db.insert(dietPlansTable).values(parsed.data).returning();
  const [withName] = await attachTrainerName([plan]);
  res.status(201).json(withName);
});

router.get("/:id", async (req, res) => {
  const parsed = GetDietPlanParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [plan] = await db
    .select()
    .from(dietPlansTable)
    .where(eq(dietPlansTable.id, parsed.data.id));
  if (!plan) {
    res.status(404).json({ error: "Diet plan not found" });
    return;
  }
  const [withName] = await attachTrainerName([plan]);
  res.json(withName);
});

export default router;
