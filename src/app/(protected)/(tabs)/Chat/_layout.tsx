/*import { Slot, Stack } from "expo-router";
import { useEffect } from "react"
import { StreamChat} from "stream-chat"
import { ChannelList, Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";

const client = StreamChat.getInstance('6dvxg9x3awwd');

export default function ChatLayout() {
useEffect(() => {
  const connect = async () =>{
    await client.connectUser(
      {
        id: "jlahey",
        name: "Jim Lahey",
        image: "https://i.imgur.com/fR9Jz14.png",
      },
      client.devToken("jlahey"),
    );
  //  const channel = client.channel('messaging', 'the_park', {
   //   name: 'The Park',
 //   });
   // await channel.watch();
  }
  connect();
})
  return (
  <OverlayProvider>
    <Chat client={client}>
    <Slot />
    </Chat>
  </OverlayProvider>

  )
}*/