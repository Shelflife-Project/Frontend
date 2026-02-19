import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider, UserProvider } from 'shelflife-react-hooks'
import { localStorageAdapter } from './LocalStorageAdapter.ts'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider baseUrl={'http://localhost:8080'} tokenStorage={localStorageAdapter} initialToken={await localStorageAdapter.getItem("auth_token")}>
        <UserProvider baseUrl={'http://localhost:8080'}>
          <App />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
