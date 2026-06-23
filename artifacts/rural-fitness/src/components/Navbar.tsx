import React from "react";
import { Link } from "wouter";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Activity className="h-6 w-6 stroke-[3]" />
          <span className="font-display font-bold text-xl text-foreground">
            RuralFitness
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/trainers" className="text-sm font-medium hover:text-primary transition-colors">
            Trainers
          </Link>
          <Link href="/routines" className="text-sm font-medium hover:text-primary transition-colors">
            Routines
          </Link>
          <Link href="/diet-plans" className="text-sm font-medium hover:text-primary transition-colors">
            Diet Plans
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Impact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/progress">
            <Button variant="secondary" className="font-semibold rounded-full px-6">
              My Progress
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
