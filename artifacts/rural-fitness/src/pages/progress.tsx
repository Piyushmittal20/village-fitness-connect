import React from "react";
import { useGetProgressSummary, useListProgress } from "@workspace/api-client-react";
import { LoadingSpinner, ErrorState, EmptyState } from "@/components/States";
import { Activity, Flame, Clock, Trophy, CalendarCheck } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";

export default function ProgressDashboard() {
  const { data: summary, isLoading: sLoading, error: sError } = useGetProgressSummary();
  const { data: sessions, isLoading: lLoading, error: lError } = useListProgress({ userId: 1 }); // Mock user ID 1

  if (sLoading || lLoading) return <LoadingSpinner className="py-24" />;
  if (sError || lError) return <ErrorState />;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">My Progress</h1>
        <p className="text-lg text-muted-foreground">
          Track your journey. Every session counts.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Trophy className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-primary-foreground/80 text-sm font-bold uppercase tracking-wider mb-2">Current Streak</h3>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-display font-extrabold">{summary?.currentStreak || 0}</span>
              <span className="text-xl mb-1 font-medium">Days</span>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-wider">Total Sessions</h3>
          </div>
          <span className="text-4xl font-display font-bold text-foreground">{summary?.totalSessions || 0}</span>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/30 text-accent-foreground rounded-lg">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-wider">Minutes Trained</h3>
          </div>
          <span className="text-4xl font-display font-bold text-foreground">{summary?.totalMinutes || 0}</span>
        </div>
      </div>

      {/* Recent Sessions */}
      <h2 className="text-2xl font-display font-bold mb-6 border-b pb-4">Recent Workouts</h2>
      
      {!sessions || sessions.length === 0 ? (
        <EmptyState 
          title="No workouts logged yet" 
          description="Start your journey by completing a routine today."
          action={
            <Link href="/routines" className="mt-4 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold">
              Find a Workout
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {sessions.map(session => (
            <div key={session.id} className="bg-background border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    <Link href={`/routines/${session.routineId}`} className="hover:text-primary transition-colors">
                      {session.routineTitle || `Workout #${session.routineId}`}
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(session.completedAt), 'MMMM d, yyyy • h:mm a')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 sm:pl-4 sm:border-l">
                <div className="text-center">
                  <p className="text-xl font-display font-bold text-foreground">{session.durationMinutes}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Mins</p>
                </div>
                {session.caloriesBurned && (
                  <div className="text-center">
                    <p className="text-xl font-display font-bold text-primary flex items-center justify-center gap-1">
                      <Flame className="h-4 w-4" /> {session.caloriesBurned}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Kcal</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
