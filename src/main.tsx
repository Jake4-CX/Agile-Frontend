import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './API/axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <App />
    <ToastContainer autoClose={3000} />
  </>
)
