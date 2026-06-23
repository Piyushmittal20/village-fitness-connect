import React from "react";
import { useParams } from "wouter";
import { 
  useGetTrainer, 
  useGetTrainerStats, 
  useGetTrainerRoutines, 
  useGetTrainerDietPlans,
  getGetTrainerQueryKey
} from "@workspace/api-client-react";
import { LoadingSpinner, ErrorState, EmptyState } from "@/components/States";
import { RoutineCard, DietPlanCard } from "@/components/Cards";
import { MapPin, Star, Users, Activity, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TrainerDetail() {
  const { id } = useParams<{ id: string }>();
  const trainerId = parseInt(id || "0", 10);

  const { data: trainer, isLoading: tLoading, error: tError, refetch: refetchT } = useGetTrainer(trainerId, { query: { enabled: !!trainerId } });
  const { data: stats, isLoading: sLoading } = useGetTrainerStats(trainerId, { query: { enabled: !!trainerId } });
  const { data: routines, isLoading: rLoading } = useGetTrainerRoutines(trainerId, { query: { enabled: !!trainerId } });
  const { data: dietPlans, isLoading: dLoading } = useGetTrainerDietPlans(trainerId, { query: { enabled: !!trainerId } });

  if (tLoading) return <LoadingSpinner className="py-24" />;
  if (tError || !trainer) return <ErrorState retry={() => refetchT()} />;

  return (
    <div>
      {/* Header Profile */}
      <section className="bg-card border-b pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left max-w-4xl mx-auto">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-lg shrink-0 bg-muted">
              {trainer.avatarUrl ? (
                <img src={trainer.avatarUrl} alt={trainer.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-display font-bold text-5xl">
                  {trainer.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-4">
                <Award className="h-3 w-3" />
                {trainer.certificationLevel}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{trainer.name}</h1>
              <p className="text-xl text-primary font-medium mb-4">{trainer.specialty}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {trainer.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" /> {trainer.rating.toFixed(1)} Rating
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {trainer.totalFollowers} Followers
                </div>
              </div>
              
              <p className="text-foreground/80 leading-relaxed max-w-2xl">
                {trainer.bio || "This trainer hasn't provided a bio yet."}
              </p>
            </div>
          </div>
          
          {/* Stats quick view */}
          {!sLoading && stats && (
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 bg-background rounded-2xl border p-4 shadow-sm">
              <div className="text-center border-r border-border last:border-0">
                <p className="text-2xl font-display font-bold text-foreground">{stats.totalRoutines}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Workouts</p>
              </div>
              <div className="text-center border-r border-border last:border-0">
                <p className="text-2xl font-display font-bold text-foreground">{stats.totalDietPlans}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Diet Plans</p>
              </div>
              <div className="text-center border-r border-border last:border-0">
                <p className="text-2xl font-display font-bold text-foreground">{stats.totalFollowers}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Followers</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-5xl">
          <Tabs defaultValue="routines" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted p-1 rounded-full">
                <TabsTrigger value="routines" className="rounded-full px-6 py-2">Workout Routines</TabsTrigger>
                <TabsTrigger value="diet" className="rounded-full px-6 py-2">Diet Plans</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="routines">
              {rLoading ? <LoadingSpinner /> : (
                (!routines || routines.length === 0) ? (
                  <EmptyState title="No routines yet" description="This trainer hasn't uploaded any workout routines." />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {routines.map(routine => (
                      <RoutineCard key={routine.id} routine={routine} />
                    ))}
                  </div>
                )
              )}
            </TabsContent>
            
            <TabsContent value="diet">
              {dLoading ? <LoadingSpinner /> : (
                (!dietPlans || dietPlans.length === 0) ? (
                  <EmptyState title="No diet plans yet" description="This trainer hasn't uploaded any diet plans." />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dietPlans.map(plan => (
                      <DietPlanCard key={plan.id} plan={plan} />
                    ))}
                  </div>
                )
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
