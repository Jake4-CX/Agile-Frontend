import React, { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import { Home } from './views/Home'
import { Login } from './views/verification/Login'
import { Register } from './views/verification/Register'
import { Forgot } from './views/verification/Forgot'
import { Reset } from './views/verification/Reset'
import axios from './axios'
import { PageNotFound } from './views/PageNotFound'
import { Logout } from './views/verification/Logout'
import { Report } from './views/Report'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot' element={ <Forgot /> }/>
        <Route path='/logout' element={ <Logout /> }/>
        <Route path='/reset/:token' element={ <Reset /> }/>
        <Route path='*' element={<PageNotFound />}/>

        <Route path='/report' element={<Report />}/>
      </Route>
    )
  )

  return (
    <div className='App'>
      <RouterProvider router={router}/>

    </div>
  )
}

function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

const Root = () => {
  return (
    <>
      {/* <div>
        <Link to="/"> Home </Link>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
      </div> */}

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
