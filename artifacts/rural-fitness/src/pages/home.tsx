import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Users, MapPin, Target } from "lucide-react";
import { useGetDashboardSummary, useListFeaturedRoutines, useListTrainers } from "@workspace/api-client-react";
import { LoadingSpinner } from "@/components/States";

export default function Home() {
  const { data: dashboard, isLoading: dashLoading } = useGetDashboardSummary();
  const { data: featuredRoutines, isLoading: routinesLoading } = useListFeaturedRoutines();
  const { data: trainers, isLoading: trainersLoading } = useListTrainers();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Rural fitness community working out" 
            className="w-full h-full object-cover object-center opacity-40 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8 font-medium">
            <Activity className="h-4 w-4" />
            <span>The Grassroots Fitness Movement</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-8 leading-tight">
            Raw Energy Meets <span className="text-primary italic">Expert Knowledge.</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between certified urban trainers and rural communities. Transform your village into a training ground.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/routines">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-lg px-8 py-6 h-auto font-bold">
                Start Training <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/trainers">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-lg px-8 py-6 h-auto font-bold bg-background/50 backdrop-blur">
                Meet the Trainers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-display font-bold">
                {dashLoading ? "..." : dashboard?.villagesReached || 0}
              </h3>
              <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Villages Reached</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-display font-bold">
                {dashLoading ? "..." : dashboard?.totalTrainers || 0}
              </h3>
              <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Certified Trainers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-display font-bold">
                {dashLoading ? "..." : dashboard?.totalProgressSessions || 0}
              </h3>
              <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Sessions Logged</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-display font-bold">
                {dashLoading ? "..." : dashboard?.totalRoutines || 0}
              </h3>
              <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Active Routines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Routines */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Workouts</h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                High-impact routines designed for minimal equipment and maximum results in any environment.
              </p>
            </div>
            <Link href="/routines" className="hidden md:flex items-center text-primary font-bold hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {routinesLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(featuredRoutines || []).slice(0, 3).map(routine => (
                <Link key={routine.id} href={`/routines/${routine.id}`} className="group group-hover-elevate">
                  <div className="bg-background border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      {routine.thumbnailUrl ? (
                        <img src={routine.thumbnailUrl} alt={routine.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                          <Activity className="h-12 w-12 text-secondary/40" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {routine.difficulty}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-primary font-medium text-sm mb-3">
                        <Target className="h-4 w-4" />
                        {routine.category}
                      </div>
                      <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{routine.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                        {routine.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t">
                        <span className="text-sm font-medium text-foreground">{routine.durationMinutes} mins</span>
                        <span className="text-sm text-muted-foreground">By {routine.trainerName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/routines">
              <Button variant="outline" className="w-full rounded-full">View All Workouts</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Image break */}
      <section className="h-[60vh] relative">
        <img src="/images/community.png" alt="Community workout" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white text-center px-4 max-w-4xl leading-tight">
            "Fitness is not a luxury. It is a fundamental human right, accessible anywhere."
          </h2>
        </div>
      </section>

      {/* Top Trainers */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Expert Guidance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Certified professionals bringing big-city expertise directly to your community.
            </p>
          </div>

          {trainersLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(trainers || []).slice(0, 4).map(trainer => (
                <Link key={trainer.id} href={`/trainers/${trainer.id}`} className="group">
                  <div className="bg-card border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                    <div className="w-24 h-24 mx-auto bg-muted rounded-full overflow-hidden mb-4 border-4 border-background shadow-sm">
                      {trainer.avatarUrl ? (
                        <img src={trainer.avatarUrl} alt={trainer.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-display font-bold text-2xl">
                          {trainer.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-bold group-hover:text-primary transition-colors">{trainer.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{trainer.specialty}</p>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs">
                      <MapPin className="h-3 w-3" />
                      {trainer.location}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Link href="/trainers">
              <Button variant="outline" size="lg" className="rounded-full px-8">See All Trainers</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/app-usage.png')] bg-cover bg-center mix-blend-multiply opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10">
            Join the movement today. Track your progress, follow expert plans, and transform your fitness journey.
          </p>
          <Link href="/routines">
            <Button size="lg" variant="secondary" className="rounded-full text-lg px-10 py-6 h-auto font-bold shadow-xl hover:scale-105 transition-transform">
              Find Your First Workout
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
