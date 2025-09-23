import { useCallback } from "react";

export default function convertToArabicNumerals(input) {
const toArabic = useCallback((num) => {
    const arabicNumbers = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
    return num
      .toString()
      .split("")
      .reverse()
      .map((d) => (/\d/.test(d) ? arabicNumbers[parseInt(d, 10)] : d))
      .join(""); // سترجع نص "١٢٣"
  }, []);


//   function toArabic(num) {
//   return `\u200F${num.toString().split("").map((d) =>
//     /\d/.test(d) ? arabicNumbers[parseInt(d, 10)] : d
//   ).join("")}\u200F`;
// }

  return { toArabic };
}