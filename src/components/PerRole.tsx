import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseAuth } from "../API/Services/UseAuth";

export const PerRole = (props: any) => {

  const user = UseAuth().getCurrentUser();
  const location = useLocation()

  const roleElements = props.roleElements as { role: String, element: JSX.Element }[]

  if (user && (user.account_role !== undefined)) {
    const user_role = user.account_role as AccountRoles
    const roleElement = roleElements.find(x => x.role === user_role.role_name)
    if (roleElement) {
      return roleElement.element
    } else {
      return (<Navigate to='/unauthorized' state={{ from: location }} replace />)
    }
  } else {
    return (<Navigate to='/login' state={{ from: location }} replace />)
  }
}