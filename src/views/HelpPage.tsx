import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { GoogleMap, Marker, MarkerF, useLoadScript } from "@react-google-maps/api";

export const HelpPage = (props: any) => {

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })

  const officeLocation = { lat: 51.8663704, lng: -2.2487064 }

  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#f8f8f8] dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />
          <section className="min-h-full flex-grow">
            <div className="flex flex-col py-16 px-8 lg:px-16 min-h-[620px] flex-grow bg-[#f8f8f8]">
              <h1 className="text-4xl font-bold text-black">Help Page</h1>
              <p className="">This page is where you can find answers to frequently asked questions.</p>


              <div className="mt-6 ml-2">
                <h2 className="text-1xl font-bold text-black">How do I report an issue?</h2>
                <p className="">On the homepage there will be a button which says 'Report' this will lead you to a map where you can select your location and input details about the issue.</p>

                <h3 className="text-1xl font-bold text-black">How do I know my issue has been reported?</h3>
                <p className=""> You will recieve an email confirming your issue has been reported.</p>

                <h3 className="text-1xl font-bold text-black">How do I register an account?</h3>
                <p className="">Click on the Login button on the home page and look for 'Dont have an account?' and click 'Sign up'.</p>
                <h4 className="text-1xl font-bold text-black">Can I view my previous reports?</h4>
                <p className="">Yes. After you have registered for an account and logged in, all of your reports will be visible on your dashboard.</p>
              </div>

            </div>


            <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-2 justify-center items-center bg-gray-200 rounded py-6 px-4 lg:py-8 lg:px-12">
              {/* Office Map */}
              <div className="flex col-span-1">

                {
                  !isLoaded ? (
                    <>
                      <div className="w-full h-[20vh] rounded-b-xl lg:rounded-xl shadow-lg">
                        <h1 className="text-xl">Loading...</h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <GoogleMap zoom={12} center={officeLocation} mapContainerClassName="w-full h-[20vh] rounded-xl shadow-lg" options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom: 8, maxZoom: 20 }} mapTypeId="">
                        <MarkerF position={officeLocation} options={{ draggable: false }} icon={{ url: '/assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }}/>
                      </GoogleMap>
                    </>
                  )
                }
              </div>
              {/* Contact Us */}
              <div className="flex col-span-1">
                <div className="flex flex-col py-16 px-8 lg:px-16">
                  <h1 className="text-1xl font-bold text-black">Need to Contact us?</h1>
                  <p className=""><span className="font-semibold">Call us on:</span> +44 01452 425000</p>
                  <p className=""><span className="font-semibold">Email us:</span>   contact@fixmystreet.com</p>
                </div>
              </div>
            </div>

          </section>
        </div>
        <Footer />
      </div>
    </>
  )

}

