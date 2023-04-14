import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
const data = [
  { UserNum: "001", UserFirstName: "Admin 1", UserLastName: "Surname 1", EmailAddress: "Admin1@fixmystreet.com", PostCode: "GlA43GF", PhoneNum: "+44 00000000", UserAddress: "Street Address", AccCreationDate: "12/02/2022",  CreatedBy:"Admin 1", UserType:"Standard user", AccountState:"Active", ActiveIssues: "3", AllTimeIssues: "106" },
]

export const AdminUserDetailsDashboard = (props: any) => {

  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-white dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">
        <Navbar />

          <section className="min-h-full flex-grow">
            <div className=" flex flex-col justify-center items-center p-2 text-white text-2xl font-bold">
              <h1 className="py-1">User details</h1>
              <span className="px-3 py-1 text-s m-1 text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">User 001</span>
            </div>
       
            <div className="sm:flex flex-col sm:items-end sm:justify-between px-10 py-4">

              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Manage user</span>
              </button>  
            </div>

            <div className="grid-container">
              
              <div className="TableCaption">First Name:</div>  
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.UserFirstName}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Last Name:</div>  
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.UserLastName}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Users Email Address:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.EmailAddress}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Users Postcode:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.PostCode}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Users Phone Number:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.PhoneNum}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Users Address:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.UserAddress}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Account Creation Date:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.AccCreationDate}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Created By:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.CreatedBy}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">User Type:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.UserType}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Account State:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.AccountState}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">Active Issues:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.ActiveIssues}</div>
                </div>              
              )})}
              </div>

              <div className="TableCaption">All Time Issues:</div>
              <div className="TableValue">{data.map((val, key) => {return (
                <div key={key}>
                  <div>{val.AllTimeIssues}</div>
                </div>              
              )})}
              </div>

            </div>

            <div className="grid-container-notes">
              <div className="TableCaption item1">User Notes:</div>
              <div className="TableValue">27/01/2023</div>
              <div className="TableValue">User</div>  
              <div className="TableValue">Report num 092 Created</div>
              <div className="TableCaption">29/01/2020</div>
              <div className="TableCaption">System</div>
              <div className="TableCaption">Report num 001 Closed complete</div>
              <div className="TableValue">01/01/2020</div>  
              <div className="TableValue">User</div>
              <div className="TableValue">Report num 001 created</div>
              <div className="TableCaption">01/01/2020</div>
              <div className="TableCaption">System</div>
              <div className="TableCaption">Account created</div>
            </div>

            <div className="grid-container-issues">
              <div className="TableCaption item1i">Active Issues:</div>
              <div className="TableCaption">Report Num</div>
              <div className="TableCaption">Created By</div>  
              <div className="TableCaption">Postcode</div>
              <div className="TableCaption">Assigned To</div>
              <div className="TableCaption">Due Date</div>
              <div className="TableCaption">Report Type</div>
              <div className="TableCaption">Description</div>  
              <div className="TableCaption">Priority</div>
              <div className="TableValue">092</div>
              <div className="TableValue">Ethan</div>
              <div className="TableValue">GL44BL</div>
              <div className="TableValue">Admin 1</div>
              <div className="TableValue">05/02/2023</div>
              <div className="TableValue">Pothole</div>
              <div className="TableValue">Large pothole on...</div>
              <div className="TableValue">Medium</div>
            </div>

          </section>       
        <Footer />
        </div>
      </div>


    </>
  )
}
