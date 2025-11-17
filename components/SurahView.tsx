
import { Alert, FlatList, ScrollView, StyleSheet, Text, View, Modal, ActivityIndicator, Pressable, Animated, Easing, Button } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import convertToArabicNumerals from '@/utils/convertToArabicNumerals';
import { useFontSize } from '@/store/useFontSize';
import axios from 'axios';
import { Image } from 'expo-image';
import * as Clipboard from 'expo-clipboard';
import SurahText from './SurahText';



const SurahView = ({ viewState, surah, language }: any) => {
  const { toArabic } = convertToArabicNumerals();
const { fontSize, setFontSize, resetFontSize } = useFontSize();

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
          {/* <Button title="Reset Font Size" onPress={resetFontSize} /> */}

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
              <SurahText key={index} index={index} versesInPage={versesInPage} updateTafsirVerses={updateTafsirVerses} toArabic={toArabic} tafsirVerses={tafsirVerses} fontSize={fontSize} setFontSize={setFontSize} handleLongPress={handleLongPress} />
            ))}
            {/* ✅ الأزرار الثابتة في الأسفل */}
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
                    {/* <Text
                      style={{
                        fontFamily: 'hafs',
                        fontSize,
                        direction: 'rtl',
                        writingDirection: 'rtl',
                        textAlign: 'left',
                        lineHeight: fontSize * 1.6,
                      }}
                    >
                      {item.text.ar}
                      <Text
                        style={{
                          color: '#4db6ac',
                          fontWeight: 'bold',
                          direction: 'rtl',
                          writingDirection: 'rtl',
                        }}
                      >
                        {' '}{toArabic(item.number)}&#1757;
                      </Text>
                    </Text> */}


                    <Text
                      key={item.number}
                      // onPress={() => updateTafsirVerses(verse)}
                      onLongPress={() => handleLongPress(item)}
                      className={`font-semibold ${tafsirVerses.find((v) => v.number == item.number) && "bg-gray-200 px-3"}`}
                      style={{
                        fontFamily: 'hafs',
                        fontSize,
                        direction: 'rtl',
                        writingDirection: 'rtl',
                        // lineHeight: fontSize * 1.6,
                        maxWidth: '100%',
                        flexShrink: 1, // ✅ يمنع خروج الرقم خارج السطر
                      }}
                    >
                      {` ${item.text.ar} `}
                      <Text
                        style={{
                          fontFamily: 'hafs',
                          color: '#4db6ac', // ✅ لون مختلف للرقم
                          fontWeight: 'bold',
                        }}
                      >
                        {toArabic(item.number)}&#1757;
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
    </View>
  );
};

export default SurahView;

const styles = StyleSheet.create({});


















// <Text
//                     className="text-xl text-right text-black leading-relaxed text-[#4db6ac] font-bold"
//                     style={{ fontFamily: 'hafs', fontSize }}
//                     onLongPress={() => handleLongPress(item)}
//                   >
//                     {`${item.text.ar}  ${toArabic(item.number)}۝`}

//                     {item.text.ar}
//                 <Text className="">
//                   {" "}{toArabic(item.number)}&#1757;
//                 </Text>
//                   </Text>