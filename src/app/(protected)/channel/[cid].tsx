import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, MessageList, MessageInput, useChatContext } from 'stream-chat-expo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      if (!cid || !cid.includes(':')) {
        console.warn("Invalid cid:", cid);
        return;
      }

      const [type, id] = cid.split(':');

      try {
        const channel = client.channel(type, id);
        await channel.watch(); 
        setChannel(channel);
      } catch (error) {
        console.error("Failed to fetch channel:", error);
      }
    };

    fetchChannel();
  }, [cid]); 

  if (!client || !client.userID) {
    return <ActivityIndicator />;
  }

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <SafeAreaView edges={['bottom']}>
      <MessageInput />
      </SafeAreaView>
    </Channel>
  );
}

/*import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import {Channel as ChannelType} from 'stream-chat'
import{Channel, MessageList,MessageInput, useChatContext, ChannelList} from 'stream-chat-expo'
import { StreamChat} from "stream-chat"


export default function ChannelScreen(){
    const [channel, setChannel] = useState<ChannelType | null>(null)
    const { cid } = useLocalSearchParams<{cid: string}>();

    const { client } = useChatContext();

    useEffect(() => {
        const fetchChannel = async () => {
            //const channels = await client.queryChannels({cid});
            if(!cid) return;
            const [type, id] = cid.split(':');
            const channel = client.channel(type, id);
            await channel.watch();
              
            setChannel(channel)
        };
        fetchChannel();
       
    }, [cid])
    

    if(!channel){
        return<ActivityIndicator />
    }

    return (
        <Channel channel={channel}>
            <MessageList />
            <MessageInput />
        </Channel>

        
    );
}*/