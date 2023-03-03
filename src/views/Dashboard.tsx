import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../API/axios";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

import { HiInformationCircle, HiOutlineLibrary } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { ReportTable } from "../components/ReportTable";

export const Dashboard = (props: any) => {

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(true);

  var [yourReports, setYourReports] = useState<Report[]>([
    { id: 1, title: "Report 1", reportType: reportTypes.Graffiti, reportStatus: reportStatuses.open, reportLocation: { lat: 50, lng: 0, address: "Cheltenham Town Hall, Imperial Square, Cheltenham, GL50 1QA" }, date: new Date() },
    { id: 2, title: "Report 2", reportType: reportTypes.Flytipping, reportStatus: reportStatuses.closed, reportLocation: { lat: 50, lng: 0, address: "Lansdown House, 48 Lansdown Road, Cheltenham, GL50 2PP" }, date: new Date() },
    { id: 3, title: "Report 3", reportType: reportTypes.Pothole, reportStatus: reportStatuses.closed, reportLocation: { lat: 50, lng: 0, address: "John Lewis, 123 High Street, Cheltenham, GL50 1DQ" }, date: new Date() }
  ])

  var [localReports, setLocalReports] = useState<Report[]>([
    { id: 12, title: "Report 12", reportType: reportTypes.Pothole, reportStatus: reportStatuses.open, reportLocation: { lat: 50, lng: 0, address: "Cheltenham Town Hall, Imperial Square, Cheltenham, GL50 1QA" }, date: new Date() },
    { id: 13, title: "Report 13", reportType: reportTypes.Other, reportStatus: reportStatuses.closed, reportLocation: { lat: 50, lng: 0, address: "Lansdown House, 48 Lansdown Road, Cheltenham, GL50 2PP" }, date: new Date() },
    { id: 14, title: "Report 14", reportType: reportTypes.Pothole, reportStatus: reportStatuses.open, reportLocation: { lat: 50, lng: 0, address: "John Lewis, 123 High Street, Cheltenham, GL50 1DQ" }, date: new Date() },
    { id: 15, title: "Report 15", reportType: reportTypes.Graffiti, reportStatus: reportStatuses.open, reportLocation: { lat: 50, lng: 0, address: "John Lewis, 123 High Street, Cheltenham, GL50 1DQ" }, date: new Date() }
  ])

  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#f8f8f8] dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="flex-grow">
            <div className="flex flex-col justify-center items-center">

              {/* User Personalized alerts */}
              <div className={`bg-green-100 rounded-lg w-full h-12 py-4 px-8 mt-4 border border-green-200 ${showAlert ? 'block' : 'hidden'}`}>
                <div className="flex flex-row justify-between items-center h-full">

                  <HiInformationCircle className="text-green-800 text-xl" />
                  <p className="text-green-800 font-[500] pointer-events-none">Some text</p>
                  <ImCross className="text-green-800 cursor-pointer" onClick={() => setShowAlert(!showAlert)} />

                </div>
              </div>

              <div className="mx-4 my-2">
                <h2 className="text-lg font-medium">Your personal statistics</h2>
                {/* Grid container */}
                <div className="mx-4 my-2">
                  {/* Row Grid of 1x4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full">

                    <div className="bg-white rounded-md shadow-lg px-6 py-4 w-full sm:w-72 lg:w-80 h-36 hover:bg-slate-50 duration-200">
                      <div className="flex flex-row items-center justify-between h-full w-full text-center">
                        <h2 className="w-full">You submitted <a className="font-medium text-lg">3</a> reports in the past <a className="font-medium text-lg">30</a> days</h2>
                      </div>
                    </div>

                    <div className="bg-white rounded-md shadow-lg px-6 py-4 w-full sm:w-72 lg:w-80 h-36 hover:bg-slate-50 duration-200">
                      <div className="flex flex-row items-center justify-between h-full w-full text-center">
                        <h2 className="w-full"><a className="font-medium text-lg">1</a> of these reports has been fixed</h2>
                      </div>
                    </div>

                    <div className="bg-white rounded-md shadow-lg px-6 py-4 w-full sm:w-72 lg:w-80 h-36 hover:bg-slate-50 duration-200">
                      <div className="flex flex-row items-center justify-between h-full w-full text-center">
                        <h2 className="w-full">Your local council is <a className="font-medium text-lg">Gloucestershire County Council</a></h2>
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
                    <ReportTable data={yourReports} />
                  </div>
                </div>
              </div>

              {/* Recent reports in my area */}
              <div className="bg-white rounded-md shadow-lg px-6 py-4 w-11/12 md:w-9/12 h-[428px] my-4">
                <h2 className="text-2xl font-medium text-[#838383]">Recent reports in your area</h2>
                <hr className="border-[#dfdbdb] border-x-2" />

                <div className="flex items-center justify-center">
                  {/* Table */}
                  <div className="flex flex-col mt-4 w-full items-center">
                    <ReportTable data={localReports} />
                  </div>
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

interface Report {
  id: number;
  title: string;
  reportType: reportTypes;
  reportLocation?: reportLocation;
  reportStatus: reportStatuses;
  date: Date;
}

interface reportLocation {
  lat: number;
  lng: number;
  address: string;
}

enum reportTypes {
  "Pothole",
  "Graffiti",
  "Flytipping",
  "Abandoned Vehicle",
  "Other"
}

enum reportStatuses {
  "open",
  "closed"
}

enum reportStatusColours {
  "text-green-800 bg-green-100",
  "text-red-800 bg-red-100"
}