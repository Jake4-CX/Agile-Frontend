import axios from "axios";

export const UserService = () => {

  const getUserByIdRequest = (userId: number) => {
    return axios.get(`/users/${userId}`);
  }

  const getAllUsersRequest = () => {
    return axios.get('/users');
  }

  const getAllUsersWithRoleRequest = (roleId: number) => {
    return axios.get(`/users/role/${roleId}`);
  }

  const updateUsersRoleByIdRequest = (userId: number, roleId: number) => {
    return axios.patch(`/users/${userId}/${roleId}`);
  }

  return { getUserByIdRequest, getAllUsersRequest, getAllUsersWithRoleRequest, updateUsersRoleByIdRequest }
}