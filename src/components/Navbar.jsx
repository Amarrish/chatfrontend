import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Component.css';
import propic from '../Assets/propic.png'
import { logoutApi } from '../Services/allApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast'
import { userdataContext } from '../Context/Contextshare';

const Navbar = () => {
  const {userdata,setUserdata} = useContext(userdataContext)
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
  },)

  const handlelogout = async () => {
    try {
     const res = await logoutApi()
     toast.success(res.data.message);
     if(res.status===200){
      localStorage.removeItem('existed-user')
      sessionStorage.removeItem('token')
      setUserdata('')
      handleClose()
     }
     navigate('/')
    } catch (error) {
      console.error("Error in handlelogout:", error);
      // Handle the error, show an error message to the user, or redirect to a login page
    }
  }
// console.log("navbar",userdata);
  return (
    <>
      <div className='navbar align-items-center d-flex justify-content-between p-2 w-100 position-fixed'>
        <div>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <h1>Chats <img src="https://images.squarespace-cdn.com/content/v1/585a4892bebafba69928fcd7/1569456329941-I7YL6AFWY00O6Q83ICGK/heart_chat_preview.gif?format=1000w" alt="" />
            </h1>
          </Link>
        </div>

        <div className='navrigtems'>
          {userdata ? (
            <div className='online'>
              {userdata.picture ? (
                <img src={userdata.picture} alt="propic" />
              ) : ( 
                <img src={propic} alt="default propic" />
               )} 
              <p><i className="far fa-circle-dot"></i>online</p>
            </div>
           ) : null} 
          
           {userdata ? ( 
            <Link style={{ textDecoration: 'none' }}>
              <p className='btn' onClick={handleShow} >Logout <i class="fa-solid fa-arrow-right-from-bracket fa-beat-fade fa-flip-vertical fa-lg"></i></p>
            </Link>
           ) :  
          <Link to={'/login'} style={{ textDecoration: 'none' }}>
          <p className='btn'>Login <i class="fa-regular fa-user fa-bounce fa-flip-horizontal"></i></p>
        </Link>
         } 
        </div>
      </div>

      <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body  className='bg-secondary text-white'>
          Are you sure want to logout
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handlelogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
      </>
    </>
  );
}

export default Navbar;




