import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = (props: any) => {

  const navigate = useNavigate();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');

  // Axios saves the token, so it will also need to be removed from there
  
  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }, []);

  return (<>
    <p>You have been logged out</p>
  </>)
}