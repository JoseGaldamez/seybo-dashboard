import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { MainRoute } from './router/MainRouter.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainRoute />
  </React.StrictMode>,
)
