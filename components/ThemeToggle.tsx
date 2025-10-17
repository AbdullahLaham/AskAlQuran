import { TouchableOpacity, Text, View } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(isDark ? 32 : 0, { duration: 300 }) }],
    };
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.8}
      className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex-row items-center px-1 relative"
    >
      <Text className="absolute left-2 text-xs font-bold text-gray-700 dark:text-gray-300">
        ☀️
      </Text>
      <Text className="absolute right-2 text-xs font-bold text-gray-700 dark:text-gray-300">
        🌙
      </Text>

      <Animated.View
        className="w-8 h-8 bg-white dark:bg-black rounded-full shadow"
        style={circleStyle}
      />
    </TouchableOpacity>
  );
}
