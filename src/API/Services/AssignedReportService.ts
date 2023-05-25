import axios from "../axios";


export const AssignedReportService = () => {

  const assignReportRequest = (report_uuid: string, user_id: number) => {
    return axios.post(`/reports/uuid/${report_uuid}/assign`, {
      user_id: user_id
    });
  }

  const completeAssignedReportRequest = (report_uuid: string) => {
    return axios.post(`/reports/uuid/${report_uuid}/assigned/complete`);
  }

  return { assignReportRequest, completeAssignedReportRequest }
}