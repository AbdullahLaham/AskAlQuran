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








import { Alert, FlatList, ScrollView, StyleSheet, Text, View, Modal, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import convertToArabicNumerals from '@/utils/convertToArabicNumerals';
import { useFontSize } from '@/store/useFontSize';
import axios from 'axios';

const SurahView = ({ viewState, surah, language }: any) => {
  const { toArabic } = convertToArabicNumerals();
  const { fontSize } = useFontSize();

  const [tafsirVerses, setTafsirVerses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [tafsirText, setTafsirText] = useState<string>('');
  const [tafsirVerseText, setTafsirVerseText] = useState<string>('');
  const [loadingTafsir, setLoadingTafsir] = useState(false);

  useEffect(() => {
    setTafsirVerses([]);
  }, []);

  
  const updateTafsirVerses = (verse: any) => {
  let vess = [...tafsirVerses]; // انسخ عشان ما نعدلش على الأصل
  const exists = vess.some(v => v.number === verse.number);

  if (exists) {
    // احذفها إذا كانت موجودة
    vess = vess.filter(v => v.number !== verse.number);
  } else {
    // أضفها إذا لم تكن موجودة
    vess = [...vess, verse]; // إنشاء نسخة جديدة بدل push
  }

  setTafsirVerses(vess); // يضمن إن React يلاحظ التغيير
};




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
          .map((verse: any) => ({
            surahNo: surah.number,
            verseNo: verse.number,
            verseText: verse.text.ar,
          }))
          .sort((a, b) => a.verseNo - b.verseNo)
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
      {viewState === "joined" ? (
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
        </View>
      ) : (
        <View>
          <Text className="text-2xl font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>
            {surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"}
          </Text>
          <FlatList
            data={surah.verses}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item }) => (
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
              <Text className="text-right font-bold text-lg text-[#4db6ac] mb-3" style={{ fontFamily: 'hafs' }}>
                {/* {selectedVerse?.text?.ar} */}
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
    </View>
  );
};

export default SurahView;

const styles = StyleSheet.create({});
















