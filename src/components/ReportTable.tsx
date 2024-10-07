import moment from "moment";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../API/axios";

export const ReportTable = (props: any) => {

  const navigate = useNavigate();
  var yourReports = props.data as Report[];

  // var [addresses, setAddresses] = useState<{[key: number]: string}>({})

  // useEffect(() => {
  //   async function fetchAddresses() {
  //     const addressPromises = yourReports.map((report: Report) => {
  //       return getAddress(report.report_latitude, report.report_longitude);
  //     });
  //     const results = await Promise.all(addressPromises);
  //     const addressDict: {[key: number]: string} = {};
  //     yourReports.forEach((report: Report, index: number) => {
  //       addressDict[report.id] = results[index];
  //     });
  //     setAddresses(addressDict);
  //   }
  //   fetchAddresses();
  // }, [yourReports]);

  return (
    <>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 table-auto">
                <tr>
                  {
                    ["Id", "Report Type", "Address", "Status", "Date", ""].map((header: string, index: number) => (
                      <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  yourReports.map((report: Report, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{report.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {report.report_type.report_type_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 truncate overflow-hidden ... w-[82px] md:w-[128px] lg:w-[192px]">{ report.address ? (report.address.address_street + ", " + report.address.address_county + ", " + report.address.address_city + ", " + report.address.address_postal_code) : "No Address Found" }</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex text-xs leading-5 font-semibold">
                            <span className={`rounded-full px-2 capitalize ${!report.report_status ? 'text-green-800 bg-green-100' : 'text-orange-800 bg-orange-100'}`}>{!report.report_status ? 'Open' : 'Closed'}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(report.report_date).startOf('hour').fromNow()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a className="text-indigo-600 hover:text-indigo-900 cursor-pointer" onClick={() => navigate('/reports/' + report.report_uuid)}>View</a>
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

  async function getAddress(lat: number, lng: number): Promise<string> {
    const response = await axios.get<any>(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${import.meta.env.VITE_MAPS_CO_API_KEY}`);
    if (response.data.error) {
      toast.error(response.data.error);
      return 'ERROR';
    }
    if (response.data.address) {
      const formattedAddress = formatAddress(response.data.address) as string;
      return formattedAddress;
    }
    return 'N/A';
  }

  function formatAddress(address: any) {
    const addr: any = address;
    const placeTypes: string[] = ["shop", "amenity", "building", "leisure", "tourism", "historic", "man_made", "aeroway", "military", "office", "highway"];

    let formattedAddress = '';

    if (addr.house_number) {
      formattedAddress += addr.house_number + ' ';
    }

    formattedAddress = placeTypes.filter(type => addr[type]).map(type => addr[type] + ', ').join('') + formattedAddress;
    formattedAddress += addr.road ? addr.road + ', ' : '';
    formattedAddress += addr.quarter ? addr.quarter + ', ' : '';
    formattedAddress += addr.town ? addr.town + ', ' : '';
    formattedAddress += addr.city ? addr.city + ', ' : '';
    formattedAddress += addr.postcode ? addr.postcode : '';

    return formattedAddress.trim().replace(/,$/, '');
  }
}

enum reportStatuses {
  "open",
  "closed"
}

enum reportStatusColours {
  "text-green-800 bg-green-100",
  "text-red-800 bg-red-100"
}