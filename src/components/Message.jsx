import React, { useContext } from 'react'
import './Component.css'
import Getmessage from '../hooks/Getmessage'
import 'react-loading-skeleton/dist/skeleton.css'
import { userdataContext } from '../Context/Contextshare'
import useSidebarStore from '../Zustand/Zustandstate'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { extractTime } from '../utils/extractime'



const Message = ({msg}) => {
  const {userdata} = useContext(userdataContext)
  const {selectuser} = useSidebarStore()
  const fromMe = msg.senderId===userdata._id;
  const formattedtime = extractTime(msg.createdAt)
  // console.log(selectuser);
  const {loadings} = Getmessage()
  // console.log('in messages',messages);
  const chatuser = fromMe?'justify-content-end':'justify-content-start '
  const shakeClass = msg.shouldShake? 'shake':''


  return (
    <>
     {
  loadings ? (
    <SkeletonTheme baseColor="#d1e5f0" highlightColor="#ede9f5"  >
    <p>
      <Skeleton count={3} />
    </p>
  </SkeletonTheme>
  ) : (

      <div className={`msg-container ${chatuser}`}>
        <>
          {fromMe ? (
            <>
            <div className='msg-containerset'>
            <div className='d-flex'>
              <p className='bg-info'>{msg.message}</p>
              <img alt='img'
                src={
                  userdata ? userdata.picture : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
                }
              ></img>
              </div>
              <div className=''><p className='text-dark' style={{ textAlign: 'end',fontSize:'10px' }}>{formattedtime}</p></div>
              </div>
            </>
          ) : (
            <>
             <div className='msg-containerset'>
             <div className='d-flex'>
              <img alt='img'
                src={ 
                  selectuser ? selectuser.picture : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
                }
              ></img>
              <p className='bg-success' >{msg.message}</p>
              </div>
              <div className=''><p className='text-dark' style={{ textAlign: 'start',fontSize:'10px' }}>{formattedtime}</p></div>
              </div>
            </>
          )}
        </>
      </div>
      
    
  )
}
   
    </>
  )
}

export default Message