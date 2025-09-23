
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from "@/constants";

// Import your screens
import HomeScreen from './home';
// import PricesScreen from './prices';
// import RidesScreen from './rides';
// import ChatScreen from './chat';
// import ProfileScreen from './profile';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();









function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}  contentContainerStyle={{ flex: 1 }}   >
      <View className="flex-1 bg-white ">
        {/* Top: Profile Section */}
        <View className="items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 py-6">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            className="w-20 h-20 rounded-full mb-2"
          />
          <Text className="text-black text-lg font-semibold">John Doe</Text>
          <Text className="text-black text-sm">johndoe@example.com</Text>
        </View>

        {/* Drawer Items */}
        <DrawerItemList {...props} />

        {/* Custom Logout Button */}
        <TouchableOpacity
          onPress={() => console.log('Logout')}
          className="flex-row items-center p-4 mt-auto border-t border-gray-200"
        >
          <Ionicons name="log-out-outline" size={24} color="gray" />
          <Text className="ml-3 text-base text-gray-700">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

// 🟢 Drawer Layout
export default function Layout() {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // headerStyle: { backgroundColor: '#005834', height: 50, display: 'flex', padding: 0, },
        header: ({ navigation, route, options }) => (
          <View className="flex-row items-center justify-between bg-black bg-gradient-to-r from-blue-600 to-purple-500 h-16 px-4 shadow-lg">
            {/* Left: Hamburger */}
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>

            {/* Center: Title */}
            <Text className="text-white text-lg font-bold">
              {options.title ?? route.name}
            </Text>

            {/* Right: Profile Avatar */}
            <Image
              source={{ uri: '' }} // Replace with your image
              className="w-8 h-8 rounded-full"
            />
          </View>
        ),
        headerTintColor: 'white',
        drawerStyle: { width: 250 },

        // drawerType: 'front',        // خلي الدروار يطلع من الأمام
        drawerPosition: "left",   // 🟢 يخلي الدروار يفتح من اليسار
        overlayColor: 'transparent' // أو جرب "rgba(0,0,0,0.5)" إذا بدك تغطية كاملة
      }}
    >

      
      {/* The Tabs as a single Drawer entry */}
      <Drawer.Screen name="Tabs" component={HomeScreen} options={{ title: 'الصفحة الرئيسيه' }} />
      {/* <Drawer.Screen name="Rides" component={RidesScreen} options={{ title: 'الرحلات' }} />
      <Drawer.Screen name="Chat" component={ChatScreen} options={{ title: 'المحادثة' }} />
      <Drawer.Screen name="Prices" component={PricesScreen} options={{ title: '🛒 السلة' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'الملف الشخصي' }} />
      <Drawer.Screen name="newVendor" component={newVendorScreen} options={{ title: ' انضم ك مزود' }} /> */}

      {/* Optional: Add more direct Drawer Screens if needed */}
      {/* 
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      */}
    </Drawer.Navigator>
  );
}

































const styles = StyleSheet.create({
  tabIconContainer: {
    width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25,
  },

  tabIconFocused: {
    backgroundColor: '#bba12d',
  },
  
  tabIconImage: {
    width: 30, height: 30, tintColor: 'white',
  },
});
