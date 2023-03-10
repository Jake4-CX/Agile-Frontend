import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

const data = [
  { ReportNum: "001", CreatedBy: "Ethan", Postcode: "GL44BL", AssignedTo: "Admin 1", DueDate: "05/02/2023", ReportType: "Pothole", Description: "Large pothole on...", Priority: "Medium" },
  { ReportNum: "002", CreatedBy: "Pete", Postcode: "GlA43GF", AssignedTo: "Admin 1", DueDate: "12/03/2023", ReportType: "Drain Cover", Description: "Removed drain cover...", Priority: "High" },
  { ReportNum: "002", CreatedBy: "Andi", Postcode: "GL431DS", AssignedTo: "Admin 2", DueDate: "16/03/2023", ReportType: "Faded sign", Description: "Unreadable sign on...", Priority: "High" },
]

export const AdminDashboard = (props: any) => {
  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#f8f8f8] dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="min-h-full flex-grow">
            <div className="flex flex-col justify-center items-center p-2 text-white text-2xl font-bold">
              <h1>My issues</h1>
            </div>

            <div className="flex flex-col justify-center items-center text-white">
              <table>
                <thead>
                  <tr>
                    <th>Report num</th>
                    <th>Created by</th>
                    <th>Postcode</th>
                    <th>Assigned to</th>
                    <th>Due date</th>
                    <th>Report type</th>
                    <th>Description</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val.ReportNum}</td>
                        <td>{val.CreatedBy}</td>
                        <td>{val.Postcode}</td>
                        <td>{val.AssignedTo}</td>
                        <td>{val.DueDate}</td>
                        <td>{val.ReportType}</td>
                        <td>{val.Description}</td>
                        <td>{val.Priority}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )

}