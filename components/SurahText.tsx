// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const SurahText = ({ index, versesInPage, updateTafsirVerses, handleLongPress, toArabic, tafsirVerses, fontSize= "25", }: any) => {



//   return (
//         <View key={index} className="mb-6">
//             <Text className="leading-loose text-black font-semibold text-center" style={{ 
//               fontSize,
//                fontFamily: 'hafs' }}>
//                 {versesInPage.map((verse: any) => (

//                     <Text
//                         key={verse.number}
//                         onPress={() => updateTafsirVerses(verse)}
//                         onLongPress={() => handleLongPress(verse)}
//                         className={`font-semibold ${tafsirVerses.find((v: any) => v.number == verse.number) && "bg-gray-200 px-3"
//                             }`}
//                         style={{
//                             fontFamily: 'hafs',
//                             fontSize,
//                             textAlign: 'center',
//                             direction: 'rtl',
//                             writingDirection: 'rtl',
//                             // lineHeight: fontSize * 1.6,
//                             maxWidth: '100%',
//                             flexShrink: 1, // ✅ يمنع خروج الرقم خارج السطر
//                         }}
//                     >
//                         {` ${verse.text.ar} `}
//                         <Text
//                             style={{
//                                 fontFamily: 'hafs',
//                                 color: '#4db6ac', // ✅ لون مختلف للرقم
//                                 fontWeight: 'bold',
//                             }}
//                         >
//                             {toArabic(verse.number)}&#1757;
//                         </Text>
//                     </Text>
//                 ))}
//             </Text>
//             <View className="mt-4 mb-2 border-t border-gray-300">
//                 <Text className="text-center w-full mt-1 bg-[#4db6ac] p-2 rounded-full text-white mx-auto">
//                     {versesInPage[0].page}
//                 </Text>
//             </View>
//         </View>
//     )
// }

// export default SurahText

// const styles = StyleSheet.create({})



















import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';

const SurahText = ({
    index,
    versesInPage,
    updateTafsirVerses,
    handleLongPress,
    toArabic,
    tafsirVerses,
    fontSize = 25,
    setFontSize,
}: any) => {
    // Shared value for current scale
    const scale = useSharedValue(1);
    const [showFontSize, setShowFontSize] = useState(false);


    // ✅ Adjust font size logic (runs on JS)
    const adjustFontSize = (current: number, scaleValue: number) => {
        let newSize = current;

        // if (scaleValue > 1.02) newSize = Math.min(current + 2, 45);
        // else if (scaleValue < 0.98) newSize = Math.max(current - 2, 15);


        if (scaleValue > 1.05) newSize = Math.min(fontSize + 3, 45); // ✅ step 3px
        else if (scaleValue < 0.95) newSize = Math.max(fontSize - 3, 15); // ✅ step 3px


        setFontSize(Number(newSize)); // ✅ Only numbers
        setShowFontSize(true); // show indicator temporarily

        setTimeout(() => setShowFontSize(false), 1000);
    };


    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            // ✅ Clamp the zoom scale between 0.8 and 1.2
            const limitedScale = Math.min(Math.max(e.scale, 0.9), 1.1);
            scale.value = limitedScale;
        })
        .onEnd(() => {
            // ✅ Call JS function safely using runOnJS
            runOnJS(adjustFontSize)(fontSize, scale.value);
            scale.value = 1;
        })




    // Optional: animated style (for visual feedback while pinching)
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <GestureDetector gesture={pinchGesture}>
            <Animated.View key={index} style={[styles.container, animatedStyle]}>
                <Text
                    className="leading-loose text-black font-semibold text-center"
                    style={{ fontSize, fontFamily: 'hafs' }}
                >
                    {versesInPage.map((verse: any) => (
                        // <Text
                        //   key={verse.number}
                        //   onPress={() => updateTafsirVerses(verse)}
                        //   onLongPress={() => handleLongPress(verse)}
                        //   className={`font-semibold ${
                        //     tafsirVerses.find((v: any) => v.number == verse.number)
                        //       ? 'bg-gray-200 px-3'
                        //       : ''
                        //   }`}
                        //   style={{
                        //     fontFamily: 'hafs',
                        //     fontSize,
                        //     textAlign: 'center',
                        //     direction: 'rtl',
                        //     writingDirection: 'rtl',
                        //     maxWidth: '100%',
                        //     flexShrink: 1,
                        //   }}
                        // >
                        //   {` ${verse.text.ar} `}
                        //   <Text
                        //     style={{
                        //       fontFamily: 'hafs',
                        //       color: '#4db6ac',
                        //       fontWeight: 'bold',
                        //     }}
                        //   >
                        //     {toArabic(verse.number)}&#1757;
                        //   </Text>
                        // </Text>
                        <Text
                            key={verse.number}
                            onPress={() => updateTafsirVerses(verse)}
                            onLongPress={() => handleLongPress(verse)}
                            className={`font-semibold ${tafsirVerses.find((v: any) => v.number == verse.number)
                                    ? 'bg-gray-200 px-3'
                                    : ''
                                }`}
                            style={{
                                fontFamily: 'hafs',
                                fontSize,
                                textAlign: 'center',        // center the whole text
                                writingDirection: 'rtl',    // ensures RTL is respected
                                maxWidth: '100%',
                                flexShrink: 1,
                                // lineHeight: fontSize * 1.5, // optional: improves readability
                            }}
                        >
                            {" "}{verse.text.ar}{" "}
                            <Text
                                style={{
                                    fontFamily: 'hafs',
                                    color: '#4db6ac',
                                    fontWeight: 'bold',
                                    writingDirection: 'rtl',   // enforce RTL for number
                                    textAlign: 'center',       // center the number
                                }}
                            >
                                {toArabic(verse.number)}&#1757;
                            </Text>
                        </Text>

                    ))}
                </Text>

                <View className="mt-4 mb-2 border-t border-gray-300">
                    <Text className="text-center w-full mt-1 bg-[#4db6ac] p-2 rounded-full text-white mx-auto">
                        {versesInPage[0].page}
                    </Text>
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

export default SurahText;

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
});















// <Text
//   key={verse.number}
//   onPress={() => updateTafsirVerses(verse)}
//   onLongPress={() => handleLongPress(verse)}
//   className={`font-semibold ${tafsirVerses.find((v) => v.number == verse.number) && "bg-gray-200 px-3"}`}
//   style={{ fontFamily: 'hafs', fontSize }}
// >
//   {verse.text.ar}
//   <Text className="text-[#4db6ac] font-bold" style={{ fontFamily: 'hafs' }}>
//     {" "}{toArabic(verse.number)}&#1757;{" "}
//   </Text>
// </Text>

// <Text
//   key={verse.number}
//   onPress={() => updateTafsirVerses(verse)}
//   onLongPress={() => handleLongPress(verse)}
//   className={`font-semibold ${tafsirVerses.find((v) => v.number == verse.number) && "bg-gray-200 px-3"}`}
//   style={{
//     fontFamily: 'hafs',
//     fontSize,
//     direction: 'rtl',
//     writingDirection: 'rtl',
//     textAlign: 'center',
//     // lineHeight: fontSize * 1.6,
//     includeFontPadding: false,
//   }}
// >

//   {" " +  verse.text.ar + " " }
//   <Text
//     style={{
//       fontFamily: 'hafs',
//       color: '#4db6ac',
//       fontWeight: 'bold',
//       direction: 'rtl',
//       writingDirection: 'rtl',
//     }}
//   >
//   {toArabic(verse.number)}&#1757;
//   </Text>
// </Text>

