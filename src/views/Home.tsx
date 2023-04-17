import { useNavigate } from "react-router-dom";
import { FaCompass } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ReportService } from "../API/Services/ReportService";
import { ImageService } from "../API/Services/ImageService";
import moment from "moment";
import { GeneralLayout } from "../layouts/general";

export const Home = (props: any) => {

  const [reports, setReports] = useState<Report[]>([])
  const [postalCode, setPostalCode] = useState('')
  const postcodeRegex = /^(([A-Z]{1,2}\d[A-Z\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\d[A-Z]{2}|BFPO ?\d{1,4}|(KY\d|MSR|VG|AI)[ -]?\d{4}|[A-Z]{2} ?\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/    // UK postcode regex

  const navigate = useNavigate();
  const { getAllReportsRequest } = ReportService()

  const baseUrl: string = import.meta.env.VITE_API_URL as string

  const steps = [
    { "title": "M4 Northbound", "description": " Lane 1-2 closed due to collision, 90 min delay" },
    { "title": "C85 Kingsditch Lane/Wymans Lane", "description": "4:30pm until 7:30pm: Closed to traffic travelling south at its junction with Runnings Road" },
    { "title": "A46 Southbound and the junction with the A436", "description": "Roadworks expect disruption everyday between 20:00 and 06:00 from 11 April 2023 to 15 April 2023All lanes will be closed" },
    { "title": "M5 and the junction with the A417 north of Gloucester", "description": " Lane two will be closed, as Horticultural works are planned" }
  ]

  function searchPostalCode(e: any) {
    e.preventDefault()
    console.log(postalCode)

    if (postalCode !== '') {
      if (postcodeRegex.test(postalCode.toUpperCase())) {
        navigate("/report", { state: { postalCode: postalCode.toUpperCase().replace(/^([A-Z]{1,2}\d[A-Z\d]?|[A-Z]{1,2}) ?(\d[A-Z]{2})$/, '$1 $2') } })
      } else {
        toast.warn("Invalid postcode")
        console.log('Invalid postcode')
      }
    }
  }

  function useLocation(e: any) {
    e.preventDefault()
    navigate("/report", { state: { useMyLocation: true } })
  }

  useEffect(() => {
    const getAllReports = async () => {
      try {
        const response = await getAllReportsRequest()

        if (response.status === 200) {
          setReports(response.data as Report[])
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllReports()
  }, [])


  return (
    <GeneralLayout>

      {/* Hero section */}
      <div className="flex flex-col justify-center items-center h-[540px] bg-gray-600 backdrop-blur-0 relative">
        {/* Hero background image */}
        <div className="absolute inset-0 bg-[url('/assets/images/hero_bg.jpg')] bg-center bg-cover backdrop-opacity-25 blur-[3px] opacity-60 -z-10"></div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white ">Fix My Street</h1>
          <p className="text-4xl text-white">Report a problem in your area here!</p>
        </div>

        {/* Search bar */}
        <div className="flex flex-row justify-center items-center mt-4">
          <div className="flex flex-row justify-center items-center bg-white rounded-lg shadow-lg">
            <form onSubmit={searchPostalCode}>
              <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type="text" placeholder="Enter your postcode" className={`p-4 rounded-l-lg w-[300px] focus:outline-none duration-500 ${postalCode != '' && (!postcodeRegex.test(postalCode.toUpperCase()) ? 'bg-red-50' : 'bg-green-50')}`} />
              <button type='submit' className="bg-[#2b84f0] hover:bg-[#2e7ee0] duration-150 rounded-r-lg p-4 text-white font-bold">Search</button>
            </form>
          </div>
        </div>

        {/* Use current location button */}
        <div className="flex flex-row justify-center items-center mt-4">

          <div onClick={useLocation} className="bg-[#2b84f0] hover:bg-[#2e7ee0] duration-150 rounded-lg p-4 text-white text-sm font-bold flex flex-row cursor-pointer">
            <FaCompass className="m-auto mr-2" />
            <p>Use my current location</p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="flex flex-col py-16 px-6 lg:px-8 min-h-[540px] flex-grow bg-[#f8f8f8]">
        <h1 className="text-5xl font-bold text-black">Recent Road Closures</h1>
        <p className=""></p>

        <div className="grid lg:grid-cols-2">
          {/* Steps */}
          <div className="flex flex-col px-8 py-8">
            {
              steps.map((step, index) => (
                <div key={index} className="flex flex-row">
                  <h2 className="font-bold text-3xl">{index + 1}</h2>
                  <div className="flex flex-col ml-4">
                    <p className="text-lg my-auto">{step.title}</p>
                    <p className="text-sm">{step.description}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Recently reported problems table - (andi) has removed this but we could use the space for something else */}
          <div className="flex flex-col px-8 py-8">
            <h1 className="text-2xl font-bold text-black"></h1>

            {
              reports.slice(0, 3).map((report, index) => (
                <div key={index} className="grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 my-2 hover:bg-slate-200 duration-150 cursor-pointer p-2 rounded-lg" onClick={() => navigate("reports/" + report.report_uuid)}>
                  <div className="flex flex-col col-span-2">
                    <h3 className="text-lg font-semibold">{report.report_type.report_type_name}</h3>
                    <p className="text-sm"><span className="font-semibold">Date:</span> {moment(report.report_date).calendar()}</p>
                    <a className="text-sm truncate overflow-hidden ...">{report.report_description}</a>
                  </div>
                  <div className="flex col-span-1 row-span-2 sm:row-span-1">
                    {
                      report.report_images && report.report_images.length > 0 ? (
                        // <img src={ baseUrl + "images/" + reportImages[report.image_group.id][0].image_uuid + "." + reportImages[report.image_group.id][0].image_file_type } alt="report" className="w-full h-full sm:w-24 sm:h-16 mr-0 m-auto cols-span-1" />
                        <div className="w-full h-full mr-0 m-auto bg-cover bg-center bg-no-repeat rounded-sm" style={{ backgroundImage: `url('${baseUrl + "images/" + report.report_images[0].image_uuid + "." + report.report_images[0].image_file_type}')` }}></div>
                      ) : (
                        <div className="w-24 h-16 mr-0 m-auto" style={{ backgroundImage: "url('/assets/images/default-no-image.jpg')" }}></div>
                      )
                    }
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="flex flex-col min-h-[320px] bg-[#A2ACBD] pt-12 px-12 pb-12">
        <h1 className="text-5xl font-bold text-black">Statistics</h1>
        <p className="" ></p>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:gap-24 pt-4">

          <div className="flex flex-col justify-center items-center border-2 border-dashed rounded-lg h-[180px] text-center">
            <h3 className="text-5xl font-medium text-white">100</h3>
            <p className="text-base">Reports in the past week</p>
          </div>

          <div className="flex flex-col justify-center items-center border-2 border-dashed rounded-lg h-[180px] text-center">
            <h3 className="text-5xl font-medium text-white">239</h3>
            <p className="text-base">Completed in the past month</p>
          </div>

          <div className="flex flex-col justify-center items-center border-2 border-dashed rounded-lg h-[180px] text-center">
            <h3 className="text-5xl font-medium text-white">5,430</h3>
            <p className="text-base">Total reports submitted</p>
          </div>

        </div>
      </div>
    </GeneralLayout>
  )
}

export default Home
