import React from "react";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { LoadingSpinner, ErrorState } from "@/components/States";
import { Users, Activity, Target, MapPin } from "lucide-react";
import { RoutineCard, TrainerCard } from "@/components/Cards";
import { Link } from "wouter";

export default function PlatformDashboard() {
  const { data: dashboard, isLoading, error, refetch } = useGetDashboardSummary();

  if (isLoading) return <LoadingSpinner className="py-24" />;
  if (error || !dashboard) return <ErrorState retry={() => refetch()} />;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Platform Impact</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          See how the Rural Fitness movement is growing and bringing world-class training to communities everywhere.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="text-4xl font-display font-bold text-foreground mb-1">{dashboard.villagesReached}</h3>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Villages Reached</p>
        </div>
        
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="h-12 w-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-4xl font-display font-bold text-foreground mb-1">{dashboard.totalTrainers}</h3>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Certified Trainers</p>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="h-12 w-12 bg-accent/30 text-accent-foreground rounded-xl flex items-center justify-center mb-4">
            <Activity className="h-6 w-6" />
          </div>
          <h3 className="text-4xl font-display font-bold text-foreground mb-1">{dashboard.totalProgressSessions}</h3>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sessions Logged</p>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-4xl font-display font-bold text-foreground mb-1">{dashboard.totalRoutines}</h3>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Routines</p>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold">Trending Workouts</h2>
          <Link href="/routines" className="text-primary font-bold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboard.featuredRoutines.map(routine => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold">Top Contributors</h2>
          <Link href="/trainers" className="text-primary font-bold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboard.topTrainers.map(trainer => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </div>
  );
}
