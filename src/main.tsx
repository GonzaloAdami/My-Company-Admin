import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import About from './Components/about/about-component'
import Navbar from './Module/Navbar/navbar-module'
import navdate from './Module/Navbar/navbar-bd.json'
import Card from './Module/card/card-module'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
       <Navbar BODY_NAVBAR={navdate}/> 
      <header>
        <About />
      </header>
      <footer className='card-container'>
        <Card />
      </footer>
    
    </main>
  </StrictMode>,
)
