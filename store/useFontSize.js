// // const [fontSize, setFontSize] = useState(24); // الحجم الافتراضي
// import { create } from "zustand";

// export const useFontSize = create((set) => ({
//   fontSize: 22, // القيمة الافتراضية
// //   setFontSize: () =>
// //     set((state) => ({
// //       fontSize: state.fontSize === "en" ? "ar" : "en",
// //     })),
//   setFontSize: (size) => set({ fontSize: size }), // في حال بدك تعيّن مباشرة
// }));






import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// type FontSizeState = {
//   fontSize: number;
//   setFontSize: (size: number) => void;
// };

export const useFontSize = create()(
  persist(
    (set) => ({
      fontSize: 22, // القيمة الافتراضية
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: "font-size-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
