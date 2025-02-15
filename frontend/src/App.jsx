import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function Layout({ children }) {

  const location = useLocation()

  const hideNavbarPath = ['/login', '/register']

  return (

    <>
      {!hideNavbarPath.includes(location.pathname) && <Navbar />}
      {children}
    </>

  )
}


function App() {

  return (
    <>
      <BrowserRouter>

        <Layout >
          <Routes>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/' element={<Dashboard />} />

          </Routes>
        </Layout>

      </BrowserRouter>
    </>
  )
}

export default App
