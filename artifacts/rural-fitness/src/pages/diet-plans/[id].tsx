import React from "react";
import { useParams } from "wouter";
import { useGetDietPlan } from "@workspace/api-client-react";
import { LoadingSpinner, ErrorState } from "@/components/States";
import { Calendar, Target, Flame, Utensils } from "lucide-react";
import { Link } from "wouter";

export default function DietPlanDetail() {
  const { id } = useParams<{ id: string }>();
  const planId = parseInt(id || "0", 10);

  const { data: plan, isLoading, error, refetch } = useGetDietPlan(planId, { query: { enabled: !!planId } });

  if (isLoading) return <LoadingSpinner className="py-24" />;
  if (error || !plan) return <ErrorState retry={() => refetch()} />;

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-card border-b overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-5 pointer-events-none">
          <Flame className="w-96 h-96 text-primary" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {plan.goal.replace('_', ' ')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{plan.title}</h1>
            <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
              Designed by <Link href={`/trainers/${plan.trainerId}`} className="text-foreground font-bold border-b border-primary hover:text-primary transition-colors">{plan.trainerName}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-background border rounded-2xl p-6 text-center shadow-sm">
              <div className="h-10 w-10 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                <Flame className="h-5 w-5" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{plan.dailyCalories}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Daily Kcal</p>
            </div>
            <div className="bg-background border rounded-2xl p-6 text-center shadow-sm">
              <div className="h-10 w-10 mx-auto bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-3">
                <Utensils className="h-5 w-5" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{plan.mealsPerDay}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Meals / Day</p>
            </div>
            <div className="bg-background border rounded-2xl p-6 text-center shadow-sm">
              <div className="h-10 w-10 mx-auto bg-accent/30 text-accent-foreground rounded-full flex items-center justify-center mb-3">
                <Calendar className="h-5 w-5" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{plan.durationWeeks}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Weeks</p>
            </div>
            <div className="bg-background border rounded-2xl p-6 text-center shadow-sm">
              <div className="h-10 w-10 mx-auto bg-muted rounded-full flex items-center justify-center mb-3">
                <Target className="h-5 w-5 text-foreground" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground capitalize">{plan.goal.replace('_', ' ')}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Goal</p>
            </div>
          </div>

          <div className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-display font-bold mb-6">Plan Description</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
              <p className="whitespace-pre-wrap leading-relaxed">{plan.description || "No description provided for this diet plan."}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
