// const [fontSize, setFontSize] = useState(24); // الحجم الافتراضي
import { create } from "zustand";

export const useFontSize = create((set) => ({
  fontSize: 24, // القيمة الافتراضية
//   setFontSize: () =>
//     set((state) => ({
//       fontSize: state.fontSize === "en" ? "ar" : "en",
//     })),
  setFontSize: (size) => set({ fontSize: size }), // في حال بدك تعيّن مباشرة
}));
