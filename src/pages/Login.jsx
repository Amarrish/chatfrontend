import React, { useContext, useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import './Page.css'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginApi } from '../Services/allApi';
import { useNavigate } from 'react-router-dom'
import {userdataContext} from '../Context/Contextshare'


const Login = () => {
  const [userinfo,setUserinfo] = useState({
    email:'',
    password:''
  });

const {userdata,setUserdata} = useContext(userdataContext)
  const[logininfo,setlogininfo] = useState('')
  const [loading,setloading] = useState(false)
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    const { email, password } = userinfo;

    try {
      if (!email || !password) {
        toast.error('Please fill in the credentials');
      } else {
        const response = await loginApi({ email, password });

        if (response.status === 200) {
          toast.success('Login account successfully');

          // Update the context value
          setUserdata(response.data.existingUser);
          sessionStorage.setItem('token', response.data.token)
          navigate('/chat')
          // Log the updated value in the useEffect
          setUserinfo({ email: '', password: '' });
        }
      }
    } catch (error) {
      toast.error(error.response.data);
      console.log('Login error:', error);
    }
  };

  useEffect(() => {
    console.log('Updated Userdata:', userdata);
  }, [userdata]);

  return (
    <>
    <Container className='login-container'>
      <Row className='login-row'>
        <Col className='login-col' sm={6} md={6} lg={6} xl={6}>
          <div className='login-img'>
            <img className='img-fluid' src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg" alt="" />
          </div>
        </Col>


        <Col sm={6} md={6} lg={6} xl={6}>
          <div className='form-container'>
            <form action="" className='form'>
          <label>Email:
          <input type="text" name="email" placeholder='Email' onChange={(e)=>setUserinfo({...userinfo,email:e.target.value})}/>
          </label>

          <label>Password:
          <input type="password" name="password" placeholder='Password' onChange={(e)=>setUserinfo({...userinfo,password:e.target.value})} />
          </label>
          </form>

          <button className='btn' onClick={handlelogin} >{loading?'logging in ....':'Login'}</button>

          </div>

          <div className='create-acc'>
            <p>Don't Have an Account ? Register here !!! <Link to={'/signup'}>Create an account</Link></p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Login