import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider, InviteProvider, ProductProvider, ShoppingListProvider, StorageItemProvider, StorageMemberProvider, StorageProvider, ToPurchaseProvider, UserProvider } from 'shelflife-react-hooks'
import { localStorageAdapter } from './LocalStorageAdapter.ts'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

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
                    <ToPurchaseProvider baseUrl={baseUrl} >
                      <InviteProvider baseUrl={baseUrl} >
                        <ThemeProvider>
                          <App />
                        </ThemeProvider>
                      </InviteProvider>
                    </ToPurchaseProvider>
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
