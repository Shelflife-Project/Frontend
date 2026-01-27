import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import About from './pages/About.tsx'
import SignUp from './pages/SignUp.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard/*' element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
)
