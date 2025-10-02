// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import "@/global.css"
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { I18nManager } from 'react-native';
// import { useEffect } from 'react';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//     I18nManager.allowRTL(false);
//     I18nManager.forceRTL(false);

//    useEffect(() => {
//       // Force app to stay LTR
//       I18nManager.allowRTL(false);
//       I18nManager.forceRTL(false);
//     }, []);
  
  
//   // eas build --profile preview --platform android


//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: false }} />
//         {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="(index)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack> */}
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
import Slider from "@react-native-community/slider";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants";
import "@/global.css";
import { useFontSize } from "@/store/useFontSize";
import { useLanguageStore } from "@/store/useLanguageStore";
import MainHeader from "../components/MainHeader";

// 🟢 محتوى Drawer مخصص
function CustomDrawerContent(props) {
  const { fontSize, setFontSize } = useFontSize();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        {/* Top: Profile Section */}
        <View className="items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 py-6">
          <Image
            source={icons.icon}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
          <Text className="text-black font-bold mt-1 text-xl">AskAlQuran</Text>
        </View>

        {/* Font Size Controller */}
        <View>
          <Text className="text-gray-500 text-center my-2 font-bold text-xl">
            Font size <Text>{fontSize}</Text>px
          </Text>
          <View className="w-full items-center">
            <Slider
              style={{ width: 250, height: 40 }}
              minimumValue={20}
              maximumValue={48}
              step={1}
              value={fontSize}
              minimumTrackTintColor="#4db6ac"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#4db6ac"
              onValueChange={(value) => setFontSize(value)}
            />
          </View>
        </View>

        {/* Drawer Items */}
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

// 🟢 Drawer Layout
export default function Layout() {
  const { language } = useLanguageStore();
  const position = language === "ar" ? "right" : "left";

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <MainHeader navigation={navigation} route={route} options={options} />
        ),
        headerTintColor: "white",
        drawerStyle: { width: 250 },
        drawerPosition: position,
        overlayColor: "transparent",
      }}
    >
      {/* Home */}
      <Drawer.Screen
        name="index"
        options={{
          title: language === "ar" ? "الصفحة الرئيسيه" : "Home Page",
        }}
      />

      {/* Surah list
      <Drawer.Screen
        name="surah/index"
        options={{
          title: language === "ar" ? "السور" : "Surahs",
        }}
      /> */}

      
    </Drawer>
  );
}
