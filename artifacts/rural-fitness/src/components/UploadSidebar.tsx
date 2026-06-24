import React, { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";

export type PlanEntry = { workout: string; diet: string; timestamp: number; };

export function getPlans(): PlanEntry[] {
  try { return JSON.parse(localStorage.getItem("rf_plans") ?? "[]"); } catch { return []; }
}
export function savePlan(entry: Omit<PlanEntry, "timestamp">): PlanEntry[] {
  const plans = [{ ...entry, timestamp: Date.now() }, ...getPlans()];
  localStorage.setItem("rf_plans", JSON.stringify(plans));
  return plans;
}

export function UploadSidebar() {
  const { t } = useLang();
  const [workout, setWorkout] = useState("");
  const [diet, setDiet] = useState("");
  const [recentPlans, setRecentPlans] = useState<PlanEntry[]>([]);

  useEffect(() => {
    setRecentPlans(getPlans().slice(0, 5));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workout.trim() && !diet.trim()) return;
    
    const newPlans = savePlan({ workout, diet });
    setRecentPlans(newPlans.slice(0, 5));
    setWorkout("");
    setDiet("");
    toast.success(t.upload.success || "Plan uploaded successfully!");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[rgba(10,10,10,0.8)] backdrop-blur-md border-r border-[#39ff14]/30 p-6 overflow-y-auto">
      <h2 className="text-2xl font-display font-bold neon-text mb-6">{t.upload.title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 flex-shrink-0">
        <div className="space-y-2">
          <Label className="text-muted-foreground">{t.upload.workoutLabel}</Label>
          <Textarea 
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            placeholder={t.upload.workoutPlaceholder || "Describe today's workout..."}
            className="bg-black/50 border-white/10 focus:border-[#39ff14] focus:shadow-[0_0_12px_rgba(57,255,20,0.3)] min-h-[100px] resize-none transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-muted-foreground">{t.upload.dietLabel}</Label>
          <Textarea 
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            placeholder={t.upload.dietPlaceholder || "Describe today's diet..."}
            className="bg-black/50 border-white/10 focus:border-[#39ff14] focus:shadow-[0_0_12px_rgba(57,255,20,0.3)] min-h-[100px] resize-none transition-all"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#39ff14] hover:bg-[#32e612] text-black font-bold border border-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.4)] hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] transition-all"
        >
          {t.upload.submit}
        </Button>
      </form>

      <div className="mt-8">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Recent Uploads</h3>
        <div className="space-y-3">
          {recentPlans.length === 0 ? (
            <p className="text-xs text-muted-foreground/60">{t.upload.empty}</p>
          ) : (
            recentPlans.map((plan, i) => (
              <div key={i} className="glass p-3 rounded-lg text-xs space-y-1 hover:border-[#39ff14]/30 transition-colors">
                {plan.workout && <p className="text-foreground/90 line-clamp-2"><span className="text-[#39ff14] font-semibold">W:</span> {plan.workout}</p>}
                {plan.diet && <p className="text-foreground/90 line-clamp-2"><span className="text-[#00b4ff] font-semibold">D:</span> {plan.diet}</p>}
                <p className="text-muted-foreground/50 pt-1 text-[10px]">{new Date(plan.timestamp).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-16 h-[calc(100vh-64px)] w-72 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full bg-[#39ff14] hover:bg-[#32e612] text-black shadow-[0_0_20px_rgba(57,255,20,0.5)]">
              <Plus className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-[#39ff14]/30 w-[85vw] sm:w-[350px] bg-transparent">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
