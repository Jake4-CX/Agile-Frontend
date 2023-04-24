import axios from "../axios"

export const ReportUpdateService = () => {

  const getReportUpdatesFromReportUUIDRequest = (uuid: string) => {
    return axios.get(`/reports/uuid/${uuid}/updates`)
  }

  const createReportUpdateRequest = (reportUUID: string, reportUpdate: any) => {
    return axios.post(`/reports/uuid/${reportUUID}/updates`, reportUpdate)
  }

  return {getReportUpdatesFromReportUUIDRequest, createReportUpdateRequest}
}