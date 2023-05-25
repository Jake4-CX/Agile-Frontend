import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReportTable } from "../components/ReportTable";
import { ReportService } from "../API/Services/ReportService";
import { ImageService } from "../API/Services/ImageService";
import { UseAuth } from "../API/Services/UseAuth";
import { GeneralLayout } from "../layouts/general";

export const Dashboard = (props: any) => {

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(true);

  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number }>();

  const user = UseAuth().getCurrentUser();
  const [userReports, setUserReports] = useState<Report[]>([])
  const [localReports, setLocalReports] = useState<Report[]>([])
  const [imageGroupImages, setImageGroupImages] = useState<Image[]>([])
  const { getAllUserReportsRequest, getAllReportsRequest, getAllNearbyReportsRequest } = ReportService()
  const { getImagesByImageGroupRequest } = ImageService()

  useEffect(() => {
    const getAllUserReports = async (userID: number) => {
      try {
        const response = await getAllUserReportsRequest(userID)

        if (response.status === 200) {
          setUserReports(response.data as Report[])
        }

      } catch (error) {
        console.log(error)
      }
    }

    getAllUserReports(user?.id as number)
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
    });
  }, [])

  useEffect(() => {
    const getNearbyReports = async (location: { lat: number, lng: number }) => {
      try {
        const response = await getAllNearbyReportsRequest(location.lat, location.lng)

        if (response.status === 200) {
          setLocalReports(response.data as Report[])
        }

      } catch (error) {
        console.log(error)
      }
    }

    if (userLocation) {
      getNearbyReports(userLocation)
    }
  }, [userLocation])

  function fixedReports(): number {
    return userReports.filter(report => report.report_status === true).length
  }



  return (
    <GeneralLayout>
      <div className="flex flex-col justify-center items-center">

        {/* User Personalized alerts
        <div className={`bg-green-100 rounded-lg w-full h-12 py-4 px-8 mt-4 border border-green-200 ${showAlert ? 'block' : 'hidden'}`}>
          <div className="flex flex-row justify-between items-center h-full">

            <HiInformationCircle className="text-green-800 text-xl" />
            <p className="text-green-800 font-[500] pointer-events-none">Some text</p>
            <ImCross className="text-green-800 cursor-pointer" onClick={() => setShowAlert(!showAlert)} />

          </div>
        </div> */}

        <div className="mx-4 my-2 w-full sm:w-fit">
          {/* <h2 className="text-lg font-medium">Your personal statistics</h2> */}
          {/* Grid container */}
          <div className="mx-4 my-2">
            {/* Row Grid of 1x4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">

              <div className="bg-white rounded-md shadow-lg px-6 py-4 w-full sm:w-72 lg:w-80 h-36 hover:bg-slate-50 duration-200">
                <div className="flex flex-row items-center justify-between h-full w-full text-center">
                  <h2 className="w-full">Your Reports: <a className="font-medium text-lg"> {userReports.length} </a></h2>
                </div>
              </div>

              <div className="bg-white rounded-md shadow-lg px-6 py-4 w-full sm:w-72 lg:w-80 h-36 hover:bg-slate-50 duration-200">
                <div className="flex flex-row items-center justify-between h-full w-full text-center">
                  <h2 className="w-full"><a className="font-medium text-lg">{ fixedReports() }</a> of these reports has been fixed</h2>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* My Reports */}
        <div className="bg-white rounded-md shadow-lg px-6 py-4 w-11/12 md:w-9/12 h-[428px] my-4">
          <h2 className="text-2xl font-medium text-[#838383]">Your Reports</h2>
          <hr className="border-[#dfdbdb] border-x-2" />

          <div className="flex items-center justify-center">
            {/* Table */}
            <div className="flex flex-col mt-4 w-full items-center">
              <ReportTable data={userReports} />
            </div>
          </div>
        </div>

        {/* local reports */}
        <div className="bg-white rounded-md shadow-lg px-6 py-4 w-11/12 md:w-9/12 h-[428px] my-4">
          <h2 className="text-2xl font-medium text-[#838383]">Nearby reports</h2>
          <hr className="border-[#dfdbdb] border-x-2" />

          <div className="flex items-center justify-center">
            {/* Table */}
            <div className="flex flex-col mt-4 w-full items-center">
              <ReportTable data={localReports} />
            </div>
          </div>
        </div>

      </div>
    </GeneralLayout>
  )
}

// interface Report {
//   id: number;
//   title: string;
//   reportType: reportTypes;
//   reportLocation?: reportLocation;
//   reportStatus: reportStatuses;
//   date: Date;
// }

// interface reportLocation {
//   lat: number;
//   lng: number;
//   address: string;
// }

// enum reportTypes {
//   "Pothole",
//   "Graffiti",
//   "Flytipping",
//   "Abandoned Vehicle",
//   "Other"
// }

// enum reportStatuses {
//   "open",
//   "closed"
// }

// enum reportStatusColours {
//   "text-green-800 bg-green-100",
//   "text-red-800 bg-red-100"
// }