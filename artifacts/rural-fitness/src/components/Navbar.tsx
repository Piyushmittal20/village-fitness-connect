import React from "react";
import { Link } from "wouter";
import { Activity, ChevronDown } from "lucide-react";
import { useLang, languages } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { t, locale, setLocale } = useLang();
  
  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[rgba(10,10,10,0.9)] backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 stroke-[3] text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
          <span className="font-display font-bold text-xl text-white">
            RuralFitness
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/trainers" className="text-sm font-medium text-white/80 hover:text-[#39ff14] transition-colors">
            {t.nav?.trainers || "Trainers"}
          </Link>
          <Link href="/routines" className="text-sm font-medium text-white/80 hover:text-[#39ff14] transition-colors">
            {t.nav?.routines || "Routines"}
          </Link>
          <Link href="/diet-plans" className="text-sm font-medium text-white/80 hover:text-[#39ff14] transition-colors">
            {t.nav?.dietPlans || "Diet Plans"}
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-white/80 hover:text-[#39ff14] transition-colors">
            {t.nav?.impact || "Impact"}
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex text-white/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-full h-8 px-3 text-xs">
                {currentLang.nativeLabel} <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#141414] border-white/10 text-white min-w-[120px]">
              {languages.map((l) => (
                <DropdownMenuItem 
                  key={l.code} 
                  onClick={() => setLocale(l.code)}
                  className={`hover:bg-white/10 hover:text-[#39ff14] cursor-pointer ${locale === l.code ? 'text-[#39ff14] bg-white/5' : ''}`}
                >
                  {l.nativeLabel}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/progress">
            <Button className="font-bold rounded-full px-5 h-9 text-xs sm:text-sm sm:px-6 sm:h-10 bg-black text-white border border-[#39ff14] hover:bg-[#39ff14]/10 hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all">
              {t.nav?.myProgress || "My Progress"}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
