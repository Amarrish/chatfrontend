import { createContext, useContext, useEffect, useState } from "react"
import { userdataContext } from "./Contextshare";
import  io  from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () =>{
    return useContext(SocketContext);
}
const SocketContextProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([])
    const {userdata} = useContext(userdataContext);

    useEffect(()=>{
    if (userdata){
        const socketio = io('http://localhost:5000',{
            query: {
                userId: userdata._id,
            },
        });
        setSocket(socketio);

        socketio.on('getOnlineUsers', (users)=>{
            setOnlineUsers(users)
        });
        return  () => socketio.close();

    }else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
},[userdata]);

return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
    
}
export default SocketContextProvider


