import { Footer } from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { AiFillPlusCircle } from "react-icons/ai"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

const data = [
  { ReportNum: "001", CreatedBy: "Ethan", Postcode: "GL44BL", AssignedTo: "Admin 1", DueDate: "05/02/2023", ReportType: "Pothole", Description: "Large pothole on", Priority: "Medium" },
  { ReportNum: "002", CreatedBy: "Pete", Postcode: "GlA43GF", AssignedTo: "Admin 1", DueDate: "12/03/2023", ReportType: "Drain Cover", Description: "Removed drain cover", Priority: "High" },
  { ReportNum: "002", CreatedBy: "Andi", Postcode: "GL431DS", AssignedTo: "Admin 2", DueDate: "16/03/2023", ReportType: "Faded sign", Description: "Unreadable sign on", Priority: "High" },
]

export const AdminDashboard = (props: any) => {

  function addIncident() {
    console.log("Add incident")
  }

  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-white dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">
          <Navbar />

          <section className="min-h-full flex-grow">

            <div className="flex items-center justify-center mt-4 md:mt-12">
              <div id="my-issues" className="flex flex-col w-10/12">
                <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
                  <h1 className="py-1">My issues</h1>
                  <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">3 issues</span>
                </div>

                <div className="sm:flex flex-col sm:items-end sm:justify-between px-10 py-4">

                  <button onClick={addIncident} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                    <AiFillPlusCircle className="w-5 h-5" />
                    <span>Add Incident</span>
                  </button>
                </div>

                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-800 table-auto">
                      <tr>
                        {
                          ["Report num", "Created by", "Postcode", "Assigned to", "Due date", "Report type", "Description", "Priority"].map((columnName, key) => {
                            return <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{columnName}</th>
                          })
                        }
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                      {data.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                              <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{val.ReportNum}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">{val.CreatedBy}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">{val.Postcode}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">{val.AssignedTo}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">{val.DueDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">{val.ReportType}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100 truncate overflow-hidden w-[82px] md:w-[102px]">{val.Description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">{val.Priority}</div>
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
              </div>
            </div>

          </section>
          <Footer />
        </div>
      </div>


    </>
  )
}
