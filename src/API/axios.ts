import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
    "Authorization": localStorage.getItem('accessToken') !== null ? `Bearer ${localStorage.getItem('accessToken')}` : null
  }
});