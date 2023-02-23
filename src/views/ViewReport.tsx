import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const ViewReport = (props: any) => {

  const navigate = useNavigate()
  const { report_id } = useParams()

  if (report_id === undefined) {
    // Redirect user to previous page and display a toast message

    useEffect(() => {
      navigate(-1)
      toast.error("This page requires providing a report id")
    }, [])
    return <></>


  } else if (!/^\d+$/.test(report_id)) {
    // Redirect user to previous page and display a toast message
    useEffect(() => {
      navigate(-1)
      toast.error("Report ID must be a number")

    }, [])
    return <></>
  }

  const report_id_num = Number(report_id)

  


  return (
    <>
      <p>This is the reports page. Report ID: {report_id_num}</p>
    </>
  )


}