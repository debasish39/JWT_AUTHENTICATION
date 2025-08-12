import React from 'react'
import Layout from './pages/Layout'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/contact'
import LoginReg from './pages/auth/LoginReg'
import SendPasswordResetEmail from './pages/auth/SendPasswordResetEmail'
import ResetPassword from './pages/auth/ResetPassword'
import Dashboard from './pages/Dashboard'
import ChangePassword from './pages/auth/ChangePassword'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className='mx-auto overflow-x-hidden '>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="login"element={<LoginReg/>}/>
      <Route path="sendpasswordemail" element={<SendPasswordResetEmail/>}/>
      <Route path='reset/:id/:token'element={<ResetPassword/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='changepassword' element={<ChangePassword/>}/>
      <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}
