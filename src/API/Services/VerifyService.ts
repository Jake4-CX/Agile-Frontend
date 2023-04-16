import axios from "../axios";

export const VerifyService = () => {

  const verifyEmail = (verification_uuid: string) => {
    return axios.get(`/users/verify_email/${verification_uuid}`);
  }

  const forgotPassword = (email: string) => {
    return axios.post('/users/reset_password', {
      user_email: email
    });
  }

  const resetPassword = (verification_uuid: string, password: string) => {
    return axios.post(`/users/reset_password/${verification_uuid}`, {
      new_password: password
    });
  }

  const checkResetPasswordToken = (verification_uuid: string) => {
    return axios.get(`/users/reset_password/${verification_uuid}`);
  }

  return {verifyEmail, forgotPassword, checkResetPasswordToken, resetPassword}
}