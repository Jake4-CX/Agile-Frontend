import axios from "../axios";

export const Options = () => {
  
  const getOptionsRequest = () => {
    return axios.get('/reports/options');
  }

  return {getOptionsRequest};
}