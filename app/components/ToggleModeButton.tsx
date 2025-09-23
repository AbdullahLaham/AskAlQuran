import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ToggleModeButton = ({toggleMode, translateViewX}: any) => {
  return (
    <View>
      <TouchableOpacity
          onPress={toggleMode}
          className="w-20 h-10 mx-auto mt-1 rounded-full flex-row items-center px-1 relative border bg-[#4db6ac]/20 border-[#4db6ac]"
          activeOpacity={0.8}
        >
          {/* النصوص */}
          <Text className="absolute left-2 text-lg font-bold">📖</Text>
          <Text className="absolute right-2 text-lg font-bold">🌐</Text>

          {/* الدائرة المتحركة */}
          <Animated.View
            className="w-8 h-8 bg-[#4db6ac]/20 rounded-full shadow border border-[#4db6ac]"
            style={{
              transform: [{ translateX: translateViewX }],
            }}
          />
        </TouchableOpacity>
    </View>
  )
}

export default ToggleModeButton

const styles = StyleSheet.create({})