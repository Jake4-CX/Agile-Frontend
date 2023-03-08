import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from 'react-toastify'
import { GoogleMap, useLoadScript, MarkerF, InfoWindow, Circle, InfoWindowF } from "@react-google-maps/api";
import { ReportService } from "../API/Services/ReportService";
import moment from "moment";

export const ReportMap = (props: any) => {

  var mapCenter = useMemo(() => ({ lat: parseFloat(props.mapCenter.lat), lng: parseFloat(props.mapCenter.lng) }), [])
  var markerPosition = props.markerPosition as { lat: number, lng: number }
  var setMarkerPosition = props.setMarkerPosition as React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>

  const navigate = useNavigate()

  var [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })

  const { getAllReportsRequest } = ReportService()
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    const getAllReports = async () => {
      try {
        const response = await getAllReportsRequest()
        if (response.status == 200) {
          setReports(response.data as Report[])
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllReports()
  }, [])

  function loc(lat: unknown, lng: unknown) {
    return { lat: parseFloat(lat as string), lng: parseFloat(lng as string) }
  }

  return (
    !isLoaded ? (
      <>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-slate-50 shadow-lg w-full h-[87vh] lg:h-[65vh] rounded-b-xl lg:rounded-xl p-12 justify-center items-center">
            <h1 className="font-bold text-5xl text-center">Loading Maps</h1>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="relative w-full h-[87vh] lg:h-[65vh] rounded-b-xl lg:rounded-xl shadow-lg">
          <div className="z-10 absolute bg-gray-300 rounded-xl right-0 w-4/12 opacity-80 p-4 m-2">
            <div className="flex flex-col items-center h-full">
              <h1 className="font-bold text-xl">Keys</h1>
              <hr className="w-10/12 border-x-2 border-gray-600" />
              <div className="w-full h-full my-4 mx-6 space-y-6">

                <div className="grid place-items-center grid-cols-3 col-span-1 w-full h-18" key={1}>
                  <span className="font-semibold col-span-2">Selected Location: </span>
                  <img className="z-20 w-6 text-center" src="assets/images/orange_pointer_maps.png" />
                </div>

                <div className="grid place-items-center grid-cols-3 col-span-1 w-full h-18" key={2}>
                  <span className="font-semibold col-span-2">Open Report: </span>
                  <img className="z-20 w-6" src="assets/images/brown_pointer_maps.png" />
                </div>
              </div>
            </div>
          </div>

          <GoogleMap zoom={12} center={mapCenter} mapContainerClassName="w-full h-[87vh] lg:h-[65vh] rounded-b-xl lg:rounded-xl shadow-lg" options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom: 8, maxZoom: 20 }} mapTypeId="">
            <MarkerF key={0} position={markerPosition} options={{ draggable: true }} onDragEnd={(marker) => setMarkerPosition({ lat: marker.latLng?.lat() ?? 51.898944022703, lng: marker.latLng?.lng() ?? -2.0743560791015625 })} icon={{ url: '/assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }} />
            {reports.map((report, index) => (
              <MarkerF key={index + 1} onClick={() => setSelectedReport(report)} position={loc(report.report_latitude, report.report_longitude)} options={{ draggable: false }} icon={{ url: '/assets/images/brown_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }} />
            ))}
            {
              selectedReport && (
                <InfoWindowF position={loc(selectedReport.report_latitude, selectedReport.report_longitude)} onCloseClick={() => setSelectedReport(null)} options={{ maxWidth: 320 }}>
                  <>
                    <div className="flex flex-col">
                      <div id="Header">
                        <h1 className="font-bold text-xl text-center">Report</h1>
                      </div>
                      <div id="Body">
                        {/* Report Type */}
                        <div className="">
                          <span className="font-semibold">Report Type: </span>
                          <span className="capitalize">{selectedReport.report_type.report_type_name}</span>
                        </div>

                        {/* Submitted at */}
                        <div className="">
                          <span className="font-semibold">Submitted at: </span>
                          <span className="capitalize">{moment(selectedReport.report_date).calendar()}</span>
                        </div>
                        {/* Description */}
                        <div className="">
                          <span className="font-semibold">Description: </span>
                          <span className="capitalize">{selectedReport.report_description}</span>
                        </div>
                      </div>

                      <div id="Footer" className="mt-3 w-full">
                        <button onClick={() => navigate('/reports/' + selectedReport?.report_uuid)} className="w-full rounded px-3 py-2 text-white font-semibold bg-purple-600 shadow-lg transition duration-300 hover:bg-purple-700 hover:shadow-xl">View more</button>
                      </div>
                    </div>
                  </>
                </InfoWindowF>
              )
            }
          </GoogleMap>
        </div>
      </>
    )
  )

}