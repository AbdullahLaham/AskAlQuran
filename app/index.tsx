// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Redirect, router } from 'expo-router'

// import { I18nManager } from 'react-native';
// import { useFonts } from 'expo-font';





// // import * as Updates from 'expo-updates';


// // I18nManager.forceRTL(true); // فرض الاتجاه من اليمين إلى اليسار
// // I18nManager.allowRTL(true); // السماح بالتبديل إلى RTL إذا كانت اللغة تدعمه

// // const isRTL = Localization.isRTL; // التحقق مما إذا كانت اللغة الحالية RTL

// const Home = () => {
//   useEffect(() => {
//     // Force app to stay LTR
//     I18nManager.allowRTL(false);
//     I18nManager.forceRTL(false);
//   }, []);

//    I18nManager.allowRTL(false);
//   I18nManager.forceRTL(false);


//   return <Redirect href="/home" />

// }

// export default Home

// const styles = StyleSheet.create({});







import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Animated, Alert, I18nManager } from "react-native";
// import IconAlnuzul from '@/app/components/IconAlnuzul';
import { Image } from "expo-image";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useFonts } from "expo-font";
import surahsData from "../public/json/metadata.json";
import { RootSiblingParent } from 'react-native-root-siblings';


export default function Home() {
  const [surahs, setSurahs] = useState(surahsData);
  console.log(surahsData.length, 'sssssssssssssssssssssssssssss')
  const [loading, setLoading] = useState(false);
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
      const res = await axios.get("https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/index.json");
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
    // fetchSurahss();
  }, []);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ReemKufi: require("../assets/fonts/ReemKufi-VariableFont_wght.ttf"),
    AmiriQuran: require("../assets/fonts/AmiriQuran-Regular.ttf"),
    bismillah: require("../assets/fonts/bismillah/QCF_Bismillah_COLOR-Regular.ttf"),
    hafs: require("../assets/fonts/hafs/uthmanic_hafs_v22.ttf"),
    mehr: require("../assets/fonts/mehr/mehr.ttf"),
    Cairo: require("../assets/fonts/Cairo-Regular.ttf"),
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

console.log( 'rrrrrrrrrrrreeeeeeeeeeeeeeeeeeeeeeeeee15', surahs[0])


  //  console.log(surahs[0], 'sssssssssssssssssssssssssssss')
  return (
    <RootSiblingParent>

      <SafeAreaView className="flex-1 p-2 bg-[#edf0f4]">
 

        {/* the title */}

        <Text className="text-3xl font-bold text-center mx-auto pb-2" style={{ fontFamily: "Cairo" }}>{language == 'en' ? "Holy Quran Surahs Index" : "فهرس سور القرآن الكريم"}</Text>

        {/* عرض السور */}

        <FlatList

          data={surahs}
          keyExtractor={(item) => item?.number.toString()}
          renderItem={({ item }) => (

            <TouchableOpacity onPress={() => router.push(`/surah/${item?.number}`)}>
              <View className="py-3 border-b border-gray-300 bg-white my-2 border   px-3  shadow rounded-md ">
                {language === "ar" ? (
                  <Text className="text-xl font-bold  rounded ml-auto" style={{ fontFamily: "Cairo" }}>
                    {item?.number} - {item.name.ar}
                  </Text>
                ) : (
                  <Text className="text-xl font-bold  rounded " style={{ fontFamily: "Cairo" }}>
                    {item?.number} - {item.name.transliteration}
                  </Text>
                )}

                <View className={`flex items-center justify-between ${language == 'en' ? 'flex-row' : 'flex-row-reverse'} mt-2`}>
                  {item?.revelation_place?.en == 'meccan' ? <Image source={icons.kaaba} style={{ width: 25, height: 25 }} />
                    : <Image source={icons.qubaa} style={{ width: 25, height: 25 }} />}
                  <Text className="text-md font-semibold text-gray-500 italic">
                    {item?.verses_count} {language == 'en' ? "Verses" : 'آية'}
                  </Text>
                </View>


              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </RootSiblingParent>

  );
}
