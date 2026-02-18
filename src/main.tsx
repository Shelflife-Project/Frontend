import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from 'shelflife-react-hooks'
import { localStorageAdapter } from './LocalStorageAdapter.ts'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider baseUrl={'http://localhost:8080'} tokenStorage={localStorageAdapter}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
