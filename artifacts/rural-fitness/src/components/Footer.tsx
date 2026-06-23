import React from "react";
import { Link } from "wouter";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-20 border-t border-secondary-foreground/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 text-primary mb-4">
            <Activity className="h-6 w-6 stroke-[3]" />
            <span className="font-display font-bold text-xl text-secondary-foreground">
              RuralFitness
            </span>
          </Link>
          <p className="text-secondary-foreground/70 max-w-xs mb-6">
            Bridging the fitness gap between urban certified trainers and rural communities. Raw energy meets expert knowledge.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold text-lg mb-4">Explore</h4>
          <ul className="space-y-3">
            <li><Link href="/trainers" className="text-secondary-foreground/70 hover:text-primary transition-colors">Trainers</Link></li>
            <li><Link href="/routines" className="text-secondary-foreground/70 hover:text-primary transition-colors">Workouts</Link></li>
            <li><Link href="/diet-plans" className="text-secondary-foreground/70 hover:text-primary transition-colors">Diet Plans</Link></li>
            <li><Link href="/dashboard" className="text-secondary-foreground/70 hover:text-primary transition-colors">Platform Impact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Account</h4>
          <ul className="space-y-3">
            <li><Link href="/progress" className="text-secondary-foreground/70 hover:text-primary transition-colors">My Progress</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center text-sm text-secondary-foreground/50">
        <p>© {new Date().getFullYear()} RuralFitness Platform. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Empowering villages worldwide.</p>
      </div>
    </footer>
  );
}
