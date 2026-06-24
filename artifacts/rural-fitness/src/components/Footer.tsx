import React from "react";
import { Link } from "wouter";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-16 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Activity className="h-8 w-8 stroke-[3] text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
            <span className="font-display font-bold text-2xl text-white">
              RuralFitness
            </span>
          </Link>
          <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
            Bridging the fitness gap between urban certified trainers and rural communities. Raw energy meets expert knowledge.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold text-white text-lg mb-6 tracking-wide">Explore</h4>
          <ul className="space-y-4">
            <li><Link href="/trainers" className="text-muted-foreground hover:text-[#39ff14] transition-colors">Trainers</Link></li>
            <li><Link href="/routines" className="text-muted-foreground hover:text-[#39ff14] transition-colors">Workouts</Link></li>
            <li><Link href="/diet-plans" className="text-muted-foreground hover:text-[#39ff14] transition-colors">Diet Plans</Link></li>
            <li><Link href="/dashboard" className="text-muted-foreground hover:text-[#39ff14] transition-colors">Platform Impact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white text-lg mb-6 tracking-wide">Account</h4>
          <ul className="space-y-4">
            <li><Link href="/progress" className="text-muted-foreground hover:text-[#39ff14] transition-colors">My Progress</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} RuralFitness Platform. All rights reserved.</p>
        <p className="mt-4 md:mt-0 flex items-center gap-2">
          Empowering villages worldwide <span className="w-2 h-2 rounded-full bg-[#39ff14] shadow-[0_0_5px_rgba(57,255,20,0.8)] inline-block"></span>
        </p>
      </div>
    </footer>
  );
}
