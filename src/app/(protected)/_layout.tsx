import ChatProvider from "@/providers/ChatProvider";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "..";

export default function ChatLayout() {
  
  const { user } = useAuth();

  // this is to redirect user back to login
  /*if (!user){
    return <Redirect href="/(auth)" />
  }*/
  return (
  
      <ChatProvider>
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown :false}} />
    </Stack>
    </ChatProvider>
  

  )
}