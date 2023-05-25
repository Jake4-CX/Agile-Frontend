import axios from "../axios";

export const OptionsService = () => {

  const getOptionsRequest = () => {
    return axios.get('/reports/options');
  }

  const addReportTypeRequest = (reportType: string, reportDescription: string, reportIcon: string) => {
    return axios.post('/reports/options/types', {
      report_type_name: reportType,
      report_type_description: reportDescription,
      report_type_icon: reportIcon
    });
  }

  const updateReportTypeRequest = (reportID: number, reportType: string, reportDescription: string, reportIcon: string) => {
    return axios.patch(`/reports/options/types/${reportID}`, {
      report_type_name: reportType,
      report_type_description: reportDescription,
      report_type_icon: reportIcon
    });
  }

  return { getOptionsRequest, addReportTypeRequest, updateReportTypeRequest };
}