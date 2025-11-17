// app/surah/[id].tsx

import { icons } from "@/constants";
import axios from "axios";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {getSurahByIndex} from "@/utils/getSurahByIndex"
import { useLanguageStore } from "@/store/useLanguageStore";
import DescriptionBox from "../../components/DescriptionBox";
import NavigationButtons from "../../components/NavigationButton";
import SurahView from "../../components/SurahView";
import ToggleModeButton from "../../components/ToggleModeButton";
import { normalizeDuration } from "react-native-reanimated/lib/typescript/css/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Toast from 'react-native-toast-message';


export default function SurahId() {

  const [surah, setSurah] = useState<any>(null);
  const [prevSurah, setPrevSurah] = useState<any>(null);
  const [nextSurah, setNextSurah] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [nloading, setNLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [viewState, setViewState] = useState<'joined' | 'splitted'>('joined');
  const [pageLoading, setPageLoading] = useState(true);

  // const [language, setLanguage] = useState("ar"); // "ar" or "en"

  const { language, toggleLanguage } = useLanguageStore();





  // hooks
  const navigation = useNavigation();


  const { surahId: id } = useLocalSearchParams<any>();

  const translateViewX = useRef(new Animated.Value(viewState === "joined" ? 0 : 30)).current;
  const translateLangX = useRef(new Animated.Value(language === "ar" ? 0 : 32)).current;

    const [loaded] = useFonts({
    // SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    // ReemKufi: require("../../assets/fonts/ReemKufi-VariableFont_wght.ttf"),
    // AmiriQuran: require("../../assets/fonts/AmiriQuran-Regular.ttf"),
    bismillah: require("@/assets/fonts/bismillah/QCF_Bismillah_COLOR-Regular.ttf"),
    hafs: require("@/assets/fonts/hafs/uthmanic_hafs_v22.ttf"),
    mehr: require("@/assets/fonts/mehr/mehr.ttf"),
  });




  const currentId = parseInt(id || "1");

  let mainColor = '#4db6ac';


  // معلومات عن السور السابقة والتالية
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId < 114 ? currentId + 1 : null;



console.log(currentId, 'sssssssssssssssssssssssssssss');





  const changeLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";


    toggleLanguage(newLang);

    Animated.timing(translateLangX, {
      toValue: newLang === "ar" ? 0 : 32,
      duration: 350,
      useNativeDriver: true,
    }).start();


  };


  const toggleMode = () => {
    const newLang = viewState === "joined" ? "splitted" : "joined";

    setViewState(newLang);

    Animated.timing(translateViewX, {
      toValue: newLang === "joined" ? 0 : 33,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };


  
 const fetchSurahs = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/quran/${id}.json?surahId=${id}`)
        const data = res.data;
        setSurah(data.pageProps.surah);

        // تحديث العنوان باسم السورة
        navigation.setOptions({
          title: language == 'ar' ? data.pageProps.surah.name.ar : data.pageProps.surah.name.transliteration,
        });

      } catch (error) {
        setLoading(false);
        console.error(error);
        if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
        // Alert.alert("خطأ في الاتصال", "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
        setIsConnected(false);
        return; // لا نسجل خروج المستخدم
      }
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    if (!id) return;
    console.log(id, 'rrrrrrrrrrrrrrrrrrrrrrrr')

    const fetchSurah = async () => {
      setLoading(true);
      try {
        // const res = await axios.get(`https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/quran/${id}.json?surahId=${id}`)
        // const data = res.data;

        const res = getSurahByIndex(parseInt(id));
        // const data = { pageProps: { surah: res } };
        setSurah(res);

        // setSurah(res.pageProps.surah);

        // تحديث العنوان باسم السورة
        navigation.setOptions({
          title: language == 'ar' ? res.name.ar : res.name.transliteration,
        });

      } catch (error) {
        setLoading(false);
        console.error(error);
        if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
        setIsConnected(false);
          // Alert.alert("خطأ في الاتصال", "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
        return; // لا نسجل خروج المستخدم
      }
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();


    const fetchNeighbor = async (nid: number, setFn: any) => {
      setNLoading(true)
      try {
        // const res = await fetch(
        //   `https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/quran/${nid}.json?surahId=${nid}`
        // );
        // const data = await res.json();
        // setFn(data.pageProps.surah);
        const res = getSurahByIndex(nid);
        setFn(res);
           // تحديث العنوان باسم السورة
        navigation.setOptions({
          title: language == 'ar' ? res.name.ar : res.name.transliteration,
        });


      } catch { }
      finally {
        setNLoading(false);
      }
    };

    fetchSurah();

    if (prevId) fetchNeighbor(prevId, setPrevSurah);
    if (nextId) fetchNeighbor(nextId, setNextSurah);
  }, [id]);


  useEffect(() => {
  const timer = setTimeout(() => {
    setPageLoading(false);
  }, 2000); // 2 seconds

  return () => clearTimeout(timer);
}, []);

//   useEffect(() => {
//     console.log(surah, 'sssssssssssssssssssssssssssss');
//     Animated.timing(translateViewX, {
//       toValue: language === "en" ? 33 : 0,
//       duration: 350,
//       useNativeDriver: true,
//     }).start();
  
// }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4db6ac" />
        <Text className="mt-2 text-gray-500">Loading...</Text>
      </View>
    );
  }
  if (pageLoading) {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <ActivityIndicator size="large" color="#4db6ac" />
      <Text className="mt-3 text-gray-600 font-semibold">Loading...</Text>
    </View>
  );
}

if (!currentId || !surah) {
return (
  
  <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4db6ac" />
        <Text className="mt-2 text-gray-500">Loading...</Text>
      </View>
)
      
    //  return (
    
    //   <SafeAreaView className="flex-1 items-center justify-center bg-white p-4">
    //           <Toast />

    //     <Image source={icons.notFound} style={{ width: 300, height: 300 }} />
    //     <Text className="text-lg font-bold text-center mt-4" style={{ fontFamily: "Cairo" }}>
    //       {language === "ar" ? "السورة التي تبحث عنها غير موجودة." : "Surah not found!"}
    //     </Text>
    //     <Text className="text-gray-500 text-center mt-2" style={{ fontFamily: "Cairo" }}>
    //       {language === "ar"
    //         ? "السورة التي تبحث عنها غير موجودة."
    //         : "The Surah you are looking for does not exist."}
    //     </Text>
    //     <TouchableOpacity
    //       onPress={fetchSurahs}
    //       className="mt-6 bg-emerald-600 px-6 py-3 rounded-2xl"
    //     >
    //       <Text className="text-white font-bold">
    //         {language === "ar" ? "إعادة المحاولة" : "Retry"}
    //       </Text>
    //     </TouchableOpacity>
    //   </SafeAreaView>
    // );
  }


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



  

  //   if (!surah) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-white">
  //       <Text className="text-red-500 font-bold">Surah not found!</Text>
  //     </View>
  //   );
  // }
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


  return (

    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Verses */}
      <ScrollView>
        <DescriptionBox surah={surah} language={language} mainColor={mainColor} />
         {/* أزرار التنقل */}
            
        <NavigationButtons prevId={prevId} prevSurah={prevSurah} nextId={nextId} nextSurah={nextSurah} language={language} nloading={nloading} />

        <ToggleModeButton translateViewX={translateViewX} toggleMode={toggleMode} />
        <SurahView viewState={viewState} surah={surah} language={language} />
      </ScrollView>

    </SafeAreaView>
  );
}













{/**
  





  <View className="flex flex-row items-center justify-between p-2 ">


        <TouchableOpacity
          onPress={changeLanguage}
          className="w-20 h-10  rounded-full flex-row items-center px-1 relative border border-emerald-600"
          activeOpacity={0.8}
        >
          <Text className="absolute left-3 text-xs font-bold">AR</Text>
          <Text className="absolute right-3 text-xs font-bold">EN</Text>

          <Animated.View
            className="w-8 h-8 bg-emerald-200/30 rounded-full shadow border border-emerald-600"
            style={{
              transform: [{ translateX: translateLangX }],
            }}
          />
        </TouchableOpacity>



        <TouchableOpacity onPress={() => router.push('/')} >
          <Image source={icons.icon} style={{ width: 50, height: 50, borderRadius: 50 }} />
        </TouchableOpacity>

      </View>



  */}