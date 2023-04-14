import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { UseAuth } from "../API/Services/UseAuth";

export const RequireAuth = (props: any) => {

  const user = UseAuth().getCurrentUser();
  const location = useLocation()

  const allowedRoles = props.allowedRoles as String[]

  return (
    user !== null && user.account_role ? (
      allowedRoles.includes(user.account_role.role_name) ? (
        <Outlet />
      ) : (
        <Navigate to='/unauthorized' state={{ from: location }} replace />
      )
    ) : (
      <Navigate to='/login' state={{ from: location }} replace />
    )
  )

}