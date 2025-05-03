import './styles/global.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppSemi from './AppDY.jsx'
import AppAntd from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AppSemi /> */}
    <AppAntd />
  </StrictMode>
)