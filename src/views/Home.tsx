import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

import { FaCompass } from "react-icons/fa";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ReportService } from "../API/Services/ReportService";
import { ImageService } from "../API/Services/ImageService";
import moment from "moment";

export const Home = (props: any) => {

  const [reports, setReports] = useState<Report[]>([])
  const [reportImages, setReportImages] = useState<{[key: number]: Image[]}>({})
  const [postalCode, setPostalCode] = useState('')
  const postcodeRegex = /^(([A-Z]{1,2}\d[A-Z\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\d[A-Z]{2}|BFPO ?\d{1,4}|(KY\d|MSR|VG|AI)[ -]?\d{4}|[A-Z]{2} ?\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/    // UK postcode regex

  const navigate = useNavigate();
  const { getAllReportsRequest } = ReportService()
  const { getImagesByImageGroupRequest } = ImageService()

  const baseUrl: string = import.meta.env.VITE_API_URL as string

  const steps = [
    {"title": "Enter a nearby UK postcode, or street name and area", "description": "some description if needed"},
    {"title": "Locate the problem on a map of the area", "description": "some description if needed"},
    {"title": "Describe the problem and submit", "description": "some description if needed"},
    {"title": "We'll confirm the report and Gloucestershire Council will investigate", "description": "some description if needed"}
  ]

  function searchPostalCode(e: any) {
    e.preventDefault()
    console.log(postalCode)

    if (postalCode !== '') {
      if (postcodeRegex.test(postalCode.toUpperCase())) {
        navigate("/report", {state: {postalCode: postalCode.toUpperCase().replace(/^([A-Z]{1,2}\d[A-Z\d]?|[A-Z]{1,2}) ?(\d[A-Z]{2})$/, '$1 $2')}})
      } else {
        toast.warn("Invalid postcode")
        console.log('Invalid postcode')
      }
    }
  }

  function useLocation(e: any) {
    e.preventDefault()
    navigate("/report", {state: {useMyLocation: true}})
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

  useEffect(() => {
    const getImages = async (group_id: number) => {
      return await getImagesByImageGroupRequest(group_id)
    }

    async function fetchImages() {
      const imagePromises = reports.map((report: Report) => {
        return getImages(report.image_group.id);
      });
      const results = await Promise.all(imagePromises);
      const imageDict: {[key: number]: Image[]} = {};
      reports.forEach((report: Report, index: number) => {
        imageDict[report.image_group.id] = results[index].data;
      });
      setReportImages(imageDict);
    }

    fetchImages()

  }, [reports])


  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#f8f8f8] dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="min-h-full flex-grow">
            {/* Hero section */}
            <div className="flex flex-col justify-center items-center h-[540px] bg-gray-600 backdrop-blur-0 relative">
              {/* Hero background image */}
              <div className="absolute inset-0 bg-[url('/assets/images/hero_bg.jpg')] bg-center bg-cover backdrop-opacity-25 blur-[3px] opacity-60 -z-10"></div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold text-white ">Fix My Street</h1>
                <p className="text-white">Report a problem in your area</p>
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
                  <FaCompass className="m-auto mr-2"/>
                  <p>Use my current location</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col py-16 px-8 lg:px-16 min-h-[540px] flex-grow bg-[#f8f8f8]">
                <h1 className="text-5xl font-bold text-black">How to report a problem</h1>
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>

                <div className="grid lg:grid-cols-2">
                  {/* Steps */}
                  <div className="flex flex-col px-12 py-8">
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

                  {/* Recently reported problems table */}
                  <div className="flex flex-col px-12 py-8">
                    <h1 className="text-2xl font-bold text-black">Recently reported problems</h1>
                    {
                      reports.slice(0, 6).map((report, index) => (
                        <div key={index} className="flex flex-row my-2 hover:bg-slate-200 duration-150 cursor-pointer" onClick={() => navigate("reports/" + report.report_uuid)}>
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">{report.report_type.report_type_name}</h3>
                            <p className="text-sm"><span className="font-semibold">Date:</span> { moment(report.report_date).calendar() }</p>
                            <a className="text-sm truncate overflow-hidden ...">{report.report_description}</a>
                          </div>
                          {
                            reportImages[report.image_group.id] && reportImages[report.image_group.id].length > 0 ? (
                              <img src={ baseUrl + "images/" + reportImages[report.image_group.id][0].image_uuid + "." + reportImages[report.image_group.id][0].image_file_type } alt="report" className="w-24 h-16 mr-0 m-auto" />
                            ) : (
                              <div className="w-24 h-16 mr-0 m-auto"></div>
                            )
                          }
                      </div>
                      ))
                    }
                  </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="flex flex-col min-h-[320px] bg-[#A2ACBD] pt-12 px-12 pb-12">
              <h1 className="text-5xl font-bold text-black">Statistics</h1>
              <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>

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
          </section>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Home
