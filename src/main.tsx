import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { applyHighchartsTheme } from './lib/highcharts-theme'

// Highcharts 전역 테마 적용
applyHighchartsTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
