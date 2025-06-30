import {ChannelList} from 'stream-chat-expo'
import React from 'react'
import {Stack, router, Link} from 'expo-router'
import { useAuth } from 'src/app';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ChatScreen(){
    const { user } = useAuth();
   // const { profile } = useAuth();
    return (
        <>
        <Stack.Screen 
            options={{
            headerRight: () => (
                <Link href={"/(protected)/users"} asChild>
            <FontAwesome5 name="users" 
            size={24} 
            color="gray" 
            style={{marginHorizontal: 15}} 
            />
            </Link>
            )
    }}  
/>
    <ChannelList 
    filters={{members: {$in: [user.id] } }}
    onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
    </>

    );
}
// I added back ticks to my router push path