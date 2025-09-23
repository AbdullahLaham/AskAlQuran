import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "@/global.css"
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { I18nManager } from 'react-native';
import { useEffect } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);

   useEffect(() => {
      // Force app to stay LTR
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }, []);
  
  
  // eas build --profile preview --platform android


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(index)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
