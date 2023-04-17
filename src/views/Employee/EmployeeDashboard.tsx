import { useState } from "react"
import { GeneralLayout } from "../../layouts/general"

const data = [
  { id: 1, reportCreator: "John", reportType: "Pothole", reportDescription: "Large pothole on", reportVotes: 3 },
  { id: 2, reportCreator: "Bill", reportType: "Drain Cover", reportDescription: "Removed drain cover", reportVotes: 2 },
  { id: 3, reportCreator: "Tyrone", reportType: "Faded sign", reportDescription: "Unreadable sign on", reportVotes: 1 },
]


export const EmployeeDashboard = (props: any) => {

  const [expandedTables, setExpandedTables] = useState<number[]>([])

  function toggleTable(id: number) {
    if (expandedTables.includes(id)) {
      setExpandedTables(expandedTables.filter((val) => val !== id))
    } else {
      setExpandedTables([...expandedTables, id])
    }
  }

  function isExpanded(id: number) {
    return expandedTables.includes(id)
  }

  return (
    <GeneralLayout>
      <div className="flex items-center justify-center mt-4 md:mt-12">
        <div id="my-issues" className="flex flex-col w-10/12">
          <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
            <h1 className="py-1">My Tasks</h1>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">3 issues</span>
          </div>

          <div className="sm:flex flex-col sm:items-end sm:justify-between px-10 py-4">
          </div>

          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-800 table-auto">
                <tr>
                  {
                    ["ID", "Created By", "Report Type", "Report Description", "Report Votes", "Show More"].map((columnName, key) => {
                      return <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{columnName}</th>
                    })
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                {data.map((val, key) => {
                  return (
                    <>
                      <tr key={key}>
                        <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{val.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{val.reportCreator}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{val.reportType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100 truncate overflow-hidden w-[120px] md:w-[300px]">{val.reportDescription}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{val.reportVotes}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-row justify-end gap-x-2">
                            <button onClick={() => toggleTable(key)} className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">Show More</button>
                          </div>
                        </td>
                      </tr>

                      {
                        isExpanded(key) && (
                          <>
                            <tr key={key + ".5"}>
                              <td colSpan={6} className="px-6 py-4 whitespace-nowrap">
                                <div className="flex">
                                  <div className="h-48 max-h-full w-full">
   
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        )
                      }
                    </>

                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}