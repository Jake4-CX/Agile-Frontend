import axios from "../axios";

export const OptionsService = () => {
  
  const getOptionsRequest = () => {
    return axios.get('/reports/options');
  }

  return {getOptionsRequest};
}