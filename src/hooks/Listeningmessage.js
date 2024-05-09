

import  { useEffect } from 'react'
import { useSocketContext } from '../Context/SocketContext'
import useSidebarStore from '../Zustand/Zustandstate';
import notificationsound from '../Assets/iphone_sound.mp3'

const Listeningmessage = () => {
 const {socket} = useSocketContext();
 const {allmessages,setAllMessages} = useSidebarStore();

 useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        const sound = new Audio(notificationsound)
        sound.play();
        setAllMessages([...allmessages, newMessage]);
    });

    return () =>socket?.off("newMessage");
 },[socket,setAllMessages,allmessages])
}

export default Listeningmessage