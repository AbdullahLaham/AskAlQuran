import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, router } from 'expo-router'

import { I18nManager } from 'react-native';
import { useFonts } from 'expo-font';





// import * as Updates from 'expo-updates';


// I18nManager.forceRTL(true); // فرض الاتجاه من اليمين إلى اليسار
// I18nManager.allowRTL(true); // السماح بالتبديل إلى RTL إذا كانت اللغة تدعمه

// const isRTL = Localization.isRTL; // التحقق مما إذا كانت اللغة الحالية RTL

const Home = () => {
  useEffect(() => {
    // Force app to stay LTR
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }, []);

   I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);


  return <Redirect href="/home" />
  
}

export default Home

const styles = StyleSheet.create({});

