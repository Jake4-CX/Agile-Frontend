import axios from "../axios";

export const ReportService = () => {

  const createUserReportRequest = (data: {report_type_id: number, report_description: string, report_latitude: number, report_longitude: number, report_serverity: number}) => {
    return axios.post('/reports/report', data);
  }

  const getAllUserReportsRequest = (userId: number) => {
    return axios.get(`/reports/user/${userId}`);
  }

  const getReportByUUIDRequest = (uuid: string) => {
    return axios.get(`/reports/uuid/${uuid}`);
  }

  const getAllReportsRequest = () => {
    return axios.get('/reports/all');
  }

  return {createUserReportRequest, getAllUserReportsRequest, getReportByUUIDRequest, getAllReportsRequest}
}