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
  
return {loginRequest, registerRequest};
}