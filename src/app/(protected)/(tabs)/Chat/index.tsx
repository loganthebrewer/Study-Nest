import {ChannelList, Channel, MessageList, MessageInput, OverlayProvider} from 'stream-chat-expo'
import React from 'react'
import {router} from 'expo-router'

export default function ChatScreen(){
    return (
    <ChannelList 
    onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />

    );
}
// I added back ticks to my router push path