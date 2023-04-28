import { useNavigate } from "react-router";
import { OptionsService } from "../../API/Services/OptionsService";
import { GeneralLayout } from "../../layouts/general";
import { useState } from "react";
import { toast } from "react-toastify";
import { AiFillEdit, AiFillEye } from "react-icons/ai";


export const ReportTypes = (props: any) => {


  const navigate = useNavigate();
  const { getOptionsRequest } = OptionsService();

  const [options, setOptions] = useState<ReportType[]>()

  useState(() => {
    const getOptions = async () => {
      const response = await getOptionsRequest();

      if (response && response.status === 200) {
        setOptions(response.data.types)
      } else {
        toast.error("Error getting report types");

      }
    }

    getOptions();
  }, []);


  return (
    <GeneralLayout>
      <div className="flex items-center justify-center mt-4 md:mt-12">
        <div id="my-issues" className="flex flex-col w-10/12">
          <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
            <h1 className="py-1">Report Types</h1>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{(options !== undefined) ? options.length : 0} issues</span>
          </div>

          <div className="sm:flex flex-col sm:items-end sm:justify-between px-10 py-4">
          </div>

          {
            options ? (
              <>
                <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-800 table-auto">
                      <tr>
                        {
                          ["ID", "Report Name", "Report Description", "Report Icon", "Actions"].map((columnName, key) => {
                            return <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{columnName}</th>
                          })
                        }
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                      {options.map((option, key) => {
                        return (
                          <>
                            <tr key={key}>
                              <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{option.id}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{option.report_type_name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{option.report_type_description}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{option.report_type_icon}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => navigate("/dashboard/types/" + option.id)} className="flex flex-row space-x-1 px-4 py-2 font-medium bg-gray-100 rounded-md hover:bg-gray-200 duration-150 cursor-pointer text-slate-600">
                                  <AiFillEdit className="w-5 h-5" />
                                  <span className="text-sm font-medium">Edit</span>
                                </button>
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <p>Loading</p></>
            )
          }
        </div>
      </div>


    </GeneralLayout>
  )
}