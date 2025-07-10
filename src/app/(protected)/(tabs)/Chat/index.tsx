import React from 'react';
import { ChannelList } from 'stream-chat-expo';
import { Stack, router, Link } from 'expo-router';
import { useAuth } from 'src/app';
import { View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ChatScreen() {
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Chats',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Link href="/(protected)/CreateGroupChat/CreateGroup" asChild>
                <FontAwesome5
                  name="users"
                  size={20}
                  color="gray"
                  style={{ marginHorizontal: 15 }}
                />
              </Link>

              
              <Link href="/(protected)/users" asChild>
                <FontAwesome5
                  name="user-plus"
                  size={20}
                  color="gray"
                  style={{ marginRight: 15 }}
                />
              </Link>
            </View>
          ),
        }}
      />
      
      <ChannelList
        filters={{ members: { $in: [user.id] } }}
        sort={{ last_message_at: -1 }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}

/*import {ChannelList} from 'stream-chat-expo'
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
            title: 'Chats',
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
*/