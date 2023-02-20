import moment from "moment";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export const MyReports = (props: any) => {

  const navigate = useNavigate();

  var [reports, setReports] = useState<Report[]>([
    { id: 1, title: "Report 1", reportType: reportTypes.Graffiti, reportStatus: reportStatuses.open, reportLocation: {lat: 50, lng: 0, address: "Cheltenham Town Hall, Imperial Square, Cheltenham, GL50 1QA"}, date: new Date() },
    { id: 2, title: "Report 2", reportType: reportTypes.Flytipping, reportStatus: reportStatuses.closed, reportLocation: {lat: 50, lng: 0, address: "Lansdown House, 48 Lansdown Road, Cheltenham, GL50 2PP"}, date: new Date() },
    { id: 3, title: "Report 3", reportType: reportTypes.Pothole, reportStatus: reportStatuses.closed, reportLocation: {lat: 50, lng: 0, address: "John Lewis, 123 High Street, Cheltenham, GL50 1DQ"}, date: new Date() }
  ])

  return (
    <>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 table-auto">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  reports.map((report: Report) => {
                    return (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{report.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {reportTypes[report.reportType]}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 truncate overflow-hidden ... w-[192px]">Near {report.reportLocation?.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex text-xs leading-5 font-semibold">
                            <span className={`rounded-full px-2 capitalize ${reportStatusColours[report.reportStatus]}`}>{reportStatuses[report.reportStatus]}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          { moment(report.date).startOf('hour').fromNow() }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a className="text-indigo-600 hover:text-indigo-900" onClick={() => navigate('/reports/' + report.id)}>View</a>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
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