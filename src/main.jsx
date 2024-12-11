import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Filtroidade from './pages/Home/Filtroidade.jsx'
import Carregamento from './pages/Home/carregamento.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Filtroidade />
  </StrictMode>,
)
