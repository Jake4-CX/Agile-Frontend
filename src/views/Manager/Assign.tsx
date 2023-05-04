import { useNavigate, useParams } from "react-router-dom";
import { GeneralLayout } from "../../layouts/general"
import { UserService } from "../../API/Services/UserService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdAssignmentAdd } from "react-icons/md";
import { ReportService } from "../../API/Services/ReportService";
import { AssignedReportService } from "../../API/Services/AssignedReportService";


export const ManagerAssign = (props: any) => {

  const navigate = useNavigate();

  const { getAllUsersWithRoleRequest } = UserService();
  const { getReportByUUIDRequest } = ReportService();
  const { assignReportRequest } = AssignedReportService();

  const { report_uuid } = useParams();

  const [users, setUsers] = useState<Users[]>();
  const [report, setReport] = useState<Report>();

  if (report_uuid === undefined) {
    return (<></>)
  }

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsersWithRoleRequest(2);

      if (response.status && response.status === 200) {
        setUsers(response.data as Users[]);
        console.log("Users: " + response.data);
      } else {
        toast.error("Failed to get users");
      }
    }

    const getReport = async () => {
      const response = await getReportByUUIDRequest(report_uuid);

      if (response.status && response.status === 200) {
        setReport(response.data as Report);
        console.log("Report: " + response.data);
      } else {
        toast.error("Failed to get report");
      }
    }

    getReport();
    getUsers();
  }, []);

  async function assignReport(userID: number) {
    if (report === undefined) return;
    console.log("Assigning report to user: " + userID);

    const response = await assignReportRequest(report.report_uuid, userID);

    if (response.status && response.status === 200) {
      toast.success("Report assigned");
      navigate("/reports/" + report.report_uuid);
    } else {
      toast.error("Failed to assign report");
    }

  }


  return (
    <>
      <GeneralLayout>
        <div className="flex items-center justify-center mt-4 md:mt-12">
          <div id="my-issues" className="flex flex-col w-10/12">
            <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
              <h1 className="py-1">Assign Report</h1>
              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{users?.length || 0}  managers</span>
            </div>

            {
              users ? (
                users.length > 0 ? (
                  <>

                    <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 table-fixed">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th key={1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-2/12">ID</th>
                            <th key={2} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-5/12">Name</th>
                            <th key={3} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-5/12">Open Assignments</th>
                            <th key={4} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-5/12">Closed Assignments</th>
                            <th key={5} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate overflow-hidden w-5/12">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100">
                          {users.map((user, key) => {
                            return (
                              <tr key={key}>
                                <td className="px-2 py-4 text-sm font-medium whitespace-nowrap truncate overflow-hidden w-full">
                                  <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{user.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap truncate overflow-hidden w-full">
                                  {user.first_name + " " + user.last_name}
                                </td>

                                {/* Column to show how many uncompleted reports he currently has already assigned to him */}
                                <td className="px-6 py-4 whitespace-nowrap truncate overflow-hidden w-full">
                                  {user.assigned_reports?.filter(aReport => aReport.report?.report_status === false).length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap truncate overflow-hidden w-full">
                                  {user.assigned_reports?.filter(aReport => aReport.report?.report_status === true).length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button onClick={() => assignReport(user.id)} className="flex flex-row space-x-1 px-4 py-2 font-medium bg-gray-100 rounded-md hover:bg-gray-200 duration-150 cursor-pointer text-slate-600">
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


                  </>
                ) : (
                  <><p>No managers found</p></>
                )
              ) : (
                <>
                  <p>Loading</p>
                </>
              )
            }
          </div>
        </div>

      </GeneralLayout>
    </>
  )
}