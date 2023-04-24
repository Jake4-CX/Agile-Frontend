import { useNavigate } from "react-router-dom";
import { GeneralLayout } from "../../layouts/general";
import { ReportService } from "../../API/Services/ReportService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdAssignmentAdd, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import moment from "moment";


export const ManagerDashboard = (props: any) => {

  const navigate = useNavigate();

  const { getAllUnassignedReportsRequest } = ReportService();

  const [unassignedReports, setUnassignedReports] = useState<Report[]>([]);

  useEffect(() => {
    const getUnassignedReports = async () => {
      const response = await getAllUnassignedReportsRequest();

      if (response.status && response.status === 200) {
        setUnassignedReports(response.data as Report[]);
        console.log(response.data);
      } else {
        toast.error("Failed to get unassigned reports");
      }
    }

    getUnassignedReports();
  }, []);


  return (
    <GeneralLayout>
      <div className="flex items-center justify-center mt-4 md:mt-12">
        <div id="my-issues" className="flex flex-col w-10/12">
          <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
            <h1 className="py-1">Unassigned Reports</h1>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{unassignedReports?.length || 0} unassigned reports</span>
          </div>

          {
            unassignedReports ? (
              <>
                <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th key={1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-1/12">ID</th>
                        <th key={2} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-1/12">Report Type</th>
                        <th key={3} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-2/12">Report Date</th>
                        <th key={4} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-1/12">Postcode</th>
                        <th key={5} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-5/12">Description</th>
                        <th key={6} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-2/12">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100">
                      {unassignedReports.map((report, key) => {
                        return (
                          <tr key={key}>
                            <td className="px-2 py-4 text-sm font-medium whitespace-nowrap truncate overflow-hidden w-full">
                              <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{report.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap truncate overflow-hidden w-full">
                              {report.report_type.report_type_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap truncate overflow-hidden w-full">
                              {moment(report.report_date).format("DD/MM/YY")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap truncate overflow-hidden w-full">
                              { report.address?.address_postal_code || "N/A" }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap truncate overflow-hidden w-full">
                              { report.report_description }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button onClick={() => navigate("/dashboard/assign/" + report.report_uuid)} className="flex flex-row space-x-1 px-4 py-2 font-medium bg-gray-100 rounded-md hover:bg-gray-200 duration-150 cursor-pointer text-slate-600">
                                <MdAssignmentAdd className="w-5 h-5" />
                                <span className="text-sm font-medium">Assign</span>
                              </button>
                            </td>

                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-end mt-4">
                  {/* Pagination */}

                  <div className="inline-flex items-center justify-center gap-3">
                    <a className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 cursor-pointer">
                      <span className="sr-only">Next Page</span>
                      <MdKeyboardArrowLeft className="h-3 w-3" />
                    </a>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
                    </div>

                    <a className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 cursor-pointer">
                      <span className="sr-only">Next Page</span>
                      <MdKeyboardArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </>

            ) : (
              <>
                <p>Loading</p>
              </>
            )
          }
        </div>
      </div>
    </GeneralLayout>
  )
}