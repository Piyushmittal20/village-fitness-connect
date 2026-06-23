import { Router } from "express";
import { db } from "@workspace/db";
import { trainersTable, routinesTable, dietPlansTable, progressTable } from "@workspace/db";
import { eq, sql, desc } from "drizzle-orm";

const router = Router();

router.get("/summary", async (_req, res) => {
  const [trainerCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(trainersTable);

  const [routineCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(routinesTable);

  const [dietCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(dietPlansTable);

  const [progressCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(progressTable);

  const featuredRoutines = await db
    .select()
    .from(routinesTable)
    .where(eq(routinesTable.isFeatured, true))
    .limit(4);

  const topTrainers = await db
    .select()
    .from(trainersTable)
    .orderBy(desc(trainersTable.rating))
    .limit(3);

  res.json({
    totalTrainers: trainerCount?.count ?? 0,
    totalRoutines: routineCount?.count ?? 0,
    totalDietPlans: dietCount?.count ?? 0,
    totalProgressSessions: progressCount?.count ?? 0,
    villagesReached: Math.floor((trainerCount?.count ?? 0) * 3.2),
    featuredRoutines: featuredRoutines.map((r) => ({
      ...r,
      trainerName: null,
      createdAt: r.createdAt.toISOString(),
    })),
    topTrainers: topTrainers.map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
    })),
  });
});

export default router;
