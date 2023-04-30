import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  position:"bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  // pauseOnFocusLoss,
  // draggable,
}

root.render(
  <React.StrictMode>
    <ToastContainer {...options}/>
      <App />    
  </React.StrictMode>
);

