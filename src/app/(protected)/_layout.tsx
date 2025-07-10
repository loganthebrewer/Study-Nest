import ChatProvider from "@/providers/ChatProvider";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "..";

export default function ChatLayout() {
  
  const { user } = useAuth();

  return (
  
      <ChatProvider>
    <Stack>
        <Stack.Screen 
        name="(tabs)" 
        options={{headerShown :false
          
        }} />
    </Stack>
    </ChatProvider>
  

  )
}