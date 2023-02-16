import axios from "../axios";

export const UseAuth = () => {
  const loginRequest = (email: string, password: string) => {
    return axios.post('/users/login', {
      user_email: email,
      user_password: password,
    })
  }
  
return {loginRequest};
}