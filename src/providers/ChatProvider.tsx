import { PropsWithChildren, useState } from "react";

import { Slot, Stack } from "expo-router";
import { useEffect } from "react"
import { StreamChat} from "stream-chat"
import { ChannelList, Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@/app";

import { supabase } from '@/lib/supabase'

//import the hook so we can get user session details

const client = StreamChat.getInstance("6dvxg9x3awwd");

export default function ChatProvider({children}: PropsWithChildren){
  const [isReady, setIsReady] = useState(false);

  const { profile } = useAuth();

  // Debugging check log
  //console.log(profile);


    useEffect(() => {
        const connect = async () => {
          if(!profile){
            return;
          }
            await client.connectUser(
              {
                id: profile.id,
                name: profile.full_name,
                image: supabase.storage.from('avatars')
                .getPublicUrl(profile.avatar_url)
                .data.publicUrl,
              },
              client.devToken(profile.id)
            );
            setIsReady(true);
            console.log('Connecting user...');
            console.log('Client user before connect:', client.userID);
          
        };
        connect();
        console.log('Connected! Client user:', client.userID);
        
        //clean up function
        
        return () => {
          if(isReady){
            client.disconnectUser();
          }
          setIsReady(false);
        }
      }, [profile?.id]);
     /* if(!isReady){
        return < ActivityIndicator />
      }*/
    return (
        <OverlayProvider>
        <Chat client={client}>{children}</Chat>
        </OverlayProvider>

    )
}