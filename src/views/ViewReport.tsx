import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { ReportService } from "../API/Services/ReportService"
import { ImageService } from "../API/Services/ImageService"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import moment from "moment"

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { ViewReportCarousel } from "../components/ViewReportCarousel"

export const ViewReport = (props: any) => {

  const navigate = useNavigate()
  const { report_uuid } = useParams()

  const [report, setReport] = useState<Report>()
  const [reportImages, setReportImages] = useState<Image[]>([])
  const { getReportByUUIDRequest } = ReportService()
  const { getImagesByImageGroupRequest } = ImageService()

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
          getImagesByImageGroup(response.data.image_group.id as number)
          setMapPosition({ lat: parseFloat(response.data.report_latitude), lng: parseFloat(response.data.report_longitude) })

        } else {
          navigate(-1)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getImagesByImageGroup = async (image_group_id: number) => {
      try {
        const response = await getImagesByImageGroupRequest(image_group_id)

        if (response.status === 200) {
          setReportImages(response.data as Image[])
        }
      } catch (error) {
        console.log(error)
      }
    }

    getReportByUUID()
  }, [])

  var [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 } as { lat: number, lng: number })

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })




  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#f8f8f8] dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="min-h-full flex-grow">

            {/* Create a grid using tailwind css with 2 columns and 3 rows. The first div will be 1 column and 1 row, the second div 1 column and 2 row and the final div 2 column and 1 row */}
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-6 gap-4 h-[100vh] lg:h-[70vh] mt-12">
              <div className="col-span-1 row-span-2 md:row-span-3">
                <div className="flex w-full h-full bg-gray-200 rounded p-6">
                  {
                    report && (
                      <>
                        <div className="w-full h-full">
                          <div className="w-full h-full p-3">
                            <ViewReportCarousel reportImages={reportImages} reportUUID={report.report_uuid} />
                          </div>
                        </div>
                      </>
                    )
                  }
                </div>
              </div>
              <div className="col-span-1 row-span-2 md:row-span-4">
                <div className="flex w-full h-full bg-gray-200 rounded p-6">

                  {
                    report !== undefined && (
                      <div key={report.id} className="w-full">

                        <div className="flex flex-row bg-gray-300 rounded-lg p-2 w-full lg:w-2/3 xl:w-1/2 space-x-3">
                          <img className="pointer-events-none flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="/assets/images/default-user-icon.jpg" alt="avatar" />
                          <div className="flex flex-col justify-between">
                            <p className="text-md font-semibold">Reported by: {report.user.first_name}</p>
                            <p className="text-xs">Reported on: {moment(report.report_date).calendar()}</p>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between p-6">
                          <div className="flex flex-row space-x-2">
                            <span className="font-semibold my-auto">Status: </span>
                            <div className={`w-fit rounded-full px-2 capitalize font-semibold ${report.report_status ? 'text-green-800 bg-green-100' : 'text-orange-800 bg-orange-100'}`}>
                              <span>{report.report_status ? "Resolved" : "In Progress"}</span>
                            </div>
                          </div>

                          {/* Report Type */}
                          <div className="flex flex-col my-4">
                            <label className="font-bold text-left">Report Type</label>
                            REPORT TYPE
                          </div>

                          {/* Report Severity */}
                          <div className="flex flex-col my-4">
                            <label className="font-bold text-left">Report Severity</label>
                            {report.report_severity}
                          </div>

                          {/* Description */}
                          <div className="flex flex-col my-4">
                            <label className="font-bold text-left">Description</label>
                            <textarea className="rounded-lg bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-0 sm:text-sm h-[90px] m-h-[120px] resize-none" placeholder="Loading..." value={report.report_description} disabled />
                          </div>

                          <p>Report Location: {report.report_latitude} , {report.report_longitude}</p>
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
                      // <><p>{ mapPosition.lat !== undefined && (mapPosition.lat + " " + mapPosition.lng)}</p></>
                      <GoogleMap zoom={14} center={mapPosition} mapContainerClassName="w-full h-full rounded-xl shadow-lg" options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom: 10, maxZoom: 20 }} mapTypeId="">
                        <MarkerF position={mapPosition} options={{ draggable: false }} icon={{ url: '/assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }} />
                      </GoogleMap>
                    )
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )


}