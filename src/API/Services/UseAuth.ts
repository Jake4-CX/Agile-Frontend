import axios from "../axios";

// type responseType = "success"| "error" | "fail";

export const UseAuth = () => {
  const loginRequest = (email: string, password: string) => {
    return axios.post('/users/login', {
      user_email: email,
      user_password: password,
    })
  }
  
return {loginRequest};
}

// export const loginRequest = (email: string, password: string) => {
//   return axios.post('/users/login', {
//     user_email: email,
//     user_password: password,
//   })
//   // .then((res) => {
//   //   console.log(res)

//   //   if (res.status === 200) {
//   //     localStorage.setItem('token', res.data.token);
//   //     return "success";
      
//   //   } else {
//   //     return "fail";
//   //   }
//   // }).catch((err) => {
//   //   console.log(err)

//   //   return "error";

//   //   if (err.response.status === 500) {
//   //     console.log(err.response.data.message);
//   //     toast.error("Invalid credentials!");
//   //   }
//   // });
// }

// Return the response type to the axios call '/users/login' for provided user_email and user_password