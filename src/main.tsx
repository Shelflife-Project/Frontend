import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider, InviteProvider, ProductProvider, ShoppingListProvider, StorageItemProvider, StorageMemberProvider, StorageProvider, UserProvider } from 'shelflife-react-hooks'
import { localStorageAdapter } from './LocalStorageAdapter.ts'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'
import { Bounce, ToastContainer } from 'react-toastify/unstyled'

const baseUrl = "http://localhost:8080";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider baseUrl={baseUrl} tokenStorage={localStorageAdapter} initialToken={await localStorageAdapter.getItem("auth_token")}>
        <UserProvider baseUrl={baseUrl}>
          <StorageProvider baseUrl={baseUrl}>
            <ProductProvider baseUrl={baseUrl}>
              <StorageMemberProvider baseUrl={baseUrl}>
                <StorageItemProvider baseUrl={baseUrl} >
                  <ShoppingListProvider baseUrl={baseUrl} >
                    <InviteProvider baseUrl={baseUrl} >
                      <App />
                    </InviteProvider>
                  </ShoppingListProvider>
                </StorageItemProvider>
              </StorageMemberProvider>
            </ProductProvider>
          </StorageProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
