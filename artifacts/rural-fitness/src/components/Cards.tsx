import React from "react";
import { Link } from "wouter";
import { Target, MapPin, Activity, Clock, Flame } from "lucide-react";

export function TrainerCard({ trainer }: { trainer: any }) {
  return (
    <Link href={`/trainers/${trainer.id}`} className="group block h-full">
      <div className="bg-card border rounded-2xl p-6 text-center hover:shadow-md transition-all h-full flex flex-col items-center">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full overflow-hidden mb-4 border-4 border-background shadow-sm">
          {trainer.avatarUrl ? (
            <img src={trainer.avatarUrl} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-display font-bold text-2xl">
              {trainer.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="text-lg font-display font-bold group-hover:text-primary transition-colors">{trainer.name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{trainer.specialty}</p>
        <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mt-auto">
          <MapPin className="h-3 w-3" />
          {trainer.location}
        </div>
      </div>
    </Link>
  );
}

export function RoutineCard({ routine }: { routine: any }) {
  return (
    <Link href={`/routines/${routine.id}`} className="group block h-full">
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
            <span className="text-sm font-medium text-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {routine.durationMinutes} mins
            </span>
            <span className="text-sm text-muted-foreground">By {routine.trainerName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function DietPlanCard({ plan }: { plan: any }) {
  return (
    <Link href={`/diet-plans/${plan.id}`} className="group block h-full">
      <div className="bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
          {plan.thumbnailUrl ? (
            <img src={plan.thumbnailUrl} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <Flame className="h-12 w-12 text-primary/40" />
            </div>
          )}
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {plan.goal}
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{plan.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
            {plan.description}
          </p>
          <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs uppercase">Calories</span>
              <span className="font-bold text-foreground">{plan.dailyCalories} kcal</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs uppercase">Duration</span>
              <span className="font-bold text-foreground">{plan.durationWeeks} weeks</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
