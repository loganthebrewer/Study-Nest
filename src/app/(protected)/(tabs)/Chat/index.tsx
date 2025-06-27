import {ChannelList, Channel, MessageList, MessageInput, OverlayProvider} from 'stream-chat-expo'
import React from 'react'
import {router} from 'expo-router'
import { useAuth } from '@/app';

export default function ChatScreen(){
    const { profile } = useAuth();
    return (
    <ChannelList 
    filters={{members: {$in:[profile.id]} }}
    onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />

    );
}
// I added back ticks to my router push path