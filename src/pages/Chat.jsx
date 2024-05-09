import React from 'react'
import './Page.css'
import Sidebar from '../components/Sidebar'
import Messageform from '../components/Mesageform'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
const Chat = () => {
  return (
    <div className='chat-container'>
      <Container fluid>
      <Row>
        <Col sm={12} md={3} lg={3} xl={3}><Sidebar/></Col>
        <Col sm={12} md={9} lg={9} xl={9}><Messageform/> </Col>
      </Row>
      </Container>
     
    </div>
  )
}

export default Chat