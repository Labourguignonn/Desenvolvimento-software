import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Filtroidade from './Filtroidade.jsx'
//import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Filtroidade />
  </StrictMode>,
)
