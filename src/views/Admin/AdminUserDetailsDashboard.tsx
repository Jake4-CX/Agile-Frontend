import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { GeneralLayout } from '../../layouts/general'
import { AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { HiOutlineMagnifyingGlassPlus } from 'react-icons/hi2'

export const AdminUserDetailsDashboard = (props: any) => {

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <GeneralLayout>
      <div className="flex flex-col space-y-6 items-center justify-center mt-4 md:mt-12">
        <div id="my-issues" className="flex flex-col w-10/12">

          <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
            <h1 className="py-1">User details</h1>
            <span className="px-3 py-1 text-sm m-1 text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">User 001</span>
          </div>

          <div className="flex flex-col items-end justify-end py-4">

            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <AiOutlineEdit className="w-5 h-5" />

              <span>Manage user</span>
            </button>
          </div>
        </div>

        {/* Main user details */}
        <div id="main-user-details" className="flex flex-col w-10/12">
          <div className="lg:grid space-y-3 lg:space-y-0 lg:grid-flow-col-dense lg:grid-cols-2 lg:grid-rows-5 gap-x-4 w-full bg-[#181c22] rounded-md p-5">
            {/* Profile Picture */}
            <div className="w-full row-span-4">
              <img src="/assets/images/default-user-icon.jpg" className="rounded-full w-32 h-32 mx-auto select-none bg-[#e6e6e6]" alt="profile-picture" />
            </div>
            {/* User Details */}
            <div className='flex flex-col w-full row-span-full space-y-[13px] text-white'>

              <div className="flex flex-row gap-x-3">
                <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">Name:</div>
                <div onClick={() => copyToClipboard("Boris Johnson")} className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium truncate overflow-hidden">Boris Johnson</div>
              </div>
              <div className="flex flex-row gap-x-3">
                <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">Email Address:</div>
                <div onClick={() => copyToClipboard("boris.johnson.mp@parliament.uk")} className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium truncate overflow-hidden">boris.johnson.mp@parliament.uk</div>
              </div>
              <div className="flex flex-row gap-x-3">
                <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">Creation Date:</div>
                <div className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium truncate overflow-hidden">21st of March 2023</div>
              </div>
              <div className="flex flex-row gap-x-3">
                <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">Account Type:</div>
                <div className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium truncate overflow-hidden">Employee</div>
              </div>

            </div>

            <div className="w-full space-y-3 text-white">
              {/* Add a tooltip for the issues saying Total / Active / Finished */}
              <div className="flex flex-row gap-x-3">
                <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">Issues Reported:</div>
                <div className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium">127/72/55</div>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div id="address" className="flex flex-col w-10/12 mt-4 md:mt-0">
          <div className="grid gap-y-3 md:grid-rows-4 bg-[#181c22] rounded-md p-5">
            {/* Check if user address exists before displaying */}

            <div className="row-span-1 col-span-1 text-white flex flex-row gap-x-3 overflow-hidden">
              <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">Address:</div>
              <div className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium truncate overflow-hidden">10 Downing street</div>
            </div>
            <div className="row-span-1 col-span-1 text-white flex flex-row gap-x-3">
              <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">City:</div>
              <div className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium">City of London</div>
            </div>
            <div className="row-span-1 col-span-1 text-white flex flex-row gap-x-3">
              <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">Postcode:</div>
              <div className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium">SW1A 2AB</div>
            </div>
            <div className="row-span-1 col-span-1 text-white flex flex-row gap-x-3">
              <div className="px-4 py-2 w-1/2 bg-[#3a4657] rounded-lg font-medium">Country:</div>
              <div className="px-4 py-2 w-1/2 bg-[#343536] rounded-lg font-medium truncate overflow-hidden">United Kingdom</div>
            </div>
          </div>
        </div>

        {/* User notes */}
        <div id="user-notes" className="flex flex-col w-10/12 mt-4 md:mt-0">
          <div className="w-full gap-y-3 bg-[#181c22] rounded-md p-5 text-white">
            {/* Check if user notes exists before displaying */}
            <div className="px-3">
              <div className="w-full px-4 py-2 bg-[#3a4657] rounded-lg font-medium text-center">User Notes:</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-3">
                <thead>
                  <tr className="">
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Date</th>
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Type</th>
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    [1, 2, 3].map((notes, key) => {
                      return (
                        <tr key={key} className="text-center">
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">21/03/23</td>
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">System</td>
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">Report number 001 closed complete</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Active issues */}
        <div id="active-issues" className="flex flex-col w-10/12 mt-4 md:mt-0">
          <div className="w-full gap-y-3 bg-[#181c22] rounded-md p-5 text-white">
            {/* Check if user notes exists before displaying */}
            <div className="px-3">
              <div className="w-full px-4 py-2 bg-[#3a4657] rounded-lg font-medium text-center">Active Issues:</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-3 table-auto">
                <thead>
                  <tr className="">
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">ID</th>
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Date</th>
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Type</th>
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Status</th>
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Description</th>
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Priority</th>
                    <th className="px-4 py-2 bg-[#3a4657] rounded-lg font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    [1, 2, 3].map((issues, key) => {
                      return (
                        <tr key={key} className="text-center">
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">{key + 1}</td>
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">21/03/23</td>
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">System</td>
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">Open</td>
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">
                            <div className="truncate overflow-hidden w-12/12">Report number 001 closed complete</div>
                          </td>
                          <td className="px-4 py-2 bg-[#343536] rounded-lg font-medium">High</td>
                          <td className="px-4 py-2 font-medium bg-[#425064] rounded-md hover:bg-[#35404e] duration-150 cursor-pointer">
                            <HiOutlineMagnifyingGlassPlus className="inline-block w-5 h-5 my-0 m-auto" />
                            <span className="text-sm font-medium">View</span>
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
      </div>

    </GeneralLayout >
  )
}
