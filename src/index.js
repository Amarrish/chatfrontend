import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Contextshare from './Context/Contextshare';
import  SocketContextProvider from './Context/SocketContext'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Contextshare>
    <SocketContextProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SocketContextProvider>
    </Contextshare>
  </React.StrictMode>
);

