import { Router } from "express";
import { db } from "@workspace/db";
import { progressTable, routinesTable } from "@workspace/db";
import { eq, and, sql, desc, inArray } from "drizzle-orm";
import {
  ListProgressQueryParams,
  CreateProgressBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/summary", async (_req, res) => {
  const [totals] = await db
    .select({
      totalSessions: sql<number>`count(*)::int`,
      totalMinutes: sql<number>`coalesce(sum(${progressTable.durationMinutes}), 0)::int`,
    })
    .from(progressTable);

  const topRoutineIds = await db
    .select({ routineId: progressTable.routineId, cnt: sql<number>`count(*)::int` })
    .from(progressTable)
    .groupBy(progressTable.routineId)
    .orderBy(desc(sql`count(*)`))
    .limit(3);

  const topRoutines =
    topRoutineIds.length > 0
      ? await db
          .select()
          .from(routinesTable)
          .where(inArray(routinesTable.id, topRoutineIds.map((r) => r.routineId)))
      : [];

  res.json({
    totalSessions: totals?.totalSessions ?? 0,
    totalMinutes: totals?.totalMinutes ?? 0,
    currentStreak: 0,
    topRoutines: topRoutines.map((r) => ({
      ...r,
      trainerName: null,
      createdAt: r.createdAt.toISOString(),
    })),
  });
});

router.get("/", async (req, res) => {
  const parsed = ListProgressQueryParams.safeParse({
    userId: req.query.userId ? Number(req.query.userId) : undefined,
    routineId: req.query.routineId ? Number(req.query.routineId) : undefined,
  });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }
  const { userId, routineId } = parsed.data;

  const conditions = [];
  if (userId) conditions.push(eq(progressTable.userId, userId));
  if (routineId) conditions.push(eq(progressTable.routineId, routineId));

  const entries = conditions.length
    ? await db.select().from(progressTable).where(and(...conditions))
    : await db.select().from(progressTable);

  const routineIds = [...new Set(entries.map((e) => e.routineId))];
  const routineTitles =
    routineIds.length > 0
      ? await db
          .select({ id: routinesTable.id, title: routinesTable.title })
          .from(routinesTable)
          .where(inArray(routinesTable.id, routineIds))
      : [];
  const titleMap = Object.fromEntries(routineTitles.map((r) => [r.id, r.title]));

  res.json(
    entries.map((e) => ({
      ...e,
      routineTitle: titleMap[e.routineId] ?? null,
      completedAt: e.completedAt.toISOString(),
    }))
  );
});

router.post("/", async (req, res) => {
  const parsed = CreateProgressBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const [entry] = await db.insert(progressTable).values(parsed.data).returning();

  const [routine] = await db
    .select({ title: routinesTable.title })
    .from(routinesTable)
    .where(eq(routinesTable.id, entry.routineId));

  res.status(201).json({
    ...entry,
    routineTitle: routine?.title ?? null,
    completedAt: entry.completedAt.toISOString(),
  });
});

export default router;
