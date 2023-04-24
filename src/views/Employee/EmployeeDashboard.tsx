import { useEffect, useState } from "react"
import { GeneralLayout } from "../../layouts/general"
import { ReportService } from "../../API/Services/ReportService"
import { toast } from "react-toastify"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
import { AssignedReportService } from "../../API/Services/AssignedReportService"
import { useNavigate } from "react-router-dom"

export const EmployeeDashboard = (props: any) => {

  const baseUrl: string = import.meta.env.VITE_API_URL as string

  const nagivate = useNavigate();

  const [reports, setReports] = useState<AssignedReport[]>([])
  const [selectedAssignedReport, setSelectedAssignedReport] = useState<AssignedReport>()
  const [checkApproval, setCheckApproval] = useState<boolean>(false)

  const { getAllUserAssignedReportsRequest } = ReportService();
  const { completeAssignedReportRequest } = AssignedReportService();

  useEffect(() => {
    const getReports = async () => {
      const response = await getAllUserAssignedReportsRequest();

      if (response.status && response.status === 200) {
        setReports(response.data as AssignedReport[]);
        console.log("Reports: " + response.data);
      } else {
        toast.error("Failed to get reports");
      }
    }

    getReports();
  }, []);

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })

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

  function openMaps(latitude: number, longitude: number) {

    navigator.geolocation.getCurrentPosition(function (position) {
      const urlPath = `https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/${latitude},${longitude}/`
      window.open(urlPath, "_blank")

    });
  }

  function approveReport(assignedReport: AssignedReport) {
    setCheckApproval(true);
    setSelectedAssignedReport(assignedReport);
  }

  async function completeReport(reportUUID: string) {
    const response = await completeAssignedReportRequest(reportUUID);

    if (response.status && response.status === 200) {
      toast.success("Report completed");
      nagivate("/reports/" + reportUUID);
    } else {
      toast.error("Failed to complete report");
    }
  }

  return (
    <GeneralLayout>
      <div className="flex items-center justify-center mt-4 md:mt-12">
        <div id="my-issues" className="flex flex-col w-10/12">
          <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
            <h1 className="py-1">My Tasks</h1>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{reports.length} issues</span>
          </div>

          <div className="sm:flex flex-col sm:items-end sm:justify-between px-10 py-4">
          </div>

          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-800 table-auto">
                <tr>
                  {
                    ["ID", "Created By", "Report Type", "Report Description", "Report Votes", "Actions"].map((columnName, key) => {
                      return <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{columnName}</th>
                    })
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                {reports.map((assignedReport, key) => {
                  return (
                    <>
                      <tr key={key}>
                        <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{assignedReport.report?.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{assignedReport.report?.user.first_name + " " + assignedReport.report?.user.last_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{assignedReport.report?.report_type.report_type_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100 truncate overflow-hidden w-[120px] md:w-[300px]">{assignedReport.report?.report_description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{(assignedReport.report?.report_votes?.upvotes || 0) - (assignedReport.report?.report_votes?.downvotes || 0)}</div>
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
                            {
                              assignedReport.report !== undefined && (
                                <>
                                  <tr key={key + ".5"}>
                                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex">
                                        <div className="h-56 max-h-full w-full flex flex-row gap-x-2">

                                          <div className="flex w-1/6 h-full bg-gray-200 rounded-lg p-3">
                                            {/* Image */}
                                            {
                                              assignedReport.report.report_images !== undefined && assignedReport.report.report_images.length > 0 ? (
                                                <img className="object-cover w-full h-full rounded-lg" src={baseUrl + "images/" + assignedReport.report.report_images[0].image_uuid + "." + assignedReport.report.report_images[0].image_file_type} alt="Report Image" />
                                              ) : (
                                                <div className="flex flex-col justify-center items-center w-full h-full text-center">
                                                  <span className="text-sm text-gray-400 truncate overflow-hidden w-full">No Image Uploaded</span>
                                                </div>
                                              )
                                            }
                                          </div>

                                          <div className="flex flex-col w-5/6 h-full">
                                            <div className="w-full grid grid-cols-5 gap-4 h-56">
                                              <div className="col-span-3">
                                                <p>
                                                  <span className="text-sm font-medium text-gray-500">Address: </span>
                                                  <span className="text-sm text-gray-900 dark:text-gray-100">{assignedReport.report.address?.address_street + ", " + assignedReport.report.address?.address_city + ", " + assignedReport.report?.address?.address_county + ", " + assignedReport.report?.address?.address_postal_code}</span>
                                                </p>
                                                <p className="">
                                                  <span className="text-sm font-medium text-gray-500">Description: </span>
                                                  <span className="text-sm text-gray-900 dark:text-gray-100">{assignedReport.report.report_description}</span>
                                                </p>
                                              </div>
                                              <div className="col-span-2 space-y-2">
                                                {
                                                  assignedReport.report.address !== undefined ? (
                                                    <>
                                                      <div className="flex w-full h-36 p-3 bg-gray-200 rounded-lg">
                                                        {
                                                          isLoaded ? (
                                                            <>
                                                              <GoogleMap zoom={13} center={new google.maps.LatLng(assignedReport.report.address.address_latitude, assignedReport.report.address.address_longitude)} mapContainerClassName="w-full h-full rounded-xl shadow-lg" options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom: 8, maxZoom: 20 }} mapTypeId="">
                                                                <MarkerF position={new google.maps.LatLng(assignedReport.report.address.address_latitude, assignedReport.report.address.address_longitude)} options={{ draggable: false }} icon={{ url: '/assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }} />
                                                              </GoogleMap>
                                                            </>
                                                          ) : (
                                                            <>
                                                              <div className="w-full h-full">
                                                                <p>Loading</p>
                                                              </div>
                                                            </>
                                                          )
                                                        }
                                                        {/* Map */}
                                                      </div>
                                                      <button onClick={() => assignedReport.report && assignedReport.report.address && openMaps(assignedReport.report.address.address_latitude, assignedReport.report.address.address_longitude)} className="w-full px-2 py-1 bg-slate-400 rounded-lg font-bold text-white">
                                                        Open in Google Maps
                                                      </button>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <div className="flex w-full h-36 p-3 bg-gray-200 rounded-lg">
                                                        <div className="flex flex-col justify-center items-center w-full h-full text-center">
                                                          <span className="text-sm text-gray-400 truncate overflow-hidden w-full">No Address</span>
                                                        </div>
                                                      </div>
                                                    </>
                                                  )
                                                }
                                              </div>
                                            </div>

                                            {/* Button collection (same line with small gap between) */}
                                            <div className="flex flex-row gap-x-2 items-end justify-end">
                                              <button onClick={() => approveReport(assignedReport)} className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600">Complete</button>
                                              <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">Add update</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )
                            }
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
      {
        checkApproval && selectedAssignedReport && selectedAssignedReport.report && (
          <>
            <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500/25 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Complete Report
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to complete this report?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={() => selectedAssignedReport.report && completeReport(selectedAssignedReport.report?.report_uuid)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                      Approve
                    </button>
                    <button onClick={() => setCheckApproval(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </>
        )

      }
    </GeneralLayout>
  )
}