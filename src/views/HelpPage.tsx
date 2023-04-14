import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { GoogleMap, Marker, MarkerF, useLoadScript } from "@react-google-maps/api";
import { GeneralLayout } from "../layouts/general";

export const HelpPage = (props: any) => {

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })

  const officeLocation = { lat: 51.8663704, lng: -2.2487064 }

  return (
    <GeneralLayout>
      <div className="flex flex-col py-16 px-8 lg:px-16 min-h-[620px] flex-grow bg-[#f8f8f8]">
        <h1 className="text-4xl font-bold text-black">Help Page</h1>
        <p className="">This page is where you can find answers to frequently asked questions.</p>


        <div className="mt-6 ml-2">
          <h2 className="text-1xl font-bold text-black">How do I report an issue?</h2>
          <p className=""> 1 - Enter a nearby UK postcode, or street name and area</p>
          <p className="">2 - Locate the problem on a map of the area</p>
          <p className="">3 - Describe the problem and submit</p>
          <p className="">4 - We'll confirm the report and Gloucestershire Council will investigate</p>


          <h3 className="text-1xl font-bold text-black">How do I know my issue has been reported?</h3>
          <p className=""> You will recieve an email confirming your issue has been reported.</p>

          <h3 className="text-1xl font-bold text-black">How do I register an account?</h3>
          <p className="">Click on the Login button on the home page and look for 'Dont have an account?' and click 'Sign up'.</p>
          <h4 className="text-1xl font-bold text-black">Can I view my previous reports?</h4>
          <p className="">Yes. After you have registered for an account and logged in, all of your reports will be visible on your dashboard.</p>
          <h5 className="text-1xl font-bold text-black">Can I make a report without an account?</h5>
          <p className="">No. You will need to create an account to make a report however, you can see previously report issues from other people.</p>
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
                  <MarkerF position={officeLocation} options={{ draggable: false }} icon={{ url: '/assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }} />
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

    </GeneralLayout>
  )

}

