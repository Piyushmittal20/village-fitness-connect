import React, { useState } from "react";
import { useListTrainers } from "@workspace/api-client-react";
import { LoadingSpinner, ErrorState, EmptyState } from "@/components/States";
import { TrainerCard } from "@/components/Cards";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TrainersList() {
  const [search, setSearch] = useState("");
  const { data: trainers, isLoading, error, refetch } = useListTrainers();

  const filteredTrainers = trainers?.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.specialty.toLowerCase().includes(search.toLowerCase()) ||
    t.location.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Expert Trainers</h1>
        <p className="text-lg text-muted-foreground">
          Meet the certified professionals bringing world-class fitness knowledge to your community.
        </p>
      </div>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search trainers by name, specialty, or location..." 
            className="pl-10 h-12 rounded-full border-border bg-card text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorState retry={() => refetch()} />}
      
      {!isLoading && !error && filteredTrainers.length === 0 && (
        <EmptyState 
          title="No trainers found" 
          description="We couldn't find any trainers matching your search." 
        />
      )}

      {!isLoading && !error && filteredTrainers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  );
}
