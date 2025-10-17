import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import  convertToArabicNumerals  from '@/utils/convertToArabicNumerals';
import { useFontSize } from '@/store/useFontSize';


const SurahView = ({ viewState, surah }: any) => {
  const {toArabic} = convertToArabicNumerals();
  const [tafsirVerses, setTafsirVerses] = useState([]);
  const {fontSize, setFontSize} = useFontSize(); // الحجم الافتراضي
  const showModal = () => {
    // Alert.alert("Verse Options", "You long-pressed on verse " + pressableId);
    Alert.alert("Verse Options", "خيارات الآية " + tafsirVerses.length);
  }
console.log('surah in surahview', fontSize);
  return (
    <View className='relative flex-1 bg-gray-100'>
      {viewState === "joined" ? (
        <View className="p-2">
          <Text className="text-2xl leading-loose  font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>{surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"}</Text>
          {/* {pressableIds.length > 0 && (<View className='mx-auto my-auto w-28 h-28 bg-white rounded-lg border-4 border-[#4db6ac] flex items-center justify-center  z-50 -left-[50%] -top-[50%] fixed'>
            <Text className="text-center text-gray-500 mb-2">Tafsir</Text>

          </View>)} */}
          {Object.values(
            surah.verses.reduce((acc: any, verse: any) => {
              const page = verse.page;
              if (!acc[page]) acc[page] = [];
              acc[page].push(verse);
              return acc;
            }, {})
          ).map((versesInPage: any, index: number) => (
            <View key={index} className="mb-6">
              {/* النصوص المجمعة لصفحة واحدة */}
              
              <Text className=" leading-loose text-black font-semibold text-center" style={{ fontSize, fontFamily: 'hafs' }}>
               {/**change this fontsize to be changeble as the fontsize varibale */}
                {versesInPage
                  .map((verse: any, i: number) => (
                    <Text style={{fontSize: fontSize}} onPress={() => {setPressableIds([...pressableIds, `${index}-${i}`]); setTafsirVerses([...tafsirVerses, verse])}}     onLongPress={() => {setPressableIds([...pressableIds, `${index}-${i}`]); showModal(); setTafsirVerses([...tafsirVerses, verse])}}  key={verse.number} style={{ fontFamily: 'hafs' }} className={`font-semibold ${tafsirVerses.find((v) => v.number == verse.number)   && "bg-gray-200 px-3"}` }>
                      {verse.text.ar}

                      <Text className="text-[#4db6ac] font-bold" style={{ fontFamily: 'hafs' }}>
                        {" "}{toArabic(verse.number)}&#1757;{" "}
                      </Text>
                      
                    </Text>
                  ))}
              </Text>

              {/* خط الفاصل مع رقم الصفحة */}
              <View className="mt-4 mb-2 border-t border-gray-300">
                <Text className="text-center w-full mt-1 bg-[#4db6ac] p-2 rounded-full text-white  mx-auto">
                  {versesInPage[0].page}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text className="text-2xl  font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>{surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"} </Text>
          <FlatList
            data={surah.verses}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item }) => (
              <View className="mb-4 p-4 bg-white rounded-xl shadow" style={{ fontFamily: 'hafs', fontSize }}>
                <Text className="text-xl font-arabic text-right text-black leading-relaxed" style={{ fontFamily: 'hafs', fontSize }}>
                  {item.text.ar} <Text className="text-[#4db6ac] font-bold"  style={{ writingDirection: "rtl" }}>
                      {toArabic(item.number)}&#1757;
                      </Text>
                </Text>
                <Text className="text-gray-600 mt-2" style={{ fontFamily: 'hafs', fontSize }}>{item.text.en}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  )
}

export default SurahView

const styles = StyleSheet.create({})




