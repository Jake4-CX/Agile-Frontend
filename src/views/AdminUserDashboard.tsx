import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

const data = [
  { UserNum: "001", UserFirstName: "Admin 1", UserLastName: "Surname 1", EmailAddress: "Admin1@fixmystreet.com", PostCode: "GlA43GF", ActiveIssues: "3", AllTimeIssues: "106", AccCreationDate: "12/02/2022" },
  { UserNum: "002", UserFirstName: "Admin 2", UserLastName: "Surname 2", EmailAddress: "Admin2@fixmystreet.com", PostCode: "GL44BL", ActiveIssues: "5", AllTimeIssues: "148", AccCreationDate: "19/09/2021" },
  { UserNum: "002", UserFirstName: "Admin 3", UserLastName: "Surname 3", EmailAddress: "Admin2@fixmystreet.com", PostCode: "GL431DS", ActiveIssues: "7", AllTimeIssues: "213", AccCreationDate: "24/06/2020" },
]

export const AdminUserDashboard = (props: any) => {

  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-white dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">
        <Navbar />

          <section className="min-h-full flex-grow">
            <div className=" flex flex-col justify-center items-center p-2 text-white text-2xl font-bold">
              <h1 className="py-1">My Users</h1>
              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">2 users</span>
            </div>
       
            <div className="sm:flex flex-col sm:items-end sm:justify-between px-10 py-4">

              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Add User</span>
              </button>  
            </div>

            <div className="App flex flex-col justify-center items-center text-white">
              <table>
                <tr>
                  <th>User num</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Emaill address</th>
                  <th>Home postcode</th>
                  <th>Active reports</th>
                  <th>Life time reports</th>
                  <th>Account creation date</th>
                </tr>
                {data.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td className= "px-2 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{val.UserNum}</div></td>
                      <td>{val.UserFirstName}</td>
                      <td>{val.UserLastName}</td>
                      <td>{val.EmailAddress}</td>
                      <td>{val.PostCode}</td>
                      <td>{val.ActiveIssues}</td>
                      <td>{val.AllTimeIssues}</td>
                      <td>{val.AccCreationDate}</td>
                      
                    </tr>
                  )
                })}
              </table>
            </div>

            
          
 

            <div className="mt-6 mx-6 sm:flex sm:items-center sm:justify-between ">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 1</span>
              </div>

              <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                  </svg>

                  <span>
                    previous
                  </span>
                </a>

                <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                  <span>
                    Next
                  </span>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>       
        <Footer />
        </div>
      </div>


    </>
  )
}
