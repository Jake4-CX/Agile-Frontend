import { Footer } from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { AiFillPlusCircle } from "react-icons/ai"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { GeneralLayout } from "../../layouts/general"
import { useNavigate } from "react-router-dom"

const data = [
  { ReportNum: "001", CreatedBy: "Ethan", Postcode: "GL44BL", AssignedTo: "Admin 1", DueDate: "05/02/2023", ReportType: "Pothole", Description: "Large pothole on", Priority: "Medium" },
  { ReportNum: "002", CreatedBy: "Pete", Postcode: "GlA43GF", AssignedTo: "Admin 1", DueDate: "12/03/2023", ReportType: "Drain Cover", Description: "Removed drain cover", Priority: "High" },
  { ReportNum: "002", CreatedBy: "Andi", Postcode: "GL431DS", AssignedTo: "Admin 2", DueDate: "16/03/2023", ReportType: "Faded sign", Description: "Unreadable sign on", Priority: "High" },
]

export const AdminDashboard = (props: any) => {

  const navigate = useNavigate();

  return (
    <GeneralLayout>
      <div className="flex items-center justify-center mt-4 md:mt-12">
        <div id="my-issues" className="flex flex-col w-10/12">
          <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
            <h1 className="py-1">Dashboard</h1>
          </div>

          {/* 2 Buttons - full width, 1 taking the user to /dashboard/users & the other to /dashboard/types */}

          <div className="flex flex-col space-y-2 h-full w-full items-center justify-center">
            {/* Button 1 - Manage Users */}
            <button onClick={() => navigate("/dashboard/users")} className="flex items-center justify-center w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <span>Manage Users</span>
            </button>
            {/* Button 2 - Manage Types */}
            <button onClick={() => navigate("/dashboard/types")} className="flex items-center justify-center w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <span>Manage Types</span>
            </button>
          </div>
        </div>
      </div>

    </GeneralLayout>
  )
}
