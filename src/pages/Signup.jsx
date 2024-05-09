import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import { Link } from 'react-router-dom'
import propic from '../Assets/propic.png'
import './Page.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { registerAPI } from '../Services/allApi'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [userinfo,setUserinfo] = useState({
    email:'',
    username:'',
    password:'',
    picture:''
  })

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const[cloudimg,setCloudimg] = useState('')

  const preset_key = 'iar9psra';
  const cloud_name = 'dfsoxz5ua';

  const cloudloadimg = async () => {
    const { picture } = userinfo;
    if (!picture) {
      console.error('No image selected');
      return;
    }
    const reqbody = new FormData();
    reqbody.append('file', picture);
    reqbody.append('upload_preset', preset_key); 
    try {
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        reqbody
      );
      setCloudimg(result.data.secure_url);
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      if (err.response) {
        console.log('Cloudinary error response:', err.response.data);
      }
    }
  };
  console.log(cloudimg);


const handleregister = async (e) => {
  e.preventDefault();

  const { email, password, username, picture } = userinfo;

  try {
    if (!email || !password || !username || !picture) {
      toast.error('Fill all fields');
      return;
    } else {
      const response = await registerAPI({ email, password, username, picture:cloudimg});
      console.log(response);
      if(response.status===200){
        toast.success('Registration successfully Completed')
        setUserinfo({ email:'', password:'', username:'', picture:''})
        navigate('/login')
      }
    }
  } catch (error) {
    console.log("register error", error);
  }
};
  
  useEffect(()=>{
        cloudloadimg()
  },[userinfo.picture])

  return (
    <>
        <Container className='login-container'>
      <Row className='login-row'>
        <Col sm={6} md={6} lg={6} xl={6}>
          <div className='form-container'>
            <form action="" className='form'>
           <div className='propic-container'>
            <img className='propic' src={cloudimg?cloudimg:propic} alt="" />
            <label htmlFor="userimageupload">
            <i class="fa-solid fa-plus icon"></i>
            </label>

            <input hidden id='userimageupload' type="file"  onChange={(e)=>setUserinfo({...userinfo,picture:e.target.files[0]})}/>
           </div>
            <label>Username:
          <input type="text" name="email" placeholder='username'  onChange={(e)=>setUserinfo({...userinfo,username:e.target.value})}/>
          </label>

          <label>Email:
          <input type="text" name="email" placeholder='Email'  onChange={(e)=>setUserinfo({...userinfo,email:e.target.value})}/>
          </label>

          <label>Password:
          <input type="password" name="password" placeholder='Password' onChange={(e)=>setUserinfo({...userinfo,password:e.target.value})} />
          </label>
          </form>
          <button className='btn' onClick={handleregister} >Register</button>
          </div>

          <div className='create-acc'>
            <p>Already Have an Account ? Login here !!! <Link to={'/login'}>Login account</Link></p>
          </div>
        </Col>

        <Col className='login-col' sm={6} md={6} lg={6} xl={6}>
          <div className='login-img'>
            <img className='img-fluid' src="https://cdn.dribbble.com/users/20368/screenshots/3949907/live_chat_anim_2.gif" alt="" />
          </div>
        </Col>

      </Row>
    </Container>
    </>
  )
}

export default Signup

