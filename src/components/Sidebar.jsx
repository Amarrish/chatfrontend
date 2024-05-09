import React, { useContext, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Component.css';
import { getuserApi } from '../Services/allApi';
import { userdataContext } from '../Context/Contextshare';
import useSidebarStore from '../Zustand/Zustandstate';
import { useSocketContext } from '../Context/SocketContext';

const Sidebar = () => {
  const { userdata } = useContext(userdataContext);
  const { sideusers, setSideUsers, selectuser, setselectuser } = useSidebarStore();
  const { onlineUsers } = useSocketContext();
  
  useEffect(() => {
    if (userdata) {
      async function fetchUsers() {
        try {
          const token = sessionStorage.getItem('token');
          const reqHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          };
          const { data } = await getuserApi(reqHeader);
          setSideUsers(data);
        } catch (error) {
          console.log('error in sidebarusers', error);
        }
      }
      fetchUsers();
    }
  }, [userdata, setSideUsers]);

  const handleUserClick = (user) => {
    setselectuser(user);
  };

  return (
    <>
      <div className="sidebar-container">
        <h2>Available Members</h2>
        <ListGroup className="listGroup">
          {sideusers.map((user) => (
            <ListGroup.Item
              key={user._id}
              user={user}
              className={`userdivelement`}
            >
              <div
                className={`userelements ${
                  selectuser && selectuser._id === user._id ? 'bg-success' : ''
                }`}
                onClick={() => handleUserClick(user)}
              >
                <img src={user.picture} alt="" />
                <div className="d-flex">
                  {onlineUsers.includes(user._id) ? (
                    <i className="fa-solid fa-location-dot m-1" style={{ color: '#27b300' }}></i>
                  ) : null}
                  <p>{user.username}</p>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default Sidebar;

// import React, { useContext, useEffect, useState } from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
// import './Component.css';
// import { getuserApi } from '../Services/allApi';
// import { userdataContext } from '../Context/Contextshare';
// import useSidebarStore from '../Zustand/Zustandstate';
// import { useSocketContext } from '../Context/SocketContext';

// const Sidebar = () => {
//   const { userdata, setUserdata } = useContext(userdataContext);
//   const { sideusers, setSideUsers } = useSidebarStore();
//   const {selectuser,setselectuser} = useSidebarStore()
//   const {onlineUsers} = useSocketContext();
//   const isOnline = onlineUsers.includes(userdata._id)
//   console.log('isonline',isOnline);
//   const Sidebarusers = async () => {
//     try {
//       const token = sessionStorage.getItem('token');
//       // console.log(token);
//       const reqHeader = {"Content-Type":"application/json", 'Authorization':`Bearer ${token}`}
//       const { data } = await getuserApi(reqHeader);
//       // console.log(data);
//       setSideUsers(data);
//     } catch (error) {
//       console.log('error in sidebarusers', error);
//     }
//   };

//   const handleUserClick = (user) => {
//     // setSelectedUser(user);
//     setselectuser(user)
//   };

//   // useEffect(() => {
//   //   // console.log(selectuser);
//   // }, [selectuser]);

//   useEffect(() => {
//     if (userdata)  Sidebarusers();
//   }, []);

//   return (
//     <>
//       <div className="sidebar-container">
//         <h2>Available Members</h2>
//         <ListGroup className="listGroup">
//           {sideusers.map((user) => (
//             <ListGroup.Item
//               key={user._id}
//               user={user}
//               className={`userdivelement`}
//             >
//               <div className={`userelements ${selectuser && selectuser._id === user._id ? 'bg-success' : ''}`} onClick={() => handleUserClick(user)}>

//                 <img src={user.picture} alt="" />
//                 <div className="d-flex">
//                   <p>
//                     {isOnline?<i className="fa-solid fa-location-dot m-1" style={{ color: '#27b300' }}></i>:null}
//                   </p>
//                   <p>{user.username}</p>
//                 </div>
//               </div>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




// const list = [
//     {
//         img:"https://frappecloud.com/files/user.png",
//         name:'Amarrish'
//     },
//     {
//         img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-hcsCwCe-ozBDrOgk6P2sa0WHHocfKSiNYT-8j8AYBELZQ0EbI5LvF_UVaCo6M37cHRY&usqp=CAU",
//         name:'Rizwan'
//     },
//     {
//         img:"https://cdn-icons-png.freepik.com/256/3237/3237472.png",
//         name:'Nizam'
//     },
//     {
//         img:"https://cdn-icons-png.freepik.com/256/4140/4140037.png",
//         name:'Jack'
//     }
//     ,
//     {
//         img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-hcsCwCe-ozBDrOgk6P2sa0WHHocfKSiNYT-8j8AYBELZQ0EbI5LvF_UVaCo6M37cHRY&usqp=CAU",
//         name:'Rizwan'
//     }
// ]