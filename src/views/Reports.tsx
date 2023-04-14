import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImageService } from "../API/Services/ImageService"
import { ReportService } from "../API/Services/ReportService"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export const Reports = (props: any) => {

  // Switch to "ViewReport" if report_id is provided
  // Otherwise, return all reports

  const [reports, setReports] = useState<Report[]>([])
  const { getAllReportsRequest } = ReportService()
  const { getImagesByImageGroupRequest } = ImageService()

  const navigate = useNavigate()

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

    const getImagesByImageGroup = async (image_group_id: number) => {
      try {
        const response = await getImagesByImageGroupRequest(image_group_id)

        if (response.status === 200) {
          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllReports()
  }, [])

  return (
    <>

      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#f8f8f8] dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />
          <section className="min-h-full flex-grow">
            <div className="flex flex-col justify-center items-center">
              <div className="mt-6">
                {reports.map((report: Report, index: number) => {
                  return (
                    <div key={report.id} className="bg-slate-200 rounded-lg cursor-pointer p-3" onClick={() => navigate(report.report_uuid)}>
                      <p>{index + 1}) {report.report_uuid}</p>
                      <p>Report Type: {report.report_type.report_type_name}</p>
                      <p>Report Description: {report.report_description}</p>
                      <p>{!report.report_status ? 'In Progress' : 'Solved'}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )

}