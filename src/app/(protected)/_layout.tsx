import ChatProvider from "@/providers/ChatProvider";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "..";
import { Stack } from "expo-router";
import { Button } from "react-native";

export default function ChatLayout() {
  const { user } = useAuth();
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