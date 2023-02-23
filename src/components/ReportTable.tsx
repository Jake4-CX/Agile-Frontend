import moment from "moment";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const ReportTable = (props: any) => {

  const navigate = useNavigate();

  var yourReports = props.data;

  return (
    <>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 table-auto">
                <tr>
                  {
                    ["Id", "Report Type", "Address", "Status", "Date", ""].map((header: string) => (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  yourReports.map((report: Report) => {
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
                          {moment(report.date).startOf('hour').fromNow()}
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