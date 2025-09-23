import { create } from "zustand";

export const useLanguageStore = create((set) => ({
  language: "en", // القيمة الافتراضية
  toggleLanguage: () =>
    set((state) => ({
      language: state.language === "en" ? "ar" : "en",
    })),
  setLanguage: (lang) => set({ language: lang }), // في حال بدك تعيّن مباشرة
}));
