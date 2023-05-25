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
import { AdminDashboard } from './views/Admin/Dashboard'
import { AdminUserDashboard } from './views/Admin/Users'
import { AdminUserDetailsDashboard } from './views/Admin/UserDetails'
import { EmployeeDashboard } from './views/Employee/EmployeeDashboard'
import { Verify } from './views/verification/Verify'
import { ManagerDashboard } from './views/Manager/Dashboard'
import { ManagerAssign } from './views/Manager/Assign'
import { ReportTypes } from './views/Admin/ReportTypes'
function App() {

  const dashboardRoleRoutes = [
    { role: "User", element: <Dashboard /> },
    { role: "Employee", element: <EmployeeDashboard /> },
    { role: "Manager", element: <ManagerDashboard /> },
    { role: "Administrator", element: <AdminDashboard /> },
  ] as { role: String, element: JSX.Element }[]

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/help' element={<HelpPage />} />

        {/* Regular Authentication related routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify/:verification_uuid' element={<Verify />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/reset/:verification_uuid' element={<Reset />} />

        <Route path='/template' element={<Template />} /> {/* Remove on final build */}

        <Route path='/report' element={<Report />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/reports/:report_uuid' element={<ViewReport />} />

        {/* Manager routing */}
        <Route element={<RequireAuth allowedRoles={["Manager", "Administrator"]} />}>
          <Route path='/dashboard/assign/:report_uuid' element={<ManagerAssign />} />
        </Route>

        {/* Admin routing */}
        <Route element={<RequireAuth allowedRoles={["Administrator"]} />}>
          <Route path='/dashboard/users' element={ <AdminUserDashboard />}/>
          <Route path='/dashboard/users/:user_id' element={ <AdminUserDetailsDashboard />}/>
          <Route path='/dashboard/types' element={ <ReportTypes />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["User", "Employee", "Manager", "Administrator"]} />}>
          {/* Dashboard switcher */}
          <Route path='/dashboard' element={<PerRole roleElements={dashboardRoleRoutes}/>} />
          <Route path='/logout' element={<Logout />} />
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
