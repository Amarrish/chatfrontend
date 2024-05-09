import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { userdataContext } from './Context/Contextshare';


function App() {
  const {userdata,setUserdata} = useContext(userdataContext)
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={userdata? <Chat/>: <Login/>} />
        <Route path='/signup' element={ userdata? <Navigate to={'/'} />:<Signup/>}/>
        <Route path='/login' element={userdata? <Navigate to={'/'} />: <Login/>}/>
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
