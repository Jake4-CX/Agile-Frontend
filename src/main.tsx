import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './API/axios'
import ReactGA from "react-ga4";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactGA.initialize(import.meta.env.VITE_G4A_TRACKING_ID as string);
ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <App />
    <ToastContainer autoClose={3000} />
  </>
)
