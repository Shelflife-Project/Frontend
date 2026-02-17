import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/Login.tsx'
import { AuthProvider } from 'shelflife-react-hooks'
import { UnProtectedRoute } from './components/UnProtectedRoute.tsx'
import Home from './pages/Home.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import Navbar from './components/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider baseUrl={'http://localhost:8080'}>
      <Routes>
        <Route path='/' element={<Home />} />
        {
          /*<Route path='/about' element={<About />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard/*' element={<ProtectedRoute element={<Dashboard />} />} />
          */
        }
        <Route path='/login' element={<UnProtectedRoute element={<Login />} />} />
        <Route path='/dashboard/*' element={<ProtectedRoute element={<Navbar />} />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
