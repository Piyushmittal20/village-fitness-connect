import React, { useState } from "react";
import { useParams } from "wouter";
import { useGetRoutine, useCreateProgress } from "@workspace/api-client-react";
import { LoadingSpinner, ErrorState } from "@/components/States";
import { Button } from "@/components/ui/button";
import { Clock, Target, Users, Play, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function RoutineDetail() {
  const { id } = useParams<{ id: string }>();
  const routineId = parseInt(id || "0", 10);
  const { toast } = useToast();
  const [isLogging, setIsLogging] = useState(false);
  const [logged, setLogged] = useState(false);

  const { data: routine, isLoading, error, refetch } = useGetRoutine(routineId, { query: { enabled: !!routineId } });
  const createProgress = useCreateProgress();

  const handleLogWorkout = async () => {
    if (!routine) return;
    setIsLogging(true);
    
    try {
      await createProgress.mutateAsync({
        data: {
          userId: 1, // Mock user ID
          routineId: routine.id,
          durationMinutes: routine.durationMinutes,
          notes: "Completed from web app",
          caloriesBurned: routine.durationMinutes * 8 // rough estimate
        }
      });
      
      setLogged(true);
      toast({
        title: "Workout logged!",
        description: `Great job completing ${routine.title}.`,
      });
    } catch (err) {
      toast({
        title: "Failed to log workout",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLogging(false);
    }
  };

  if (isLoading) return <LoadingSpinner className="py-24" />;
  if (error || !routine) return <ErrorState retry={() => refetch()} />;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-12 overflow-hidden bg-card border-b">
        <div className="absolute inset-0">
          {routine.thumbnailUrl ? (
            <img src={routine.thumbnailUrl} alt={routine.title} className="w-full h-full object-cover opacity-30" />
          ) : (
            <div className="w-full h-full bg-secondary/5"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
                {routine.category}
              </span>
              <span className="bg-card text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border">
                {routine.difficulty}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{routine.title}</h1>
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              By <Link href={`/trainers/${routine.trainerId}`} className="text-foreground font-medium hover:text-primary transition-colors">{routine.trainerName}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">About this Workout</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
                  <p>{routine.description || "No description provided."}</p>
                </div>
              </div>
              
              <div className="p-8 bg-muted rounded-2xl border text-center">
                <h3 className="text-xl font-display font-bold mb-6">Ready to start?</h3>
                {logged ? (
                  <div className="inline-flex flex-col items-center">
                    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <span className="text-lg font-bold text-foreground">Workout Completed</span>
                    <Link href="/progress">
                      <Button variant="link" className="mt-2 text-primary">View Progress</Button>
                    </Link>
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 py-6 h-auto text-lg font-bold"
                    onClick={handleLogWorkout}
                    disabled={isLogging}
                  >
                    {isLogging ? (
                      <span className="flex items-center"><div className="animate-spin mr-2 h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full"></div> Logging...</span>
                    ) : (
                      <span className="flex items-center"><Play className="mr-2 h-5 w-5" /> Complete & Log Workout</span>
                    )}
                  </Button>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-card border rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-display font-bold mb-6 border-b pb-4">Workout Details</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Duration</p>
                      <p className="text-lg font-bold text-foreground">{routine.durationMinutes} Minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Level</p>
                      <p className="text-lg font-bold text-foreground capitalize">{routine.difficulty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/30 text-accent-foreground flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Community</p>
                      <p className="text-lg font-bold text-foreground">{routine.totalEnrollments} People</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
