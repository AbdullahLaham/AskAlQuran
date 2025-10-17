// import { create } from "zustand";

// export const useLanguageStore = create((set) => ({
//   language: "en", // القيمة الافتراضية
//   toggleLanguage: () =>
//     set((state) => ({
//       language: state.language === "en" ? "ar" : "en",
//     })),
//   setLanguage: (lang) => set({ language: lang }), // في حال بدك تعيّن مباشرة
// }));


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useLanguageStore = create()(
  persist(
    (set) => ({
      language: "en",
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "en" ? "ar" : "en",
        })),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
