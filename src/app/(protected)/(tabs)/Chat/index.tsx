import {ChannelList, Channel, MessageList, MessageInput, OverlayProvider} from 'stream-chat-expo'
import React from 'react'
import {router} from 'expo-router'

export default function ChatScreen(){
    //const [channel, setChannel] = useState();
    //console.log(channel)

    //if(channel){
      //  return <Channel channel={channel}>
        //    <MessageList />
          //  <MessageInput />
       // </Channel>
        
    //}
    return (

    <ChannelList 
    onSelect={(channel) => router.push('/channel/${channel.cid}')}
    />

    );
}