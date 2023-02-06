import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

import { FaCompass } from "react-icons/fa";
import { Footer } from "../components/Footer";

export const Home = (props: any) => {

  const navigate = useNavigate();

  const steps = [
    {"title": "Enter a nearby UK postcode, or street name and area", "description": "some description if needed"},
    {"title": "Locate the problem on a map of the area", "description": "some description if needed"},
    {"title": "Describe the problem and submit", "description": "some description if needed"},
    {"title": "We'll connfirm the report and Gloucestershire Council will investigate", "description": "some description if needed"}
  ]

  const recentReports = [
    {"title": "Pothole on the road", "description": "some description if needed", "image": "https://i.imgur.com/3y0G5YR.png"},
    {"title": "Pothole on the road", "description": "some description if needed", "image": "https://i.imgur.com/3y0G5YR.png"}
  ]


  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-white dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="-mt-2 min-h-full flex-grow">
            {/* Hero section */}
            <div className="flex flex-col justify-center items-center h-[540px] bg-slate-400">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold text-white ">Fix My Street</h1>
                <p className="text-white">Report a problem in your area</p>
              </div>

              {/* Search bar */}
              <div className="flex flex-row justify-center items-center mt-4">
                <div className="flex flex-row justify-center items-center bg-white rounded-lg shadow-lg">
                  <input type="text" placeholder="Enter your postcode" className="p-4 rounded-l-lg w-[300px] focus:outline-none" />
                  <button className="bg-sky-400 hover:bg-blue-500 duration-150 rounded-r-lg p-4 text-white font-bold">Search</button>
                </div>
              </div>

              {/* Use current location button */}
              <div className="flex flex-row justify-center items-center mt-4">
                
                <div onClick={() => navigate("/report")} className="bg-sky-400 hover:bg-blue-500 duration-150 rounded-lg p-4 text-white text-sm font-bold flex flex-row cursor-pointer">
                  <FaCompass className="m-auto mr-2"/>
                  <p>Use my current location</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col py-16 mx-8 lg:px-16 min-h-[540px] flex-grow">
                <h1 className="text-5xl font-bold text-black">How to report a problem</h1>
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>

                <div className="grid lg:grid-cols-2">
                  {/* Steps */}
                  <div className="flex flex-col px-12 py-8">
                  {
                  steps.map((step, index) => (
                    <div className="flex flex-row">
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
                      recentReports.map((report, index) => (
                        <div className="flex flex-row my-2 hover:bg-slate-200 duration-150 cursor-pointer">
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">{report.title}</h3>
                            <a className="text-sm">{report.description}</a>
                          </div>
                          <img src={report.image} alt="report" className="w-24 mr-0 m-auto" />
                      </div>
                      ))
                    }
                  </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="flex flex-col min-h-[320px] bg-slate-400 pt-12 px-12 pb-6">
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