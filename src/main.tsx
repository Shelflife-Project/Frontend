import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginForm from './components/LoginForm.tsx'
import Home from './Pages/Home.tsx'
import Login from './Pages/Login.tsx'
import About from './Pages/About.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
    </Routes>
  </BrowserRouter>,
)
