import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Page.css'
import Chatselected from '../components/Chatselected';
import { userdataContext } from '../Context/Contextshare';

const Home = () => {
  const {userdata,setUserdata} = useContext(userdataContext)
  return (
    <>
<Container className='home-container'>
      <Row className='home'>
        <Col sm={12} md={6} lg={6} xl={6} >
        <div className='homeget'>
        <p>
"Welcome to our vibrant and dynamic chat application, where connections come to life! Discover a seamless and engaging platform designed to foster communication and build meaningful relationships. Our user-friendly interface ensures an intuitive and enjoyable experience for users of all backgrounds. Whether you're connecting with friends, family, or new acquaintances, our chat application provides a secure and interactive space to share moments, ideas, and laughter. Explore a diverse range of features, from group chats to private conversations, enriched with multimedia sharing options. With our commitment to user privacy and data security, you can chat confidently, knowing your conversations are in safe hands. Join us on this journey of connectivity and communication – where every message is a step towards building a stronger, closer-knit community. Welcome home to conversations that matter!"</p>
        {userdata? 
      <Link to={'/chat'} style={{textDecoration:'none'}}><button className='btn getbtn'>Let's Chat <i class="fa-regular fa-message fa-bounce" style={{color:'#00000'}}></i></button></Link>:
      <Link to={'/login'} style={{textDecoration:'none'}}><button className='btn getbtn'>Get Started</button></Link>  
     } 
       </div>
        </Col>


        <Col sm={12} md={6} lg={6} xl={6}>
        <div  className='homeimg'>
        <img className='img-fluid' src="https://i.gifer.com/origin/98/98447b873b927d46f752e9e0fc9c2910.gif" alt="chatimg" />
        </div>
        </Col>
      </Row>
      <Row>
        <Chatselected/>
      </Row>
      </Container>
    </>
  )
}

export default Home

