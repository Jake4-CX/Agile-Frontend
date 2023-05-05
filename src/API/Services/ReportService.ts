import axios from "../axios";

export const ReportService = () => {

  const createUserReportRequest = (data: {report_type_id: number, report_description: string, report_latitude: number, report_longitude: number, report_severity: number}) => {
    return axios.post('/reports/report', data);
  }

  const getAllUserReportsRequest = (userId: number) => {
    return axios.get(`/reports/user/${userId}`);
  }

  const getAllUserAssignedReportsRequest = () => {
    return axios.get('/reports/assigned');
  }

  const getReportByUUIDRequest = (uuid: string) => {
    return axios.get(`/reports/uuid/${uuid}`);
  }

  const getAllReportsRequest = () => {
    return axios.get('/reports/all');
  }

  const getAllNearbyReportsRequest = (latitude: number, longitude: number) => {
    return axios.get(`/reports/radius/${latitude}/${longitude}`);
  }

  const getAllUnassignedReportsRequest = () => {
    return axios.get('/reports/all/unassigned');
  }

  const deleteReportByUUIDRequest = (uuid: string) => {
    return axios.delete(`/reports/uuid/${uuid}`);
  }

  const getReportStatisticsRequest = () => {
    return axios.get('/reports/statistics');
  }

  return {createUserReportRequest, getAllUserReportsRequest, getReportByUUIDRequest, getAllReportsRequest, getAllNearbyReportsRequest, getAllUnassignedReportsRequest, getAllUserAssignedReportsRequest, deleteReportByUUIDRequest, getReportStatisticsRequest}
}