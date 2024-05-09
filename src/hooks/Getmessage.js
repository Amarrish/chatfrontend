import { useEffect, useState } from "react"
import useSidebarStore from "../Zustand/Zustandstate"
import { getmessageApi } from "../Services/allApi"

const Getmessage =()=>{
    const [loadings,setLoadings] = useState(false)
    const { selectuser,allmessages, setAllMessages } = useSidebarStore()

    const usegetmessage = async () => {
        if(!selectuser) return; 
        setLoadings(true);
        const token = sessionStorage.getItem('token');
        const reqHeader = {'Content-type':'application/json' , 'Authorization':`Bearer ${token}`}
        try {
            // const senderid = selectuser._id;
            const { data } = await getmessageApi(selectuser._id, reqHeader);
            setAllMessages(data)
            console.log('getmessage hook', data);
        } catch (error) {
            console.log('error in getmessage', error);
        } finally {
            setLoadings(false)
        }
    }

    useEffect(() => {
        if (selectuser && selectuser._id) usegetmessage();   
    }, [selectuser, setAllMessages]);

    return { loadings, allmessages};
}

export default Getmessage;
