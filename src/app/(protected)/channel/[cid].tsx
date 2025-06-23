import { useLocalSearchParams } from 'expo-router'
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
            const channels = await client.queryChannels({cid});
            setChannel(channels[0])
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
}