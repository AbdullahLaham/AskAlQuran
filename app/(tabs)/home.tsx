// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Animated, Alert, I18nManager } from "react-native";
import IconAlnuzul from '@/app/components/IconAlnuzul';
import { Image } from "expo-image";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useFonts } from "expo-font";

export default function Home() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const { language, toggleLanguage } = useLanguageStore();
  const translateX = useRef(new Animated.Value(language === "ar" ? 0 : 32)).current;


   I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);


  const ChangeLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";

    toggleLanguage(newLang);

    Animated.timing(translateX, {
      toValue: newLang === "ar" ? 0 : 32,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };
   const fetchSurahs = async () => {
      try {
        const res  = await axios.get("https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/index.json");
        // console.log(res.data, 'ddddddddddddddddddddddddddddd')
        setSurahs(res.data.pageProps.surahs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching surahs:", error);
        if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
          setIsConnected(false);
        // Alert.alert("خطأ في الاتصال", "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
        return; // لا نسجل خروج المستخدم
      }
      } finally {
        setLoading(false);
        }
      };
  useEffect(() => {

    const fetchSurahss = async () => {
      try {
        const res  = await axios.get("https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/index.json");
        // console.log(res.data, 'ddddddddddddddddddddddddddddd')
        setSurahs(res.data.pageProps.surahs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching surahs:", error);
        if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
        Alert.alert("خطأ في الاتصال", "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
        setIsConnected(false);
        return; // لا نسجل خروج المستخدم
      }
      } finally {
        setLoading(false);
        }
      };
      fetchSurahss();
    // fetch("https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/index.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setSurahs(data.pageProps.surahs);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setLoading(false);
    //   });
  }, []);

      const [loaded] = useFonts({
      SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
      ReemKufi: require("../../assets/fonts/ReemKufi-VariableFont_wght.ttf"),
      AmiriQuran: require("../../assets/fonts/AmiriQuran-Regular.ttf"),
      bismillah: require("../../assets/fonts/bismillah/QCF_Bismillah_COLOR-Regular.ttf"),
      hafs: require("../../assets/fonts/hafs/uthmanic_hafs_v22.ttf"),
      mehr: require("../../assets/fonts/mehr/mehr.ttf"),
      Cairo: require("../../assets/fonts/Cairo-Regular.ttf"),
    });
  
 // شاشة خاصة لو ما في إنترنت
  if (!isConnected) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white p-4">
        <Image source={icons.noInternet} style={{ width: 200, height: 200 }} />
        <Text className="text-lg font-bold text-center mt-4" style={{ fontFamily: "Cairo" }}>
          {language === "ar" ? "لا يوجد اتصال بالإنترنت" : "No Internet Connection"}
        </Text>
        <Text className="text-gray-500 text-center mt-2" style={{ fontFamily: "Cairo" }}>
          {language === "ar"
            ? "يرجى التحقق من الاتصال وحاول مرة أخرى"
            : "Please check your connection and try again"}
        </Text>
        <TouchableOpacity
          onPress={fetchSurahs}
          className="mt-6 bg-emerald-600 px-6 py-3 rounded-2xl"
        >
          <Text className="text-white font-bold">
            {language === "ar" ? "إعادة المحاولة" : "Retry"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4db6ac" />
      </View>
    );
  }
  
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }



  
//  console.log(surahs[0], 'sssssssssssssssssssssssssssss')
  return (
    <SafeAreaView className="flex-1 p-2 bg-[#edf0f4]">
      {/* زر لتغيير اللغة */}
      {/* <TouchableOpacity
        onPress={() => setLanguage(language === "ar" ? "en" : "ar")}
        className="mb-4 bg-green-500 py-2 px-4 rounded"
      >
        <Text className="text-white text-center">
          {language === "ar" ? "Switch to English" : "التبديل للعربية"}
        </Text>
      </TouchableOpacity> */}
      <View className="flex flex-row items-center justify-between p-2 ">
        <TouchableOpacity
          onPress={ChangeLanguage}
          className="w-20 h-10  rounded-full flex-row items-center px-1 relative border border-emerald-600"
          activeOpacity={0.8}
        >
          {/* النصوص */}
          <Text className="absolute left-3 text-xs font-bold">AR</Text>
          <Text className="absolute right-3 text-xs font-bold">EN</Text>

          {/* الدائرة المتحركة */}
          <Animated.View
            className="w-8 h-8 bg-emerald-200/30 rounded-full shadow border border-emerald-600"
            style={{
              transform: [{ translateX }],
            }}
          />
        </TouchableOpacity>
        <Image source={icons.icon} style={{ width: 45, height: 45, borderRadius: 50 }} />

      </View>
      {/* the title */}

      <Text className="text-3xl font-bold text-center mx-auto pb-2" style={{fontFamily: "Cairo"}}>{language == 'en' ? "Holy Quran Surahs Index" : "فهرس سور القرآن الكريم"}</Text>

      {/* عرض السور */}

      <FlatList

        data={surahs}
        keyExtractor={(item) => item?.number.toString()}
        renderItem={({ item }) => (
          
          <TouchableOpacity onPress={() => router.push(`/surah/${item?.number}`)}>
            <View className="py-3 border-b border-gray-300 bg-white my-2 border   px-3  shadow rounded-md ">
            {language === "ar" ? (
              <Text className="text-xl font-bold  rounded ml-auto" style={{fontFamily: "Cairo"}}>
               {item?.number} - {item.name.ar} 
            </Text>
            ) : (
              <Text className="text-xl font-bold  rounded " style={{fontFamily: "Cairo"}}>
               {item?.number} - {item.name.transliteration}
            </Text>
            )}

            <View className={`flex items-center justify-between ${language == 'en' ? 'flex-row' : 'flex-row-reverse'} mt-2`}>
              {item?.revelation_place?.en == 'meccan' ? <Image source={icons.kaaba} style={{ width: 25, height: 25 }} />
                : <Image source={icons.qubaa} style={{ width: 25, height: 25 }} />}
              <Text className="text-md font-semibold text-gray-500 italic">
                {item?.verses_count} {language == 'en' ? "Verses" : 'آية' }
              </Text>
            </View>


          </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
