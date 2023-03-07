import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImageService } from "../API/Services/ImageService"
import { ReportService } from "../API/Services/ReportService"

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
      {reports.map((report: Report) => {
        return (
          <div key={report.id}>
            <p onClick={() => navigate(report.report_uuid)}>{report.report_uuid}</p>
            <p>{report.report_type.id}</p>
            <p>{report.report_description}</p>
            <p>{report.report_status}</p>
          </div>
        )
      })}
      </>
  )

}