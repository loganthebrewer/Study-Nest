import ChatProvider from "@/providers/ChatProvider";
import { Stack } from "expo-router";

export default function ChatLayout() {
  
  return (
  
      <ChatProvider>
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown :false}} />
    </Stack>
    </ChatProvider>
  

  )
}