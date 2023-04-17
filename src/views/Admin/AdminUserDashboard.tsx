import { Footer } from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { AiFillPlusCircle } from "react-icons/ai"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { GeneralLayout } from "../../layouts/general"

const data = [
  { UserNum: "001", UserFirstName: "Admin 1", UserLastName: "Surname 1", EmailAddress: "Admin1@fixmystreet.com", PostCode: "GlA43GF", ActiveIssues: "3", AllTimeIssues: "106", AccCreationDate: "12/02/2022" },
  { UserNum: "002", UserFirstName: "Admin 2", UserLastName: "Surname 2", EmailAddress: "Admin2@fixmystreet.com", PostCode: "GL44BL", ActiveIssues: "5", AllTimeIssues: "148", AccCreationDate: "19/09/2021" },
  { UserNum: "003", UserFirstName: "Admin 3", UserLastName: "Surname 3", EmailAddress: "Admin2@fixmystreet.com", PostCode: "GL431DS", ActiveIssues: "7", AllTimeIssues: "213", AccCreationDate: "24/06/2020" },
]

export const AdminUserDashboard = (props: any) => {

  function addUser() {
    console.log("Add user")
  }

  return (
    <GeneralLayout>
      <div className="flex items-center justify-center mt-4 md:mt-12">
        <div id="my-issues" className="flex flex-col w-10/12">
          <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
            <h1 className="py-1">My Users</h1>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">3 users</span>
          </div>

          <div className="sm:flex flex-col sm:items-end sm:justify-between px-10 py-4">

            <button onClick={addUser} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <AiFillPlusCircle className="w-5 h-5" />
              <span>Add User</span>
            </button>
          </div>

          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-800 table-auto">
                <tr>
                  {
                    ["User num", "First name", "Last name", "Emaill address", "Home postcode", "Active reports", "Life time reports", "Account creation date"].map((columnName, key) => {
                      return <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{columnName}</th>
                    })
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                {data.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{val.UserNum}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{val.UserFirstName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{val.UserLastName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100 truncate overflow-hidden w-[82px] md:w-[102px]">{val.EmailAddress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{val.PostCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{val.ActiveIssues}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{val.AllTimeIssues}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{val.AccCreationDate}</div>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end mt-4">
            {/* Pagination */}

            <div className="inline-flex items-center justify-center gap-3">
              <a className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 cursor-pointer">
                <span className="sr-only">Next Page</span>
                <MdKeyboardArrowLeft className="h-3 w-3" />
              </a>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
              </div>

              <a className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 cursor-pointer">
                <span className="sr-only">Next Page</span>
                <MdKeyboardArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </GeneralLayout>
  )

}
