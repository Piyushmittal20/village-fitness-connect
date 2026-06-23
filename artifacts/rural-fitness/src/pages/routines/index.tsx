import React, { useState } from "react";
import { useListRoutines } from "@workspace/api-client-react";
import { LoadingSpinner, ErrorState, EmptyState } from "@/components/States";
import { RoutineCard } from "@/components/Cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function RoutinesList() {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [search, setSearch] = useState("");
  
  const { data: routines, isLoading, error, refetch } = useListRoutines();

  const filteredRoutines = routines?.filter(r => {
    const matchesDiff = difficulty === "all" || r.difficulty.toLowerCase() === difficulty.toLowerCase();
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                          r.category.toLowerCase().includes(search.toLowerCase());
    return matchesDiff && matchesSearch;
  }) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Workout Routines</h1>
        <p className="text-lg text-muted-foreground">
          Expertly crafted workouts you can do anywhere, anytime.
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search workouts..." 
            className="pl-10 h-12 rounded-full border-border bg-card text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48 shrink-0">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="h-12 rounded-full bg-card">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorState retry={() => refetch()} />}
      
      {!isLoading && !error && filteredRoutines.length === 0 && (
        <EmptyState 
          title="No routines found" 
          description="We couldn't find any workouts matching your criteria." 
        />
      )}

      {!isLoading && !error && filteredRoutines.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutines.map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      )}
    </div>
  );
}
