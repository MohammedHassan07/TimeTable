import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Teachers from './pages/Teachers'
import GenerateCharts from './pages/GenerateCharts'
import GenerateSchedule from './pages/GenerateSchedule'
import Subjects from './pages/Subjects'

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

            <Route path='/' element={<Dashboard />} >

              <Route path='/render-charts' element={<GenerateCharts />} />
              <Route path='/teachers/create' element={<Teachers />} />

              <Route path='/subjects' element={<Subjects />} />

              <Route path='/schedule' element={<GenerateSchedule />} />
            </Route>


          </Routes>
        </Layout>

      </BrowserRouter>
    </>
  )
}

export default App
