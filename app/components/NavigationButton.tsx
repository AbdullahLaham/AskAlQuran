import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const NavigationButtons = ({ nloading, prevId, prevSurah, nextId, nextSurah, language }: any) => {
    return (
        <View>
  {!nloading && (
    language == "ar" ? (
      <View
      className={`flex justify-between items-center p-4 bg-white border-t border-gray-200  flex-row-reverse`}
    >
      

      {nextId && nextSurah && (
        <Pressable
          onPress={() => router.push(`/surah/${nextId}`)}
          className="border border-[#4db6ac] px-4 py-2 rounded-xl ml-auto"
        >
          <Text className="font-bold text-[#4db6ac]">
            {nextSurah.name.ar} ▶▶
          </Text>
        </Pressable>
      )}
      
      {prevId && prevSurah && (
        <Pressable
          onPress={() => router.push(`/surah/${prevId}`)}
          className="border border-[#4db6ac] px-4 py-2 rounded-xl"
        >
          <Text className="font-bold text-[#4db6ac]">
            ◀◀ {prevSurah.name.ar}
          </Text>
        </Pressable>
      )}
    </View>
      
    ) : (
      <View
      className={`flex flex-row  justify-between items-center p-4 bg-white border-t border-gray-200`}
    >
      {prevId && prevSurah && (
        <Pressable
          onPress={() => router.push(`/surah/${prevId}`)}
          className="border border-[#4db6ac] px-4 py-2 rounded-xl"
        >
          <Text className="font-bold text-[#4db6ac]">
            {prevSurah.name.transliteration} ◀◀
          </Text>
        </Pressable>
      )}

      {nextId && nextSurah && (
        <Pressable
          onPress={() => router.push(`/surah/${nextId}`)}
          className="border border-[#4db6ac] px-4 py-2 rounded-xl ml-auto"
        >
          <Text className="font-bold text-[#4db6ac]">
            ▶▶ {nextSurah.name.transliteration}
          </Text>
        </Pressable>
      )}
    </View>

    )

    
  )}
</View>

    )
}

export default NavigationButtons

const styles = StyleSheet.create({})