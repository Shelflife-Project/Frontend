import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginForm from './components/LoginForm.tsx'
import Home from './Pages/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/test' element={<p>Test</p>} />
    </Routes>
  </BrowserRouter>,
)
