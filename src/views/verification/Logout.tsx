import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = (props: any) => {

  const navigate = useNavigate();
  localStorage.removeItem('token');
  
  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }, []);

  return (<>
    <p>You have been logged out</p>
  </>)
}