import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Target, MapPin, Quote } from "lucide-react";
import { useGetDashboardSummary, useListFeaturedRoutines, useListTrainers } from "@workspace/api-client-react";
import { LoadingSpinner } from "@/components/States";
import { useLang } from "@/contexts/LanguageContext";
import { TrainerProfilePanel } from "@/components/TrainerProfilePanel";
import { getPlans } from "@/components/UploadSidebar";

export default function Home() {
  const { t } = useLang();
  const { data: dashboard, isLoading: dashLoading } = useGetDashboardSummary();
  const { data: featuredRoutines, isLoading: routinesLoading } = useListFeaturedRoutines();
  const { data: trainers, isLoading: trainersLoading } = useListTrainers();
  
  const communityPlans = getPlans();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16 pb-32 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#39ff14]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#00b4ff]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-20 mix-blend-overlay grayscale"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl mt-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-neon text-[#39ff14] font-medium text-sm md:text-base mb-10 animate-fade-in-up">
            <Activity className="h-4 w-4" />
            <span>{t.hero?.badge || "The Grassroots Fitness Movement"}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight mb-8 leading-[1.1] animate-fade-in-up" style={{animationDelay: '100ms'}}>
            {t.hero?.headline1 || "Raw Energy Meets"} <br/>
            <span className="text-[#39ff14] italic text-shadow-[0_0_30px_rgba(57,255,20,0.4)] drop-shadow-2xl">{t.hero?.headline2 || "Expert Knowledge."}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '200ms'}}>
            {t.hero?.subtitle || "Bridging the gap between certified urban trainers and rural communities. Transform your village into a training ground."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <Link href="/routines">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-lg px-10 py-7 h-auto font-bold bg-[#39ff14] hover:bg-[#32e612] text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all hover:scale-105">
                {t.hero?.cta || "Start Training"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/trainers">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-lg px-10 py-7 h-auto font-bold glass text-white hover:bg-white/10 hover:text-white border-white/20 transition-all hover:scale-105">
                {t.hero?.ctaSecondary || "Meet the Trainers"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 border-y border-white/10 glass relative z-20 -mt-16 mx-4 rounded-3xl overflow-hidden max-w-7xl lg:mx-auto shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-[#00b4ff]">
              {dashLoading ? "..." : dashboard?.totalTrainers || 0}
            </h3>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs md:text-sm">{t.stats?.trainers || "Trainers"}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-[#39ff14]">
              {dashLoading ? "..." : dashboard?.totalRoutines || 0}
            </h3>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs md:text-sm">{t.stats?.routines || "Routines"}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-[#ff6b35]">
              {dashLoading ? "..." : dashboard?.villagesReached || 0}
            </h3>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs md:text-sm">{t.stats?.villages || "Villages"}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white">
              {dashLoading ? "..." : dashboard?.totalProgressSessions || 0}
            </h3>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs md:text-sm">{t.stats?.sessions || "Sessions"}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">{t.sections?.howItWorks || "How It Works"}</h2>
            <div className="w-24 h-1 bg-[#39ff14] mx-auto rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent"></div>
            
            <div className="glass p-8 rounded-3xl text-center card-lift relative">
              <div className="w-16 h-16 mx-auto bg-black border border-[#39ff14] rounded-full flex items-center justify-center text-2xl font-bold text-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.3)] mb-6 z-10 relative">1</div>
              <h3 className="text-2xl font-display font-bold mb-4">{t.steps?.step1Title || "Trainers Upload"}</h3>
              <p className="text-muted-foreground">{t.steps?.step1Desc || "Urban certified trainers upload daily workout routines and diet plans."}</p>
            </div>
            
            <div className="glass p-8 rounded-3xl text-center card-lift relative">
              <div className="w-16 h-16 mx-auto bg-black border border-[#00b4ff] rounded-full flex items-center justify-center text-2xl font-bold text-[#00b4ff] shadow-[0_0_20px_rgba(0,180,255,0.3)] mb-6 z-10 relative">2</div>
              <h3 className="text-2xl font-display font-bold mb-4">{t.steps?.step2Title || "Community Accesses"}</h3>
              <p className="text-muted-foreground">{t.steps?.step2Desc || "Rural trainers and users access curated content easily on any device."}</p>
            </div>
            
            <div className="glass p-8 rounded-3xl text-center card-lift relative">
              <div className="w-16 h-16 mx-auto bg-black border border-[#ff6b35] rounded-full flex items-center justify-center text-2xl font-bold text-[#ff6b35] shadow-[0_0_20px_rgba(255,107,53,0.3)] mb-6 z-10 relative">3</div>
              <h3 className="text-2xl font-display font-bold mb-4">{t.steps?.step3Title || "Track Progress"}</h3>
              <p className="text-muted-foreground">{t.steps?.step3Desc || "Log sessions, track streaks, and improve fitness together."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Routines */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{t.sections?.featuredRoutines || "Featured Routines"}</h2>
              <div className="w-16 h-1 bg-[#39ff14] rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]"></div>
            </div>
            <Link href="/routines" className="hidden md:flex items-center text-white/60 hover:text-[#39ff14] transition-colors uppercase tracking-wider text-sm font-bold">
              {t.common?.viewAll || "View All"} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {routinesLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(featuredRoutines || []).slice(0, 3).map(routine => (
                <Link key={routine.id} href={`/routines/${routine.id}`} className="block">
                  <div className="glass rounded-3xl overflow-hidden card-lift h-full flex flex-col group">
                    <div className="aspect-video relative overflow-hidden bg-black">
                      {routine.thumbnailUrl ? (
                        <img src={routine.thumbnailUrl} alt={routine.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80 mix-blend-luminosity" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                          <Activity className="h-12 w-12 text-[#39ff14]/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
                      <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border-white/20">
                        {routine.difficulty}
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col bg-[#141414]/50">
                      <div className="flex items-center gap-2 text-[#39ff14] font-bold text-xs uppercase tracking-wider mb-4">
                        <Target className="h-4 w-4" />
                        {routine.category}
                      </div>
                      <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-[#39ff14] transition-colors leading-tight">{routine.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                        {routine.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/10">
                        <span className="text-sm font-bold text-white">{routine.durationMinutes} {t.common?.min || "min"}</span>
                        <span className="text-sm text-muted-foreground">{t.common?.by || "by"} <span className="text-white">{routine.trainerName}</span></span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-10 text-center md:hidden">
            <Link href="/routines">
              <Button variant="outline" className="rounded-full glass text-white w-full py-6 text-lg">{t.common?.viewAll || "View All"}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Feed */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#39ff14]/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{t.upload?.feedTitle || "Community Plans"}</h2>
            <div className="w-16 h-1 bg-[#00b4ff] mx-auto rounded-full shadow-[0_0_10px_rgba(0,180,255,0.5)]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityPlans.length === 0 ? (
              <div className="col-span-full text-center py-12 glass rounded-2xl">
                <p className="text-muted-foreground text-lg">{t.upload?.empty || "No plans uploaded yet. Be the first!"}</p>
              </div>
            ) : (
              communityPlans.map((plan, i) => (
                <div key={i} className="glass p-6 rounded-2xl border-l-4 border-l-[#39ff14] hover:border-l-[#00b4ff] transition-colors card-lift">
                  <div className="text-xs text-muted-foreground mb-4 font-mono">{new Date(plan.timestamp).toLocaleString()}</div>
                  {plan.workout && (
                    <div className="mb-4">
                      <h4 className="text-[#39ff14] font-bold text-xs uppercase tracking-wider mb-2">{t.feed?.workout || "Workout"}</h4>
                      <p className="text-white/90 text-sm leading-relaxed">{plan.workout}</p>
                    </div>
                  )}
                  {plan.diet && (
                    <div>
                      <h4 className="text-[#00b4ff] font-bold text-xs uppercase tracking-wider mb-2">{t.feed?.diet || "Diet"}</h4>
                      <p className="text-white/90 text-sm leading-relaxed">{plan.diet}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trainer Profile Embed Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <TrainerProfilePanel />
        </div>
      </section>

      {/* Top Trainers */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{t.sections?.topTrainers || "Top Trainers"}</h2>
            <div className="w-16 h-1 bg-[#ff6b35] mx-auto rounded-full shadow-[0_0_10px_rgba(255,107,53,0.5)]"></div>
          </div>

          {trainersLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(trainers || []).slice(0, 4).map(trainer => (
                <Link key={trainer.id} href={`/trainers/${trainer.id}`} className="block">
                  <div className="glass rounded-3xl p-8 text-center card-lift h-full group">
                    <div className="w-28 h-28 mx-auto bg-black rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-[#ff6b35] transition-colors relative">
                      {trainer.avatarUrl ? (
                        <img src={trainer.avatarUrl} alt={trainer.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#ff6b35] font-display font-bold text-3xl">
                          {trainer.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-bold group-hover:text-[#ff6b35] transition-colors text-white mb-2">{trainer.name}</h3>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-4">{trainer.specialty}</p>
                    <div className="flex items-center justify-center gap-1 text-white/50 text-xs bg-white/5 rounded-full py-1.5 px-3 mx-auto w-max">
                      <MapPin className="h-3 w-3" />
                      {trainer.location}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-16 text-center">
            <Link href="/trainers">
              <Button variant="outline" className="rounded-full glass text-white px-10 py-6 text-lg hover:bg-white/10">{t.common?.viewAll || "See All Trainers"}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#111111] relative">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{t.sections?.testimonials || "What People Say"}</h2>
            <div className="w-16 h-1 bg-[#39ff14] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-white/10" />
              <p className="text-lg text-white/80 leading-relaxed mb-8 italic">"We never had a proper gym here. Now the whole village gathers every evening to follow the routines. It changed our community."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#39ff14]/20 flex items-center justify-center text-[#39ff14] font-bold">R</div>
                <div>
                  <h4 className="font-bold text-white">Ramesh K.</h4>
                  <p className="text-xs text-[#39ff14]">Maharashtra</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-white/10" />
              <p className="text-lg text-white/80 leading-relaxed mb-8 italic">"The diet plans use local ingredients we already grow. I lost 10kg without buying any expensive supplements."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00b4ff]/20 flex items-center justify-center text-[#00b4ff] font-bold">A</div>
                <div>
                  <h4 className="font-bold text-white">Anjali P.</h4>
                  <p className="text-xs text-[#00b4ff]">Gujarat</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-white/10" />
              <p className="text-lg text-white/80 leading-relaxed mb-8 italic">"As a local trainer, accessing plans from certified experts helped me guide my students better. We are stronger together."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] font-bold">S</div>
                <div>
                  <h4 className="font-bold text-white">Suresh M.</h4>
                  <p className="text-xs text-[#ff6b35]">Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#39ff14]/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="glass-neon p-12 md:p-20 rounded-[3rem] border-[#39ff14]/50 shadow-[0_0_50px_rgba(57,255,20,0.15)]">
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-6 text-white leading-tight">
              {t.sections?.cta || "Ready to Transform?"}
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
              {t.sections?.ctaSubtitle || "Join thousands of rural communities already on their fitness journey."}
            </p>
            <Link href="/routines">
              <Button size="lg" className="rounded-full text-xl px-12 py-8 h-auto font-bold bg-[#39ff14] hover:bg-[#32e612] text-black shadow-[0_0_30px_rgba(57,255,20,0.5)] hover:scale-105 transition-all">
                {t.sections?.ctaButton || "Get Started Today"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
