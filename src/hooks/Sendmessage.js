import { useState } from "react"
import useSidebarStore from "../Zustand/Zustandstate"
import { sendmessageApi } from "../Services/allApi"

const Sendmessage = ()=>{
    const [loading,setLoading] = useState(false)
    const {selectuser,setAllMessages,allmessages} = useSidebarStore()
    // console.log('sendmessage',allmessages);

    const usersendmessage = async(message)=>{
        setLoading(true)
       
        const token = sessionStorage.getItem('token')
        // console.log('token',token);
        const reqHeader = {'Content-type': 'application/json', 'Authorization': `Bearer ${token}`}
        // const selectuserid = selectuser._id;
        try {
           
            const reqbody = {message};

            const {data} = await sendmessageApi(selectuser._id,reqbody,reqHeader);
            // setAllMessages((prevstate)=>[...prevstate,data])
            setAllMessages([...allmessages,data])
        } catch (error) {
            console.log('error in sendmessage',error);
        } finally{
            setLoading(false)
        }
    }
    return {usersendmessage,loading}
}
export default Sendmessage;