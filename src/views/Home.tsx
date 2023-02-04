export const Home = (props: any) => {

  const steps = [
    {"title": "Enter a nearby UK postcode, or street name and area", "description": "some description if needed"},
  ]


  return (
    <>
    <div className="px-0 2xl:px-52 pb-4 mx-auto w-full min-h-screen">
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-white dark:bg-[#1d2029]"></div>

      {/* Navbar */}
      <nav className="flex flex-row justify-between items-center z-20 bg-gray-600 rounded-b-lg shadow-lg">

        {/* Logo */}
        <div className="p-6 pl-0">
          <img src="https://www.fixmystreet.com/cobrands/fixmystreet.com/images/site-logo-homepage.png" alt="logo" className="w-36 ml-8" />
        </div>
        <div className="flex flex-row items-center">
          <div className="p-6">
            <a href="#" className="text-white font-bold">Home</a>
          </div>
          <div className="p-6">
            <a href="#" className="text-white font-bold">All reports</a>
          </div>
          <div className="p-6">
            <a href="#" className="text-white font-bold">Help</a>
          </div>
          <div className="p-6">
            <a href="#" className="text-white font-bold">Login</a>
          </div>
        </div>
      </nav>

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
          <button className="bg-sky-400 hover:bg-blue-500 duration-150 rounded-lg p-4 text-white font-bold">Use my current location</button>
        </div>
      </div>

      {/* About */}
      <div className="flex flex-col p-12 h-[540px]">
          <h1 className="text-5xl font-bold text-black">How to report a problem</h1>
          <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>

          <div className="grid grid-cols-2">
            {/* Steps */}

            { steps.forEach((step, index) => {
                <div className="flex flex-col px-12 py-8">
                  <div className="flex flex-row">
                    <h2 className="font-bold text-3xl">{index}</h2>
                    <p className="text-lg my-auto ml-4">{step.title}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="ml-8 text-sm">{step.description}</p>
                  </div>
                </div>
              }) }

            {/* Recently reported problems table */}
            <div className="flex flex-col px-12 py-8">
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col">
                        <p>Broken street light</p>
                        <p className="text-sm">Reported: 12/12/2021</p>
                        </div>
                    </td>
                    <td className="border px-4 py-2">
                      <img src="https://www.fixmystreet.com/photo/4204034.0.fp.jpeg" alt="logo" className="w-24 mr-0 m-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
      {/* Footer */}
      <footer className="sticky mt-auto bg-slate-400 w-full h-[96px]">

      </footer>
    </div>
    </>
  )
}

export default Home