import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/home'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)
