import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export const Report = (props: any) => {

  const map_center = useMemo(() => ({lat: 51.898944022703, lng: -2.0743560791015625}), [])
  var [markerPosition, setMarkerPosition] = useState({lat: 51.898944022703, lng: -2.0743560791015625})

  const {isLoaded} = useLoadScript({googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY}) // AIzaSyAMkITHwvzXynS_SG4BVyFzaZp4Z9vju1c
  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-white dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="-mt-2 min-h-full flex-grow">
            {
              !isLoaded ? (
              <div className="flex flex-col justify-center items-center">
                <div className="bg-slate-50 shadow-lg rounded-lg p-12">
                  <h1 className="font-bold text-5xl text-center">Loading</h1>
                </div>
              </div>
              ) : (
                <>
                  <div className="flex relative justify-center items-center z-10">
                    <div className="bg-slate-50 shadow-lg rounded-lg p-12 absolute mt-52">
                      <h1 className="font-bold text-2xl text-left">Report</h1>
                      <hr className="border-black"/>
                      <p className="">Latitude: {markerPosition.lat.toFixed(6)}</p>
                      <p className="">Longitude: {markerPosition.lng.toFixed(6)}</p>
                    </div>
                  </div>
                  <GoogleMap zoom={12} center={map_center} mapContainerClassName="w-full h-[75vh]" options={{streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom:8, maxZoom:20}} mapTypeId="">
                    <MarkerF position={markerPosition} options={{draggable: true}} onDragEnd={(marker) => setMarkerPosition({lat: marker.latLng?.lat(), lng: marker.latLng?.lng()})} icon={{url: 'assets/images/orange_pointer_maps.png', scaledSize: {width: 22, height: 34}}} />
                  </GoogleMap>
                </>
              )
            }
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
  
}