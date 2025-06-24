import { Slot, Stack } from "expo-router";
import { useEffect } from "react"
import { StreamChat} from "stream-chat"
import { ChannelList, Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";

const client = StreamChat.getInstance('6dvxg9x3awwd');

export default function ChatLayout() {
  useEffect(() => {
    const setup = async () => {
      if (!client.user) {
        await client.connectUser(
          {
            id: 'jlahey',
            name: 'Jim Lahey',
            image: 'https://i.imgur.com/fR9Jz14.png',
          },
          client.devToken('jlahey')
        );
        console.log('Connecting user...');
        console.log('Client user before connect:', client.userID);
      }
    };
    setup();
    console.log('Connected! Client user:', client.userID);
  }, []);
  return (
  <OverlayProvider>
    <Chat client={client}>
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown :false}} />
    </Stack>
    </Chat>
  </OverlayProvider>

  )
}