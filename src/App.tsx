import React, { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import { Home } from './views/Home'
import { Login } from './views/verification/Login'
import { Register } from './views/verification/Register'
import { Forgot } from './views/verification/Forgot'
import { Reset } from './views/verification/Reset'
import axios from './API/axios'
import { PageNotFound } from './views/PageNotFound'
import { Logout } from './views/verification/Logout'
import { Report } from './views/Report'
import { Template } from './views/Template'
import { Dashboard } from './views/Dashboard'
import { Reports } from './views/Reports'
import { ViewReport } from './views/ViewReport'
import { RequireAuth } from './components/RequireAuth'
import { HelpPage } from './views/HelpPage'
import { PerRole } from './components/PerRole'
import { AdminDashboard } from './views/Admin/AdminDashboard'
import { AdminUserDashboard } from './views/Admin/AdminUserDashboard'
function App() {

  const dashboardRoleRoutes = [
    { role: "User", element: <Dashboard /> },
    { role: "Employee", element: <Dashboard /> },
    { role: "Manager", element: <Dashboard /> },
    { role: "Administrator", element: <AdminDashboard /> },
  ] as { role: String, element: JSX.Element }[]

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/reset/:token' element={<Reset />} />
        <Route path='/template' element={<Template />} />

        <Route path='/AdminUserDashboard' element={ <AdminUserDashboard />}/>  
        <Route path='/report' element={<Report />} />
        <Route path='/help' element={<HelpPage />} />

        <Route path='/reports' element={<Reports />} />
        <Route path='/reports/:report_uuid' element={<ViewReport />} />
        <Route element={<RequireAuth allowedRoles={["User", "Employee", "Manager", "Administrator"]} />}>

          {/* Protected Routes */}

          {/* Dashboard switcher */}
          <Route path='/dashboard' element={<PerRole roleElements={dashboardRoleRoutes}/>} />
        </Route>

        <Route path='/unauthorized' element={<PageNotFound />} />


        {/* 404 Page */}
        <Route path='*' element={<PageNotFound />} />
      </Route>
    )
  )

  return (
    <div className='App'>
      <RouterProvider router={router} />

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
