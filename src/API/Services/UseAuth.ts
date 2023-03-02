import axios from "../axios";

export const UseAuth = () => {
  const loginRequest = (email: string, password: string) => {
    return axios.post('/users/login', {
      user_email: email,
      user_password: password,
    })
  }

  const registerRequest = (email: string, password: string, firstName: string, lastName: string) => {
    return axios.post('/users/register', {
      user_email: email,
      user_password: password,
      first_name: firstName,
      last_name: lastName
    })
  }

  const getCurrentUser = () => {
    return localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') || '{}') as Users : null;
  }
  
return {loginRequest, registerRequest, getCurrentUser};
}