import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";


// export default axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     "Content-type": "application/json",
//     "Authorization": localStorage.getItem('accessToken') !== null ? `Bearer ${localStorage.getItem('accessToken')}` : null
//   }
// });

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

if (localStorage.getItem('accessToken')) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
}


// Handle 401 Unauthorized - Expecting Token Expired
axios.interceptors.response.use(response => response, async (error: AxiosError) => {
  console.log("Detected error")

  const errorResponse = error.response?.data as { auth: boolean, message: string }

  if (errorResponse === null || error.response?.status !== 401) {
    return Promise.reject(error)
  }

  if (errorResponse.auth === false && errorResponse.message.toLowerCase === "Failed to authenticate token".toLowerCase) {

    if (localStorage.getItem('accessToken') !== null) {

      const decoded: any = jwt_decode(localStorage.getItem('accessToken') as string, {header: false})
      const exp = decoded.exp
      const now = Math.floor(Date.now() / 1000)
      if (exp < now) {
        console.log("Token expired")
  
        const refreshToken = localStorage.getItem('refreshToken')
  
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
  
        if (refreshToken !== null) {
  
          const response = await axios.get('/users/refresh', {headers: {'Authorization': `Bearer ${refreshToken}`}})
  
          if (response.status === 200) {
            console.log("Successfully refreshed token")
            localStorage.setItem('accessToken', response.data.tokens.accessToken)
            localStorage.setItem('refreshToken', response.data.tokens.refreshToken)
  
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            window.location.reload()
            console.log("Finished refreshing token")
  
            return axios(error.config !== undefined ? error.config : {})
          } else {
            console.log("Token Refresh Failed")
            return Promise.reject(error)
          }
        }
      } else {
        console.log("accessToken is not expired")
      }
    }
  }

  return error
})

export default axios;