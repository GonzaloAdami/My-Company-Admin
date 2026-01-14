import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'

import Router from './Rooter/rooter'
import Navbar from './Module/Navbar/navbar-module'
import navdate from './Module/Navbar/navbar-bd.json'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <main>
        <Navbar BODY_NAVBAR={navdate}/> 
        <Router />
      </main>
    </BrowserRouter>
  </StrictMode>
)
