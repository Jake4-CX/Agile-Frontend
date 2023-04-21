import axios from "axios";

export const UserService = () => {

  const getUserByIdRequest = (userId: number) => {
    return axios.get(`/users/${userId}`);
  }

  const getAllUsersRequest = () => {
    return axios.get('/users');
  }

  return { getUserByIdRequest, getAllUsersRequest }
}