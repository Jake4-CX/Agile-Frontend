import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from 'react-toastify'
import { GoogleMap, useLoadScript, MarkerF, InfoWindow, Circle, InfoWindowF } from "@react-google-maps/api";
import { ReportService } from "../API/Services/ReportService";
import moment from "moment";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { ImageService } from "../API/Services/ImageService";
import { ReportVoteService } from "../API/Services/ReportVoteService";
import { MapKeys } from "./MapKeys";

export const ReportMap = (props: any) => {

  var mapCenter = useMemo(() => ({ lat: parseFloat(props.mapCenter.lat), lng: parseFloat(props.mapCenter.lng) }), [])
  var markerPosition = props.markerPosition as { lat: number, lng: number }
  var setMarkerPosition = props.setMarkerPosition as React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>

  const navigate = useNavigate()

  const [showMapKeys, setShowMapKeys] = useState<boolean>(false);

  var [selectedReport, setSelectedReport] = useState<Report | null>(null)
  var [selectedReportVotes, setSelectedReportVotes] = useState<{ votes: ReportVote[], user_voted?: boolean, report_votes: {upvotes: number, downvotes: number} } | null>(null)
  var [userLastVotedAt, setUserLastVotedAt] = useState<Date>(new Date(0))

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })

  const { getReportVotesRequest, createReportVoteRequest, updateReportVoteRequest, deleteReportVoteRequest } = ReportVoteService()
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
          <div className="z-10 absolute bg-gray-300 rounded-xl right-0 opacity-90 p-4 m-2">
            <div className="flex flex-col items-center h-full">
              <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setShowMapKeys(!showMapKeys)}>
                Show Keys
              </button>
            </div>
          </div>

          <GoogleMap zoom={12} center={mapCenter} mapContainerClassName="w-full h-[87vh] lg:h-[65vh] rounded-b-xl lg:rounded-xl shadow-lg" options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom: 8, maxZoom: 20 }} mapTypeId="">
            <MarkerF key={0} position={markerPosition} options={{ draggable: true }} onDragEnd={(marker) => setMarkerPosition({ lat: marker.latLng?.lat() ?? 51.898944022703, lng: marker.latLng?.lng() ?? -2.0743560791015625 })} icon={{ url: '/assets/images/pointers/orange.png', scaledSize: new window.google.maps.Size(22, 34) }} />
            {reports.map((report, index) => (
              <MarkerF key={index + 1} onClick={() => setSelectedReport(report)} position={loc(report.report_latitude, report.report_longitude)} options={{ draggable: false }} icon={{ url: '/assets/images/pointers/' + report.report_type.report_type_icon + '.png', scaledSize: new window.google.maps.Size(22, 34) }} />
            ))}
            {
              selectedReport && (
                <InfoWindowF position={loc(selectedReport.report_latitude, selectedReport.report_longitude)} onLoad={() => getReportVotes(selectedReport)} onCloseClick={() => setSelectedReport(null)} options={{ maxWidth: 380 }}>
                  <>
                    <div className="flex flex-col w-full">
                      <div id="Header">
                        <h1 className="font-bold text-xl text-center">Report</h1>
                      </div>
                      <div id="Body" className="grid grid-cols-12 gap-x-2">
                        <div className="flex flex-col col-span-3">
                          {
                            selectedReport.report_images && (
                              <div className="w-full h-full bg-cover bg-center rounded" style={{backgroundImage: "url('" + import.meta.env.VITE_API_URL + "images/" + selectedReport.report_images[0].image_uuid + "." + selectedReport.report_images[0].image_file_type + "')"}} />
                            )
                          }
                          
                        </div>
                        <div className="flex flex-col col-span-9">
                          {/* Report Type */}
                          <div className="">
                            <span className="font-semibold">Report Type: </span>
                            <span className="capitalize">{selectedReport.report_type.report_type_name}</span>
                          </div>

                          {/* Submitted at */}
                          <div className="line-clamp-1">
                            <span className="font-semibold">Submitted at: </span>
                            <span className="capitalize">{moment(selectedReport.report_date).calendar()}</span>
                          </div>
                          {/* Description */}
                          <div className="line-clamp-5">
                            <span className="font-semibold">Description: </span>
                            <span className="capitalize">{selectedReport.report_description}</span>
                          </div>

                          {
                            selectedReport.report_votes && (
                              <>
                                {/* Upvote / Downvote buttons with tooltip displaying the amount of votes */}
                                <div className="flex flex-row justify-between">

                                  <div className="">
                                    <span className="font-semibold">Votes: </span>
                                    <span className="text-sm">{ selectedReportVotes ? (selectedReportVotes.report_votes.upvotes - selectedReportVotes.report_votes.downvotes) : (selectedReport.report_votes.upvotes - selectedReport.report_votes.downvotes)}</span>
                                  </div>

                                  <div className="flex flex-row">
                                    <button className="flex flex-row items-center justify-center" onClick={() => voteButtonClick("upvote")}>
                                      <FaThumbsUp className="w-4 h-4 text-slate-400 hover:text-green-500 transition duration-300" />
                                    </button>
                                    <button className="flex flex-row items-center justify-center ml-4" onClick={() => voteButtonClick("downvote")}>
                                      <FaThumbsDown className="w-4 h-4 text-slate-400 hover:text-red-500 transition duration-300" />
                                    </button>
                                  </div>
                                </div>
                              </>
                            )
                          }

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

          {
          showMapKeys && (
            <MapKeys setShowMapKeys={setShowMapKeys} />
          )
        }
        </div>
      </>
    )
  )

  async function voteButtonClick(vote_type: string) {

    const waitDuration: number = 3

    const timeDifference: number = (new Date().getTime() - userLastVotedAt.getTime()) / 1000

    if (timeDifference >= waitDuration) {
      userVote(vote_type)
      setUserLastVotedAt(new Date())

    } else {
      toast.error('You must wait ' + Math.round(((waitDuration - timeDifference) + Number.EPSILON * 100 / 100)) + ' seconds before voting again')
    }
  }


  async function userVote(vote_type: string) {
    console.log(selectedReport)

    if (selectedReport) {

      try {

        if (selectedReportVotes?.user_voted) {
          console.log('User already voted on this report')
          const response = await deleteReportVoteRequest(selectedReport.report_uuid)

          if (response.status === 200) {
            console.log('Successfully removed vote from report')
            getReportVotes(selectedReport)

            toast.success('Successfully removed vote from report')

          } else {
            console.log('Failed to remove vote from report')
            toast.error('Failed to remove vote from report')
          }

          return null

        } else {
          console.log('User has not voted on this report yet')
          const response = await createReportVoteRequest(selectedReport.report_uuid, vote_type)

          if (response.status === 200) {
            console.log('Successfully voted on report')
            getReportVotes(selectedReport)

            toast.success('Successfully voted on report')

          } else {
            console.log('Failed to vote on report')
            toast.error('Failed to vote on report')
          }

          return null
        }

      } catch (error) {
        console.log("Catch Fail: ", error)
      }

    } else {
      console.log('No report selected')
    }
  }




  async function getReportVotes(report: Report | null) {
    if (report) {
      try {
        const response = await getReportVotesRequest(report.report_uuid)

        if (response.status === 200) {
          console.log('Successfully got report votes')
          setSelectedReportVotes(response.data)
        } else {
          console.log('Failed to get report votes')
          setSelectedReportVotes(null)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

}