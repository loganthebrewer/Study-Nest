import ChatProvider from "@/providers/ChatProvider";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "src/providers/AuthProvider";

import { Button } from "react-native";

export default function ChatLayout() {
  const { user } = useAuth();
  if(!user){
    return <Redirect href="/(auth)/LoginPage" />
  }
  return(
      <ChatProvider>
        <Stack
        screenOptions={{
          headerShown: false,
        }}
        >
          <Stack.Screen
          name="(tabs)"
          options={{
            title: "",
            headerShown: false
          }}
          />
      </Stack>
    </ChatProvider>
  )
}