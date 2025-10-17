import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLanguageStore } from '@/store/useLanguageStore';
import { icons } from '@/constants';
import { router } from 'expo-router';

const MainHeader = ({ navigation, route, options }: any) => {

    const { language, toggleLanguage } = useLanguageStore();
      const translateX = useRef(new Animated.Value(language === "ar" ? 0 : 32)).current;

    const ChangeLanguage = () => {
        const newLang = language === "ar" ? "en" : "ar";
    
        toggleLanguage(newLang);
    
        Animated.timing(translateX, {
          toValue: newLang === "ar" ? 0 : 32,
          duration: 350,
          useNativeDriver: true,
        }).start();
      };
  return (
    <View  className={`flex-row items-center justify-between bg-[#edf0f4] mt-8  bg-gradient-to-r from-blue-600 to-purple-500 h-16 px-4 shadow-lg ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Left: Hamburger */}
              <TouchableOpacity onPress={() => navigation.toggleDrawer()} className=' rounded-md h-10 w-10 items-center justify-center'>
                <Ionicons name="menu" size={33} color="black" />
              </TouchableOpacity>
  
              {/* Center: Title */}
              {/* <Text className="text-white text-lg font-bold">
                {options.title ?? route.name}
              </Text> */}
  
              {/* Right: Profile Avatar */}
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
                      <TouchableOpacity onPress={() => router.push("/")}>
                        <Image source={icons.icon} style={{ width: 45, height: 45, borderRadius: 50 }} />
                      </TouchableOpacity>
              
            </View>
  )
}

export default MainHeader;

const styles = StyleSheet.create({})









