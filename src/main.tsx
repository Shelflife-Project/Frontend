import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Pages/Home.tsx'
import Login from './Pages/Login.tsx'
import About from './Pages/About.tsx'
import SignUp from './Pages/SignUp.tsx'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
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
