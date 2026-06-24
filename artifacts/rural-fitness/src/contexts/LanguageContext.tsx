import React, { createContext, useContext, useState, useCallback } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";
import mr from "@/locales/mr.json";
import ta from "@/locales/ta.json";
import gu from "@/locales/gu.json";

type Locale = "en" | "hi" | "mr" | "ta" | "gu";

const locales: Record<Locale, typeof en> = { en, hi, mr, ta, gu };

export const languages: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
];

interface LangCtx {
  locale: Locale;
  t: typeof en;
  setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LangCtx>({
  locale: "en",
  t: en,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  return (
    <LanguageContext.Provider value={{ locale, t: locales[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
