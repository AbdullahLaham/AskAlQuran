// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const mainColor = '#4db6ac';

// export default function ChatScreen() {
//   const [messages, setMessages] = useState([
//     { id: '1', sender: 'ai', text: 'مرحبًا 👋، أرسل لي آية من القرآن وسأعطيك تفسيرها.' },
//   ]);
//   const [input, setInput] = useState('');
//   const flatListRef = useRef(null);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { id: Date.now().toString(), sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');

//     // Scroll to bottom after user sends
//     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

//     // Fake AI response simulation
//     setTimeout(() => {
//       const fakeResponse = {
//         id: (Date.now() + 1).toString(),
//         sender: 'ai',
//         text: `📖 التفسير: هذه الآية تتحدث عن معنى جميل يوضح رحمة الله وحكمته.`,
//       };
//       setMessages((prev) => [...prev, fakeResponse]);
//       setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//     }, 1000);
//   };

//   const renderMessage = ({ item }) => (
//     <View
//       className={`m-2 p-3 rounded-2xl max-w-[80%] ${item.sender === 'user' ? 'self-end bg-teal-500' : 'self-start bg-gray-100'
//         }`}
//       style={item.sender === 'user' ? { backgroundColor: mainColor } : {}}
//     >
//       <Text className={`${item.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
//         {item.text}
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-white">

//       {/* Header */}
//       <View
//         className="flex-row items-center justify-center py-4 shadow-sm"
//         style={{ backgroundColor: mainColor }}
//       >
//         <Text className="text-white text-lg font-semibold">تفسير الآيات - AI</Text>
//       </View>

//       {/* Chat messages */}
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={renderMessage}
//         contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 8 }}
//         showsVerticalScrollIndicator={false}
//         onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//       />

 
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
//         <View className="flex-row items-center bg-gray-800 p-3 mb-[.5rem]">
//           <TextInput
//             className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-right"
//             placeholder="أدخل آية أو سؤال..."
//             value={input}
//             onChangeText={setInput}
//             multiline
//           />
//           <TouchableOpacity
//             className="ml-2 p-2 rounded-full"
//             style={{ backgroundColor: mainColor }}
//             onPress={handleSend}
//           >
//             <Ionicons name="send" size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }




import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const mainColor = '#4db6ac';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'ai', text: 'مرحبًا 👋، أرسل لي آية من القرآن وسأعطيك تفسيرها.' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Scroll down
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    // Fake AI response
    setTimeout(() => {
      const fakeResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: '📖 التفسير: هذه الآية تتحدث عن معنى جميل يوضح رحمة الله وحكمته.',
      };
      setMessages((prev) => [...prev, fakeResponse]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200);
  };

  const renderMessage = ({ item }) => (
    <View
      className={`m-2 p-3 rounded-2xl max-w-[80%] ${
        item.sender === 'user'
          ? 'self-end bg-teal-500'
          : 'self-start bg-gray-100'
      }`}
      style={item.sender === 'user' ? { backgroundColor: mainColor } : {}}
    >
      <Text className={`${item.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View
        className="flex-row items-center justify-center py-4 shadow-sm"
        style={{ backgroundColor: mainColor }}
      >
        <Text className="text-white text-lg font-semibold">تفسير الآيات - AI</Text>
      </View>

      {/* Chat list (auto adjusts for keyboard) */}
      <KeyboardAwareFlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 8 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
      />

      {/* Input field */}
      <View className="flex-row items-center p-3 border-t border-gray-200 bg-white">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-right"
          placeholder="أدخل آية أو سؤال..."
          value={input}
          onChangeText={setInput}
          multiline
          blurOnSubmit={false}
        />
        <TouchableOpacity
          className="ml-2 p-2 rounded-full"
          style={{ backgroundColor: mainColor }}
          onPress={handleSend}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}




// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
// import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

// export default function App() {
//   const [fontSize, setFontSize] = useState(16); // React state for font size
//   const scale = useSharedValue(1); // Reanimated shared value

//   // Function to update React state
//   const updateFontSize = (newSize) => {
//     setFontSize(newSize);
//   };

//   // Pinch gesture
//   const pinchGesture = Gesture.Pinch()
//     .onUpdate((e) => {
//       scale.value = e.scale; // Update scale
//     })
//     .onEnd(() => {
//       // Clamp scale between 1 and 3
//       scale.value = Math.min(Math.max(scale.value, 1), 3);
//     })
//     .onChange(() => {
//       const newSize = 16 * scale.value;
//       runOnJS(updateFontSize)(newSize); // Update React state
//     });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       fontSize: withTiming(16 * scale.value),
//     };
//   });

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <GestureDetector gesture={pinchGesture}>
//         <Animated.View style={styles.textContainer}>
//           <Animated.Text style={[styles.quranText, animatedStyle]}>
//             ﷽
//             {"\n"}
//             إِنَّ اللّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ
//             {"\n"}
//             يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا
//           </Animated.Text>
//           <Text style={styles.infoText}>
//             Current Font Size: {Math.round(fontSize)}
//           </Text>
//         </Animated.View>
//       </GestureDetector>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   textContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   quranText: {
//     textAlign: 'center',
//     lineHeight: 35,
//   },
//   infoText: {
//     marginTop: 20,
//     fontSize: 16,
//   },
// });
