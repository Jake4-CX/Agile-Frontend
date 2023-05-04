import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { ReportService } from "../API/Services/ReportService"
import moment from "moment"

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { ViewReportCarousel } from "../components/ViewReportCarousel"
import { ImSad2 } from "react-icons/im"
import { GeneralLayout } from "../layouts/general"
import { AiFillDelete } from "react-icons/ai"
import { UseAuth } from "../API/Services/UseAuth"
import { BsFillExclamationCircleFill } from "react-icons/bs"

export const ViewReport = (props: any) => {

  const navigate = useNavigate()
  const { report_uuid } = useParams()

  const { getCurrentUser } = UseAuth();
  const user = getCurrentUser();

  const [report, setReport] = useState<Report>()
  const { getReportByUUIDRequest, deleteReportByUUIDRequest } = ReportService()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const uuid_regex = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$")

  if (report_uuid === undefined) {
    // Redirect user to previous page and display a toast message

    useEffect(() => {
      navigate(-1)
      toast.error("This page requires providing a report id")
    }, [])
    return <></>


  } else if (!uuid_regex.test(report_uuid)) {
    // Redirect user to previous page and display a toast message
    useEffect(() => {
      navigate(-1)
      toast.error("Report ID must be a valid UUID")

    }, [])
    return <></>
  }

  useEffect(() => {
    const getReportByUUID = async () => {
      try {
        const response = await getReportByUUIDRequest(report_uuid as string)

        if (response.status == 200) {
          setReport(response.data as Report)
          setMapPosition({ lat: parseFloat(response.data.report_latitude), lng: parseFloat(response.data.report_longitude) })

        } else {
          navigate(-1)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getReportByUUID()
  }, [])

  var [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 } as { lat: number, lng: number })

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })

  function deleteReport() {
    console.log("Deleting report")
    setShowDeleteModal(false)

    const deleteReport = async () => {
      try {
        const response = await deleteReportByUUIDRequest(report_uuid as string)

        if (response && response.status == 200) {
          toast.success("Report deleted successfully")
          navigate(-1)
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to delete report")
      }
    }

    deleteReport()
  }


  function confirmDeleteReport() {
    setShowDeleteModal(true)
  }



  return (
    <GeneralLayout>


      {/* Administrator tool bar */}

      {
        user && user.account_role && ["Manager", "Administrator"].includes(user.account_role.role_name) && (
          <>
            <div className="flex flex-col sm:flex-row items-end justify-end space-y-3 sm:space-y-0 sm:space-x-3 bg-gray-200 rounded-lg p-6 w-full mt-12">
              {/* Button - Delete report */}
              <button onClick={confirmDeleteReport} className="flex flex-row space-x-3 items-center justify-center bg-red-500 hover:bg-red-600 rounded-lg p-2 w-full sm:w-auto">
                <AiFillDelete className="h-5 w-5 text-white" />
                <span className="text-white text-sm font-semibold">Delete Report</span>
              </button>
            </div>
          </>
        )
      }

      <div className="grid md:grid-cols-2 grid-rows-6 gap-4 h-[87em] md:h-[64em] lg:h-[62em] mt-4">
        <div className="col-span-1 row-span-2 md:row-span-3">
          <div className="flex w-full h-full bg-gray-200 rounded p-6">
            {
              report && (
                <>
                  <div className="w-full h-full">
                    <div className="w-full h-full p-3">
                      <ViewReportCarousel reportImages={report.report_images} reportUUID={report.report_uuid} />
                    </div>
                  </div>
                </>
              )
            }
          </div>
        </div>
        <div className="col-span-1 row-span-3 md:row-span-4">
          <div className="flex w-full h-full bg-gray-200 rounded p-6">

            {
              report !== undefined && (
                <div key={report.id} className="w-full">

                  <div className="flex flex-row bg-gray-300 rounded-lg p-2 w-full lg:w-2/3 xl:w-[20vw] space-x-3">
                    <img className="pointer-events-none flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="/assets/images/default-user-icon.jpg" alt="avatar" />
                    <div className="flex flex-col justify-between">
                      <p className="text-md font-semibold">Reported by: {report.user.first_name}</p>
                      <p className="text-xs">Reported on: {moment(report.report_date).calendar()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 gap-y-4">
                    <div className="flex flex-row space-x-2">
                      <span className="font-semibold my-auto">Status: </span>
                      <div className={`w-fit rounded-full px-2 capitalize font-semibold ${!report.report_status ? 'text-green-800 bg-green-100' : 'text-orange-800 bg-orange-100'}`}>
                        <span>{!report.report_status ? "Open" : "Closed"}</span>
                      </div>
                    </div>

                    {/* Report Address */}

                    <div className="flex flex-col">
                      <label className="font-bold text-left">Report Address</label>
                      <p>{report.address ? report.address.address_street + ", " + report.address.address_city + ", " + report.address.address_county + ", " + report.address.address_postal_code : "No address found"}</p>
                    </div>

                    {/* Report Type */}
                    <div className="flex flex-col">
                      <label className="font-bold text-left">Report Type</label>
                      <p>{report.report_type.report_type_name}</p>
                    </div>

                    {/* Report Votes */}
                    <div className="flex flex-col">
                      <label className="font-bold text-left">Report Votes</label>
                      <p>{(report.report_votes?.upvotes || 0) - (report.report_votes?.downvotes || 0)}</p>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                      <label className="font-bold text-left">Description</label>
                      <textarea className="rounded-lg bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-0 sm:text-sm h-[90px] m-h-[120px] resize-none" placeholder="Loading..." value={report.report_description} disabled />
                    </div>

                  </div>

                  <div className="mt-2">
                    <label className="font-bold">Recent Updates: </label>
                    <div className="flex bg-gray-300 rounded-lg px-4 py-12 h-fit">
                      {
                        [].length > 1 ? (
                          <>
                          </>
                          // reportUpdates.map((reportUpdate, index) => {

                          //   return (
                          //     <>
                          //       <div className="flex flex-row items-center justify-between">
                          //         <div className="flex flex-row items-center gap-x-2">
                          //           <div className="w-8 h-8 rounded-full bg-gray-300">
                          //             <img className="pointer-events-none flex-shrink-0 object-cover rounded-full w-full h-full" src="/assets/images/default-user-icon.jpg" alt="avatar"/>
                          //           </div>
                          //           <div className="flex flex-col">
                          //             <p className="text-sm font-medium">{reportUpdate.user.first_name}</p>
                          //             <p className="text-xs text-gray-500">{moment(reportUpdate.report_date).calendar()}</p>
                          //           </div>
                          //         </div>
                          //       </div>
                          //       <div className="flex flex-row items-center justify-between p-2">
                          //         <div className="flex flex-col">
                          //           <p className="text-sm">{reportUpdate.report_update_text}</p>
                          //           {/* View attached images */}
                          //           <div className="flex flex-row items-center gap-x-2 mt-2">
                          //             {
                          //               reportUpdate.report_images && reportUpdate.report_images.map((image, index) => {
                          //                 return (
                          //                   <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                          //                 )
                          //               })
                          //             }
                          //           </div>
                          //         </div>
                          //       </div>

                          //     </>
                          //   )

                          // })
                        ) : (
                          <>
                            <div className="flex flex-row items-center justify-center text-gray-900 opacity-50 gap-x-3 w-full">
                              <h1 className="text-2xl font-semibold">None found</h1>
                              <ImSad2 className="h-6 w-6" />
                            </div>
                          </>
                        )
                      }
                    </div>
                  </div>

                </div>
              )
            }
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 row-span-2">
          <div className="flex w-full h-full bg-gray-200 rounded-xl shadow-lg p-3">
            {
              !isLoaded ? (
                <div className="w-full h-full rounded-xl shadow-lg flex justify-center items-center text-lg"><p>Loading...</p></div>
              ) : (
                <GoogleMap zoom={14} center={mapPosition} mapContainerClassName="w-full h-full rounded-xl shadow-lg" options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom: 10, maxZoom: 20 }} mapTypeId="">
                  <MarkerF position={mapPosition} options={{ draggable: false }} icon={{ url: '/assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }} />
                </GoogleMap>
              )
            }
          </div>
        </div>
      </div>

      {/* Confirmation modal for Deletion of report */}
      {
        showDeleteModal && (
          <>
            <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div onClick={() => setShowDeleteModal(false)} className="fixed inset-0 bg-gray-500/25 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <BsFillExclamationCircleFill className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Delete Report
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this report? All of the data will be permanently removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={deleteReport} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm">
                      Delete
                    </button>
                    <button onClick={() => setShowDeleteModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
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