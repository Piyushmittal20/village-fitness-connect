import React, { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Instagram, Youtube, UserCircle } from "lucide-react";

export type TrainerProfile = {
  name: string;
  bio: string;
  instagram: string;
  youtube: string;
};

export function TrainerProfilePanel() {
  const { t } = useLang();
  const [profile, setProfile] = useState<TrainerProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<TrainerProfile>({
    name: "",
    bio: "",
    instagram: "",
    youtube: ""
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rf_trainer_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setFormData(parsed);
      } else {
        setIsEditing(true);
      }
    } catch {
      setIsEditing(true);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("rf_trainer_profile", JSON.stringify(formData));
    setProfile(formData);
    setIsEditing(false);
    toast.success(t.trainerProfile?.success || "Profile saved!");
  };

  if (isEditing) {
    return (
      <div className="glass-neon p-6 md:p-8 rounded-2xl w-full max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <UserCircle className="h-8 w-8 text-[#39ff14]" />
          <h2 className="text-2xl font-display font-bold text-white">
            {profile ? t.trainerProfile?.update || "Update Profile" : t.trainerProfile?.title || "Create Trainer Profile"}
          </h2>
        </div>
        
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-muted-foreground">{t.trainerProfile?.name || "Full Name"}</Label>
            <Input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-black/50 border-white/10 focus:border-[#39ff14] focus:shadow-[0_0_12px_rgba(57,255,20,0.3)] transition-all"
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-muted-foreground">{t.trainerProfile?.bio || "Bio"}</Label>
            <Textarea 
              required
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="bg-black/50 border-white/10 focus:border-[#39ff14] focus:shadow-[0_0_12px_rgba(57,255,20,0.3)] min-h-[100px] resize-none transition-all"
              placeholder={t.trainerProfile?.bioPlaceholder || "Tell rural users about your fitness journey..."}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Instagram className="h-4 w-4" /> {t.trainerProfile?.instagram || "Instagram Link"}
              </Label>
              <Input 
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="bg-black/50 border-white/10 focus:border-[#39ff14] focus:shadow-[0_0_12px_rgba(57,255,20,0.3)] transition-all"
                placeholder="https://instagram.com/..."
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Youtube className="h-4 w-4" /> {t.trainerProfile?.youtube || "YouTube Channel"}
              </Label>
              <Input 
                value={formData.youtube}
                onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                className="bg-black/50 border-white/10 focus:border-[#39ff14] focus:shadow-[0_0_12px_rgba(57,255,20,0.3)] transition-all"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-[#39ff14] hover:bg-[#32e612] text-black font-bold border border-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.4)]"
            >
              {t.trainerProfile?.save || "Save Profile"}
            </Button>
            {profile && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(false);
                }}
                className="bg-transparent border-white/20 hover:bg-white/5"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="glass-neon p-8 rounded-2xl w-full max-w-xl mx-auto card-lift text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-black border-2 border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.3)] flex items-center justify-center mb-6">
        <span className="text-4xl font-display font-bold neon-text uppercase">{profile.name.charAt(0)}</span>
      </div>
      
      <h3 className="text-3xl font-display font-bold text-white mb-2">{profile.name}</h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed">
        {profile.bio}
      </p>
      
      <div className="flex items-center justify-center gap-4 mb-8">
        {profile.instagram && (
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer" 
             className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-[#39ff14] hover:border-[#39ff14] transition-all hover:scale-110">
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {profile.youtube && (
          <a href={profile.youtube} target="_blank" rel="noopener noreferrer"
             className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-[#ff0000] hover:border-[#ff0000] transition-all hover:scale-110">
            <Youtube className="h-6 w-6" />
          </a>
        )}
      </div>
      
      <Button 
        onClick={() => setIsEditing(true)} 
        variant="outline"
        className="rounded-full px-8 bg-black/50 border-[#39ff14]/50 text-[#39ff14] hover:bg-[#39ff14]/10 hover:text-[#39ff14]"
      >
        {t.trainerProfile?.edit || "Edit Profile"}
      </Button>
    </div>
  );
}
