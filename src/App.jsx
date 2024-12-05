import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import Start from './pages/Start'
import UserProctectWrapper from './pages/UserProctectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProctectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import 'remixicon/fonts/remixicon.css'

const App = () => {

  return (
    <div>
    <Routes>
      <Route path='/' element={<Start />}/>
      <Route path='/login' element={<UserLogin />}/>
      <Route path='/riding' element={<Riding />}/>
      <Route path='/signup' element={<UserSignup />}/>
      <Route path='/Captain-riding' element={<CaptainRiding />}/>
      <Route path='/captain-login' element={<Captainlogin />}/>
      <Route path='/captain-signup' element={<CaptainSignup />}/>
      <Route path='/home' element={
        <UserProctectWrapper>
        <Home />
        </UserProctectWrapper>
        }/>
        <Route path='/user/logout' element={
        <UserProctectWrapper>
        <UserLogout />
        </UserProctectWrapper>
        }/>
         <Route path='/captain-home' element={
          <CaptainProctectWrapper>
        <CaptainHome />
        </CaptainProctectWrapper>
         }/>
    </Routes>
    </div>
  )
}

export default App