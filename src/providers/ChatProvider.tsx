import { PropsWithChildren, useState } from "react";

import { Slot, Stack } from "expo-router";
import { useEffect } from "react"
import { StreamChat} from "stream-chat"
import { ChannelList, Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@/app";

//import the hook so we can get user session details

const client = StreamChat.getInstance("6dvxg9x3awwd");

export default function ChatProvider({children}: PropsWithChildren){
  const [isReady, setIsReady] = useState(false);

  const { user } = useAuth();

  // Debugging check log
  console.log(user);


    useEffect(() => {
        const connect = async () => {
          if (!client.user) {
            await client.connectUser(
              {
                id: 'jlahey',
                name: 'Jim Lahey',
                image: 'https://i.imgur.com/fR9Jz14.png',
              },
              client.devToken('jlahey')
            );
            setIsReady(true);
            console.log('Connecting user...');
            console.log('Client user before connect:', client.userID);
          }
        };
        connect();
        console.log('Connected! Client user:', client.userID);
        
        //clean up function
        
        return () => {
          client.disconnectUser();
          setIsReady(false);
        }
      }, []);
     /* if(!isReady){
        return < ActivityIndicator />
      }*/
    return (
        <OverlayProvider>
        <Chat client={client}>{children}</Chat>
        </OverlayProvider>

    )
}