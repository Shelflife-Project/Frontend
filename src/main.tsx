import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider, ProductProvider, StorageProvider, UserProvider } from 'shelflife-react-hooks'
import { localStorageAdapter } from './LocalStorageAdapter.ts'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'

const baseUrl = "http://localhost:8080";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider baseUrl={baseUrl} tokenStorage={localStorageAdapter} initialToken={await localStorageAdapter.getItem("auth_token")}>
        <UserProvider baseUrl={baseUrl}>
          <StorageProvider baseUrl={baseUrl}>
            <ProductProvider baseUrl={baseUrl}>
              <App />
            </ProductProvider>
          </StorageProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
