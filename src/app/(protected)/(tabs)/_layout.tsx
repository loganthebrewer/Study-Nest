import { FontAwesome } from "@expo/vector-icons";
import { router, Tabs, Link } from "expo-router";
import React from "react";
import { Button, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import Entypo from '@expo/vector-icons/Entypo';


export default function TabsLayout() {

  // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;

  }


  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarInactiveTintColor: useColorScheme() === 'dark' ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault,
        tabBarActiveTintColor: useColorScheme() === 'dark' ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected,
      }}
    >
      <Tabs.Screen
        name="index"

        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => (
            <Button title="Profile" onPress={() => router.push("/(protected)/(tabs)/Profile")} />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen name="Profile" options={
        {
          title: 'Profile',
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }
      } />
      <Tabs.Screen name="Chat/index" options={
        {

        title: 'Chat',
        headerShown: true,
        tabBarIcon: ({color}) => <TabBarIcon name="wechat" color={color} />
        
        }
      } />
    </Tabs>
  );
}