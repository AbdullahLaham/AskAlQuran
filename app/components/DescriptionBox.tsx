import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DescriptionBox = ({surah, language, mainColor}: any) => {
    console.log('rrrrrrrrrrrrppppppppppppppppppppp', surah);
  return (
    <View>
       {language === "ar" ? (
         



          <View className="space-y-2 p-2 bg-[#4db6ac] m-2 rounded-lg flex flex-col items-end gap-1" >
            
            <Text className="text-3xl py-2 mx-auto font-bold text-white text-center mb-2" style={{ writingDirection: "rtl", fontFamily: "", }}>
              سورة {surah.name.ar} ({surah.name.transliteration})
            </Text>

            <View className='p-2 rounded-lg bg-gray-200 w-[80%] mx-auto flex items-center mb-2'>
              <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }} >اسم السورة بالعربي: <Text className='text-[#4db6ac] font-semibold text-lg'>{surah.name.ar}</Text></Text>
            </View>
            <View className='p-2 rounded-lg bg-gray-200 w-[80%] mx-auto flex items-center'>
              <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>اسم السورة بالإنجليزي: <Text className='text-[#4db6ac] font-semibold text-lg'>{surah.name.transliteration}</Text></Text>
            </View>
            <View className='p-2  w-[85%] mx-auto flex flex-row items-center gap-2'>
              <View className='rounded-lg bg-gray-100 p-2 flex items-center flex-1'>
                <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>آيات: <Text style={{fontFamily: "Cairo",}} className='text-[#4db6ac] font-semibold text-lg'>{surah.verses_count}</Text></Text>
              </View>
              <View className='rounded-lg bg-gray-100 p-2 flex items-center flex-1'>
                <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>مكان النزول: <Text style={{fontFamily: "Cairo",}} className='text-[#4db6ac] font-semibold text-lg'>{surah.revelation_place.ar}</Text></Text>
              </View>
            </View>
            <View style={{FontFamily: "Cairo"}} className='p-2 w-[85%] mx-auto flex flex-row items-center gap-2'>
              <View className='rounded-lg bg-gray-100 p-1 flex items-center flex-1'>
                <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>عدد الحروف: <Text style={{fontFamily: "Cairo",}} className='text-[#4db6ac] font-semibold text-lg'>{surah.letters_count}</Text></Text>
              </View>
              <View className='rounded-lg bg-gray-100 p-1 flex items-center flex-1'>
                <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>عدد الكلمات: <Text style={{fontFamily: "Cairo",}} className='text-[#4db6ac] font-semibold text-lg'>{surah.words_count}</Text></Text>
              </View>
            </View>
          </View>
        ) : (   <View className="space-y-2 p-2 bg-[#4db6ac] m-2 rounded-lg flex flex-col items-end gap-1" style={{ fontFamily: 'Cairo', }}>
            
            <Text className="text-3xl mx-auto font-bold text-white text-center mb-2" style={{ writingDirection: "rtl", fontFamily: "", }}>
              Surah {surah.name.transliteration}
            </Text>

            <View className='p-2 rounded-lg bg-gray-200 w-[80%] mx-auto flex items-center mb-2'>
              <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }} >Surah Name: <Text className='text-[#4db6ac] font-semibold text-lg'>{surah.name.transliteration}</Text></Text>
            </View>
            <View className='p-2 rounded-lg bg-gray-200 w-[80%] mx-auto flex items-center'>
              <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>Meaning: <Text className='text-[#4db6ac] font-semibold text-lg'>{surah.name.en}</Text></Text>
            </View>
            <View className='p-2  mx-auto flex flex-row items-center gap-2'>
              <View className='rounded-lg bg-gray-100 p-2 flex items-center flex-1'>
                <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>Revelation Place: <Text style={{fontFamily: "Cairo",}} className='text-[#4db6ac] font-semibold text-lg'>{surah.revelation_place.en}</Text></Text>
              </View>
              <View className='rounded-lg bg-gray-100 p-2 flex items-center'>
                <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}> Verses: <Text style={{fontFamily: "Cairo",}} className='text-[#4db6ac] font-semibold text-lg'>{surah.verses_count}</Text></Text>
              </View>
              
            </View>

            <View style={{fontFamily: "Cairo",}} className='p-2 mx-auto flex flex-row items-center gap-2'>
              <View className='rounded-lg bg-gray-100 py-1 flex items-center flex-1'>
                <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>Word Count:  <Text style={{fontFamily: "Cairo",}} className='text-[#4db6ac] font-semibold text-lg'>{surah.words_count}</Text></Text>
              </View>
              <View className='rounded-lg bg-gray-100 p-1 flex items-center flex-1'>
                <Text className=" font-bold text-md text-gray-600  " style={{ writingDirection: "rtl", fontFamily: "Cairo", }}>Letters <Text style={{fontFamily: "Cairo",}} className='text-[#4db6ac] font-semibold text-lg'>{surah.letters_count}</Text></Text>
              </View>
              
            </View>
          </View>
        
        )}
    </View>
  )
}

export default DescriptionBox

const styles = StyleSheet.create({})












// <View className="p-4 bg-[#4db6ac] m-2 rounded-lg">
          //   <Text className="text-2xl font-bold text-white text-center">
          //     {surah.name.ar} ({surah.name.transliteration})
          //   </Text>
          //   <Text className="text-center text-white mt-1">
          //     {surah.revelation_place.ar.toUpperCase()}
          //   </Text>
          //   <Text className="text-center text-sm text-gray-200 mt-1">
          //     {surah.verses_count} آية • {surah.words_count} كلمة • {surah.letters_count} حرف
          //   </Text>
          // </View>





//     <View className="w-[95%] bg-white max-w-[700px] bg-card-bg rounded-md p-3 mt-5 mx-auto border border-gray-100 relative">
//       {/* Title Floating Above Box */}
//       <Text className="absolute bg-emerald-500  left-1/2 -top-4 text-white  -translate-x-1/2 bg-gradient px-5 py-1 rounded text-text-white whitespace-nowrap">
// معلومات عن السورة      </Text>

//       {/* Info Details */}
//       <View className="flex flex-wrap justify-center items-center gap-2 mt-5">
//         <Text className="bg-[#edf0f4] px-auto text-center py-2 rounded text-base flex-1 w-[70%] mx-auto  ">
//           اسم السورة: <Text className={`text-${mainColor}`}>{surah.name.ar}</Text>
//         </Text>

//         <Text className="bg-[#edf0f4] px-5 py-2 rounded text-base">
//           مكان النزول: <Text className="text-primary-color">{surah.revelation_place.ar.toUpperCase()}</Text>
//         </Text>

//         <Text className="bg-[#edf0f4] px-5 py-2 rounded text-base">
//           عدد الآيات: <Text className="text-primary-color">{surah.verses_count}</Text>
//         </Text>

//         <Text className="bg-[#edf0f4] px-5 py-2 rounded text-base">
//           عدد الكلمات: <Text className="text-primary-color">{surah.words_count}</Text>
//         </Text>

//         <Text className="bg-[#edf0f4] px-5 py-2 rounded text-base">
//           عدد الحروف: <Text className="text-primary-color">{surah.letters_count}</Text>
//         </Text>
//       </View>
//     </View>
  





















// <View className="p-4 bg-green-600 m-2 rounded-lg">
          //   <Text className="text-2xl font-bold text-white text-center">
          //     {surah.name.en} ({surah.name.transliteration})
          //   </Text>
          //   <Text className="text-center text-white mt-1">
          //     {surah.revelation_place.en.toUpperCase()}
          //   </Text>
          //   <Text className="text-center text-sm text-gray-200 mt-1">
          //     {surah.verses_count} verses • {surah.words_count} words • {surah.letters_count} letters
          //   </Text>
          // </View>

          
          // <View className="space-y-2 bg-[#4db6ac] m-2 rounded-lg flex flex-col items-start p-4 gap-1">
          //   <Text className="text-3xl mx-auto font-bold text-white text-center mb-2">
          //     Surah {surah.name.transliteration}
          //   </Text>
          //   <Text className="text-white">Surah Name: {surah.name.transliteration}</Text>
          //   <Text className="text-white">Meaning: {surah.name.en}</Text>
          //   <Text className="text-white">Revelation Place: {surah.revelation_place.en}</Text>
          //   <Text className="text-white">Verses: {surah.verses_count}</Text>
          //   <Text className="text-white">Word Count: {surah.words_count}</Text>
          //   <Text className="text-white">Letter Count: {surah.letters_count}</Text>
          // </View>
