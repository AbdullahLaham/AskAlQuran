// import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import  convertToArabicNumerals  from '@/utils/convertToArabicNumerals';
// import { useFontSize } from '@/store/useFontSize';
// import axios from 'axios';


// const SurahView = ({ viewState, surah }: any) => {
//   const {toArabic} = convertToArabicNumerals();
//   const [tafsirVerses, setTafsirVerses] = useState([]);
//   const {fontSize, setFontSize} = useFontSize(); // الحجم الافتراضي
//   const showModal = () => {
//     // Alert.alert("Verse Options", "You long-pressed on verse " + pressableId);
//     Alert.alert("Verse Options", "خيارات الآية " + tafsirVerses.length);
//   }

//   useEffect(() => {
//     setTafsirVerses([]);
//   }, [])

//   const getVerseTafsir = async () => {
//     // Logic to get tafsir for the selected verses
//     const versesTafsir = tafsirVerses.map((verse: any) => {
//       return {
//         surahNo: surah.number,
//         verseNo: verse.number,
//         verseTest: verse.text.ar,
//       }
//     });
//     console.log(versesTafsir)
//     const res = await axios.post('https://api.askalquran.com/tafsir', {
//       verses: versesTafsir,
//     });
//     console.log('Tafsir Response:', res.data);
//   }
// console.log('surah in surahview', fontSize);
//   return (
//     <View className='relative flex-1 bg-gray-100'>
//       {viewState === "joined" ? (
//         <View className="p-2">
//           <Text className="text-2xl leading-loose  font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>{surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"}</Text>
//           {/* {pressableIds.length > 0 && (<View className='mx-auto my-auto w-28 h-28 bg-white rounded-lg border-4 border-[#4db6ac] flex items-center justify-center  z-50 -left-[50%] -top-[50%] fixed'>
//             <Text className="text-center text-gray-500 mb-2">Tafsir</Text>

//           </View>)} */}
//           {Object.values(
//             surah.verses.reduce((acc: any, verse: any) => {
//               const page = verse.page;
//               if (!acc[page]) acc[page] = [];
//               acc[page].push(verse);
//               return acc;
//             }, {})
//           ).map((versesInPage: any, index: number) => (
//             <View key={index} className="mb-6">
//               {/* النصوص المجمعة لصفحة واحدة */}

//               <Text className=" leading-loose text-black font-semibold text-center" style={{ fontSize, fontFamily: 'hafs' }}>
//                {/**change this fontsize to be changeble as the fontsize varibale */}
//                 {versesInPage
//                   .map((verse: any, i: number) => (
//                     <Text style={{fontSize: fontSize}} onPress={() => { setTafsirVerses([...tafsirVerses, verse])}}     onLongPress={() => { showModal(); setTafsirVerses([...tafsirVerses, verse]); getVerseTafsir()}}  key={verse.number} style={{ fontFamily: 'hafs' }} className={`font-semibold ${tafsirVerses.find((v) => v.number == verse.number)   && "bg-gray-200 px-3"}` }>
//                       {verse.text.ar}

//                       <Text className="text-[#4db6ac] font-bold" style={{ fontFamily: 'hafs' }}>
//                         {" "}{toArabic(verse.number)}&#1757;{" "}
//                       </Text>

//                     </Text>
//                   ))}
//               </Text>

//               {/* خط الفاصل مع رقم الصفحة */}
//               <View className="mt-4 mb-2 border-t border-gray-300">
//                 <Text className="text-center w-full mt-1 bg-[#4db6ac] p-2 rounded-full text-white  mx-auto">
//                   {versesInPage[0].page}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       ) : (
//         <View>
//           <Text className="text-2xl  font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>{surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"} </Text>
//           <FlatList
//             data={surah.verses}
//             keyExtractor={(item) => item.number.toString()}
//             contentContainerStyle={{ padding: 12 }}
//             renderItem={({ item }) => (
//               <View className="mb-4 p-4 bg-white rounded-xl shadow" style={{ fontFamily: 'hafs', fontSize }}>
//                 <Text className="text-xl font-arabic text-right text-black leading-relaxed" style={{ fontFamily: 'hafs', fontSize }}>
//                   {item.text.ar} <Text className="text-[#4db6ac] font-bold"  style={{ writingDirection: "rtl" }}>
//                       {toArabic(item.number)}&#1757;
//                       </Text>
//                 </Text>
//                 <Text className="text-gray-600 mt-2" style={{ fontFamily: 'hafs', fontSize }}>{item.text.en}</Text>
//               </View>
//             )}
//           />
//         </View>
//       )}












//     </View>
//   )
// }

// export default SurahView

// const styles = StyleSheet.create({})








// import { Alert, FlatList, ScrollView, StyleSheet, Text, View, Modal, ActivityIndicator, Pressable } from 'react-native';
// import React, { useEffect,useRef, useState } from 'react';
// import convertToArabicNumerals from '@/utils/convertToArabicNumerals';
// import { useFontSize } from '@/store/useFontSize';
// import axios from 'axios';
// import { Image } from 'expo-image';
// import * as Clipboard from 'expo-clipboard';
// // import Toast from 'react-native-root-toast';
// import Toast from 'react-native-toast-message';

// import { Animated } from 'react-native';

// const Sonner = ({ visible, message }: { visible: boolean; message: string }) => {
//   const slideAnim = useRef(new Animated.Value(100)).current; // يبدأ من أسفل

//   useEffect(() => {
//     if (visible) {
//       // يظهر التوست
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();

//       // يختفي بعد ثانية ونصف
//       setTimeout(() => {
//         Animated.timing(slideAnim, {
//           toValue: 100,
//           duration: 250,
//           useNativeDriver: true,
//         }).start();
//       }, 1500);
//     }
//   }, [visible]);

//   return (
//     <Animated.View
//       className="absolute bottom-10 left-0 right-0 items-center"
//       style={{
//         transform: [{ translateY: slideAnim }],
//       }}
//     >
//       <View className="bg-[#4db6ac] px-5 py-3 rounded-2xl shadow-lg">
//         <Text className="text-white text-base font-semibold">{message}</Text>
//       </View>
//     </Animated.View>
//   );
// };








// const SurahView = ({ viewState, surah, language }: any) => {
//   const { toArabic } = convertToArabicNumerals();
//   const { fontSize } = useFontSize();

//   const [tafsirVerses, setTafsirVerses] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVerse, setSelectedVerse] = useState<any>(null);
//   const [tafsirText, setTafsirText] = useState<string>('');
//   const [tafsirVerseText, setTafsirVerseText] = useState<string>('');
//   const [loadingTafsir, setLoadingTafsir] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);

//   useEffect(() => {
//     setTafsirVerses([]);
//   }, []);

  
//   const updateTafsirVerses = (verse: any) => {
//   let vess = [...tafsirVerses]; // انسخ عشان ما نعدلش على الأصل
//   const exists = vess.some(v => v.number === verse.number);

//   if (exists) {
//     // احذفها إذا كانت موجودة
//     vess = vess.filter(v => v.number !== verse.number);
//   } else {
//     // أضفها إذا لم تكن موجودة
//     vess = [...vess, verse]; // إنشاء نسخة جديدة بدل push
//   }

//   setTafsirVerses(vess); // يضمن إن React يلاحظ التغيير
// };










//   const copyToClipboard = async (text: any) => {
//    await Clipboard.setStringAsync(text);
//   setIsCopied(true);
//   setTimeout(() => setIsCopied(false), 2000); // يخفي بعد ثانيتين
//   };



//   const getVerseTafsir = async (verse: any) => {
//     try {
//       setLoadingTafsir(true);
//       setTafsirText('');
//       let res;

//       if (!tafsirVerses.length) {
//         res = await axios.post('https://api.askalquran.com/tafsir', {
//         verses: [{
//             surahNo: surah.number,
//             verseNo: verse.number,
//             verseText: verse.text.ar,
//           }]
//       });

//       } else {
//         res = await axios.post('https://api.askalquran.com/tafsir', {
//         verses: tafsirVerses
//           .map((verse: any) => ({
//             surahNo: surah.number,
//             verseNo: verse.number,
//             verseText: verse.text.ar,
//           }))
//           .sort((a, b) => a.verseNo - b.verseNo)
//       });
//       }

//       setTafsirText(res.data?.tafsir || 'لم يتم العثور على تفسير لهذه الآية');

//       setTafsirVerseText(res.data?.verseText || '');

//       setTafsirVerses([]);
//     } catch (err: any) {
//       console.log('Tafsir Error:', err.response?.data || err.message);
//       setTafsirText('حدث خطأ أثناء جلب التفسير');
//     } finally {
//       setLoadingTafsir(false);
//     }
//   };

//   const handleLongPress = async (verse: any) => {
//     setSelectedVerse(verse);
//     setModalVisible(true);
//     await getVerseTafsir(verse);
//   };

//   return (
//     <View className="relative flex-1 bg-gray-100">
//       <Sonner visible={isCopied} message="📋 تم النسخ بنجاح!" />

//       {/* <Toast /> */}
//       {viewState === "joined" ? (
//         <View className="p-2">
//           <Text className="text-2xl leading-loose font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>
//             {surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"}
//           </Text>

//           {Object.values(
//             surah.verses.reduce((acc: any, verse: any) => {
//               const page = verse.page;
//               if (!acc[page]) acc[page] = [];
//               acc[page].push(verse);
//               return acc;
//             }, {})
//           ).map((versesInPage: any, index: number) => (
//             <View key={index} className="mb-6">
//               <Text className="leading-loose text-black font-semibold text-center" style={{ fontSize, fontFamily: 'hafs' }}>
//                 {versesInPage.map((verse: any) => (
//                   <Text
//                     key={verse.number}
//                     onPress={() => updateTafsirVerses(verse)}
//                     onLongPress={() => handleLongPress(verse)}
//                     className={`font-semibold ${tafsirVerses.find((v) => v.number == verse.number) && "bg-gray-200 px-3"}`}
//                     style={{ fontFamily: 'hafs', fontSize }}
//                   >
//                     {verse.text.ar}
//                     <Text className="text-[#4db6ac] font-bold" style={{ fontFamily: 'hafs' }}>
//                       {" "}{toArabic(verse.number)}&#1757;{" "}
//                     </Text>
//                   </Text>
//                 ))}
//               </Text>

//               <View className="mt-4 mb-2 border-t border-gray-300">
//                 <Text className="text-center w-full mt-1 bg-[#4db6ac] p-2 rounded-full text-white mx-auto">
//                   {versesInPage[0].page}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       ) : (
//         <View>
//           <Text className="text-2xl font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>
//             {surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"}
//           </Text>
//           <FlatList
//             data={surah.verses}
//             keyExtractor={(item) => item.number.toString()}
//             contentContainerStyle={{ padding: 12 }}
//             renderItem={({ item }) => (
//               <View className="mb-4 p-4 bg-white rounded-xl shadow">
//                 <Text
//                   className="text-xl text-right text-black leading-relaxed"
//                   style={{ fontFamily: 'hafs', fontSize }}
//                   onLongPress={() => handleLongPress(item)}
//                 >
//                   {item.text.ar}
//                   <Text className="text-[#4db6ac] font-bold">
//                     {" "}{toArabic(item.number)}&#1757;
//                   </Text>
//                 </Text>
//                 <Text className="text-gray-600 mt-2" style={{ fontFamily: 'hafs', fontSize }}>
//                   {item.text.en}
//                 </Text>
//                 <Text onPress={() => copyToClipboard(`${item.text.ar} 🌐 ${item.text.en}`)} className="mt-2 self-end">
//                   <Image source={require('../assets/icons/copy.png')} style={{ width: 25, height: 25, marginTop: 10 }} />
//                 </Text>
//               </View>
//             )}
//           />
//         </View>
//       )}

//       {/* ✅ المودال لعرض التفسير */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View className="flex-1 bg-black/40 justify-center items-center px-5">
//           <View className="bg-white rounded-2xl w-full p-6 shadow-lg max-h-[85%]">
//             <ScrollView>

//               <Text className="text-3xl py-3 mx-auto font-bold text-[#4db6ac] text-center mb-2" style={{ writingDirection: "rtl", fontFamily: "", }}>
//                            {surah.name.ar} ({surah.name.transliteration})
//                           </Text>

//               <Text className="text-right font-bold text-lg text-[#4db6ac] mb-3" style={{ fontFamily: 'hafs' }}>
//                 {/* {selectedVerse?.text?.ar} */}
//                 {tafsirVerseText}
//               </Text>

//               <View className="border-b border-gray-300 mb-3" />

//               {loadingTafsir ? (
//                 <ActivityIndicator size="large" color="#4db6ac" />
//               ) : (
//                 <Text className="text-right text-gray-700 text-lg font-semibold  leading-loose" style={{ fontFamily: 'hafs' }}>
//                   {tafsirText}
//                 </Text>
//               )}
//             </ScrollView>

//             <Pressable
//               onPress={() => setModalVisible(false)}
//               className="mt-5 bg-[#4db6ac] py-3 rounded-xl"
//             >
//               <Text className="text-center text-white font-semibold text-lg">{language == "ar" ? "إغلاق" : "close"}</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default SurahView;

// const styles = StyleSheet.create({});






































import { Alert, FlatList, ScrollView, StyleSheet, Text, View, Modal, ActivityIndicator, Pressable, Animated, Easing } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import convertToArabicNumerals from '@/utils/convertToArabicNumerals';
import { useFontSize } from '@/store/useFontSize';
import axios from 'axios';
import { Image } from 'expo-image';
import * as Clipboard from 'expo-clipboard';

// ----------------- Sonner component (small toast) -----------------
const Sonner = ({ visible, message }: { visible: boolean; message: string }) => {
  console.log(visible, 'tttttttttttttttt')
  const translateY = useRef(new Animated.Value(20)).current; // 20px down when hidden
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    if (visible) {
      console.log('Showing Sonner with message:', message);
      // show
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();

      // auto hide after 1500ms
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 20,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        hideTimer.current = null;
      }, 1500);
    } else {
      // hide immediately if visible becomes false
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 20,
          duration: 160,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };
  }, [visible]);

  // we render even when hidden to keep position consistent
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 40,
        alignItems: 'center',
        transform: [{ translateY }],
        opacity,
        zIndex: 9999,
      }}
      pointerEvents="none"
    >
      <View className="bg-[#333] px-4 py-2 rounded-2xl shadow-lg">
        <Text className="text-white text-base font-semibold">{message}</Text>
      </View>
    </Animated.View>
  );
};
// ----------------- End Sonner -----------------


const SurahView = ({ viewState, surah, language }: any) => {
  const { toArabic } = convertToArabicNumerals();
  const { fontSize } = useFontSize();

  const [tafsirVerses, setTafsirVerses] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [tafsirText, setTafsirText] = useState<string>('');
  const [tafsirVerseText, setTafsirVerseText] = useState<string>('');
  const [loadingTafsir, setLoadingTafsir] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null); // لتحديد الآية المنسوخة



console.log(isCopied, 'rrrrrrrrrrrrrrrrrrrrrrr');
  useEffect(() => {
    setTafsirVerses([]);
  }, []);

  const updateTafsirVerses = (verse: any) => {
    let vess = [...tafsirVerses]; // انسخ عشان ما نعدلش على الأصل
    const exists = vess.some(v => v.number === verse.number);

    if (exists) {
      vess = vess.filter(v => v.number !== verse.number);
    } else {
      vess = [...vess, verse];
    }

    setTafsirVerses(vess);
  };

  // const copyToClipboard = async (text: any) => {


    const copyToClipboard = async (text: string, index: number) => {
    try {
      await Clipboard.setStringAsync(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 3000); // يخفي النص بعد 3 ثواني
    } catch (err) {
      console.log('copy error', err);
    }
  };
  //   try {
  //     await Clipboard.setStringAsync(text);
  //     // only set visible flag; Sonner will auto-hide
  //     setIsCopied(true); // reset then set true to retrigger if needed fast
  //     // tiny timeout to allow toggle retrigger if user copies very fast
  //     setTimeout(() => setIsCopied(false), 20);
  //   } catch (err) {
  //     console.log('copy error', err);
  //   }
  // };

  const getVerseTafsir = async (verse: any) => {
    try {
      setLoadingTafsir(true);
      setTafsirText('');
      let res;

      if (!tafsirVerses.length) {
        res = await axios.post('https://api.askalquran.com/tafsir', {
          verses: [{
            surahNo: surah.number,
            verseNo: verse.number,
            verseText: verse.text.ar,
          }]
        });
      } else {
        res = await axios.post('https://api.askalquran.com/tafsir', {
          verses: tafsirVerses
            .map((v: any) => ({
              surahNo: surah.number,
              verseNo: v.number,
              verseText: v.text.ar,
            }))
            .sort((a: any, b: any) => a.verseNo - b.verseNo)
        });
      }

      setTafsirText(res.data?.tafsir || 'لم يتم العثور على تفسير لهذه الآية');
      setTafsirVerseText(res.data?.verseText || '');
      setTafsirVerses([]);
    } catch (err: any) {
      console.log('Tafsir Error:', err.response?.data || err.message);
      setTafsirText('حدث خطأ أثناء جلب التفسير');
    } finally {
      setLoadingTafsir(false);
    }
  };

  const handleLongPress = async (verse: any) => {
    setSelectedVerse(verse);
    setModalVisible(true);
    await getVerseTafsir(verse);
  };

  return (
    <View className="relative flex-1 bg-gray-100">
      {
      
      viewState === "joined" ? (
        <View className="p-2">
          <Text className="text-2xl leading-loose font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>
            {surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"}
          </Text>

          {Object.values(
            surah.verses.reduce((acc: any, verse: any) => {
              const page = verse.page;
              if (!acc[page]) acc[page] = [];
              acc[page].push(verse);
              return acc;
            }, {})
          ).map((versesInPage: any, index: number) => (
            <View key={index} className="mb-6">
              <Text className="leading-loose text-black font-semibold text-center" style={{ fontSize, fontFamily: 'hafs' }}>
                {versesInPage.map((verse: any) => (
                  <Text
                    key={verse.number}
                    onPress={() => updateTafsirVerses(verse)}
                    onLongPress={() => handleLongPress(verse)}
                    className={`font-semibold ${tafsirVerses.find((v) => v.number == verse.number) && "bg-gray-200 px-3"}`}
                    style={{ fontFamily: 'hafs', fontSize }}
                  >
                    {verse.text.ar}
                    <Text className="text-[#4db6ac] font-bold" style={{ fontFamily: 'hafs' }}>
                      {" "}{toArabic(verse.number)}&#1757;{" "}
                    </Text>
                  </Text>
                ))}
              </Text>

              <View className="mt-4 mb-2 border-t border-gray-300">
                <Text className="text-center w-full mt-1 bg-[#4db6ac] p-2 rounded-full text-white mx-auto">
                  {versesInPage[0].page}
                </Text>
              </View>
            </View>
          ))}
   {/* ✅ الأزرار الثابتة في الأسفل */}
  {/* {tafsirVerses.length > 0 && (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
      }}
    >
      <Pressable
        onPress={() => {
          const selectedText = tafsirVerses.map((v) => v.text.ar).join(' ');
          copyToClipboard(selectedText, 999);
        }}
        className="bg-[#4db6ac] px-6 py-3 rounded-full"
      >
        <Text className="text-white text-lg font-bold">📋 نسخ</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setModalVisible(true);
          getVerseTafsir(tafsirVerses[0]);
        }}
        className="bg-[#4db6ac] px-6 py-3 rounded-full"
      >
        <Text className="text-white text-lg font-bold">📖 التفسير</Text>
      </Pressable>
    </View>
  )} */}
        </View>
      ) 
      
      : (
        <View>
          <Text className="text-2xl font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>
            {surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"}
          </Text>
          <FlatList
            data={surah.verses}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item, index }) => (
              <View className="mb-4 p-4 bg-white rounded-xl shadow">
                <Text
                  className="text-xl text-right text-black leading-relaxed"
                  style={{ fontFamily: 'hafs', fontSize }}
                  onLongPress={() => handleLongPress(item)}
                >
                  {item.text.ar}
                  <Text className="text-[#4db6ac] font-bold">
                    {" "}{toArabic(item.number)}&#1757;
                  </Text>
                </Text>
                <Text className="text-gray-600 mt-2" style={{ fontFamily: 'hafs', fontSize }}>
                  {item.text.en}
                </Text>
                {/* ===== Copy Button + Copied message ===== */}
              <View className="flex-row items-center self-end mt-3">
                <Pressable onPress={() => copyToClipboard(`${item.text.ar} 🌐 ${item.text.en}`, index)}>
                  <Image
                    source={require('../assets/icons/copy.png')}
                    style={{ width: 25, height: 25 }}
                  />
                </Pressable>

                {copiedIndex === index && (
                  <View className="ml-2 bg-gray-200 px-3 py-1 rounded-full flex-row items-center">
                    <Text className="text-gray-700 font-semibold mr-1">Copied</Text>
                    <Text style={{ fontSize: 18 }}>✅</Text>
                  </View>
                )}
              </View>
              </View>
            )}
          />
        </View>
      )}

      {/* ✅ المودال لعرض التفسير */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-5">
          <View className="bg-white rounded-2xl w-full p-6 shadow-lg max-h-[85%]">
            <ScrollView>

              <Text className="text-3xl py-3 mx-auto font-bold text-[#4db6ac] text-center mb-2" style={{ writingDirection: "rtl", fontFamily: "", }}>
                {surah.name.ar} ({surah.name.transliteration})
              </Text>

              <Text className="text-right font-bold text-lg text-[#4db6ac] mb-3" style={{ fontFamily: 'hafs' }}>
                {tafsirVerseText}
              </Text>

              <View className="border-b border-gray-300 mb-3" />

              {loadingTafsir ? (
                <ActivityIndicator size="large" color="#4db6ac" />
              ) : (
                <Text className="text-right text-gray-700 text-lg font-semibold  leading-loose" style={{ fontFamily: 'hafs' }}>
                  {tafsirText}
                </Text>
              )}
            </ScrollView>

            <Pressable
              onPress={() => setModalVisible(false)}
              className="mt-5 bg-[#4db6ac] py-3 rounded-xl"
            >
              <Text className="text-center text-white font-semibold text-lg">{language == "ar" ? "إغلاق" : "close"}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Sonner: shows when isCopied = true */}
      <Sonner visible={isCopied} message="📋 تم النسخ بنجاح!" />
    </View>
  );
};

export default SurahView;

const styles = StyleSheet.create({});
