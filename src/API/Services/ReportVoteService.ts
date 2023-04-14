import axios from "../axios";

export const ReportVoteService = () => {

  const createReportVoteRequest = (report_uuid: string, vote_type: string) => {
    return axios.post(`/reports/uuid/${report_uuid}/vote`, {vote_type});
  }

  const getReportVotesRequest = (report_uuid: string) => {
    return axios.get(`/reports/uuid/${report_uuid}/vote`);
  }

  const updateReportVoteRequest = (report_uuid: string, vote_type: string) => {
    return axios.put(`/reports/uuid/${report_uuid}/vote`, {vote_type});
  }

  const deleteReportVoteRequest = (report_uuid: string) => {
    return axios.delete(`/reports/uuid/${report_uuid}/vote`);
  }

  return {createReportVoteRequest, getReportVotesRequest, updateReportVoteRequest, deleteReportVoteRequest}
}