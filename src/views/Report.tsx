import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "../API/axios";

export const Report = (props: any) => {

  const map_center = useMemo(() => ({lat: 51.898944022703, lng: -2.0743560791015625}), [])
  var [markerPosition, setMarkerPosition] = useState({lat: 51.898944022703, lng: -2.0743560791015625})
  var [markerAddress, setMarkerAddress] = useState({} as Address)

  useEffect(() => {
    getAddress(markerPosition.lat, markerPosition.lng)
  }, [markerPosition])

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
                    <div className="bg-slate-50 shadow-lg rounded-lg px-12 py-6 absolute mt-[456px]">
                      <h1 className="font-bold text-2xl text-left">Report</h1>
                      <hr className="border-black"/>
                      <form>

                        {/* Location */}
                        <p className="">Location: {formatAddress()}</p>
                        <p className="">Latitude: {markerPosition.lat.toFixed(6)}</p>
                        <p className="">Longitude: {markerPosition.lng.toFixed(6)}</p>

                        {/* Report Category - Dropdown box */}
                        <div className="flex flex-col">
                          <label className="font-bold text-left">Category</label>
                          <select className="border-2 border-black rounded-lg p-2">
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                          </select>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col">
                          <label className="font-bold text-left">Description</label>
                          <textarea className="border-2 border-black rounded-lg p-2" placeholder="Description"></textarea>
                        </div>

                        {/* Photograph upload */}
                        <div className="flex flex-col">
                          <label className="font-bold text-left">Photographs</label>
                          <input className="border-2 border-black rounded-lg p-2" type="file" accept="image/*" />
                        </div>

                        {/* Submit button for form */}
                        <div className="flex justify-center">
                          <button className="bg-black text-white rounded-lg p-2 mt-4" type="submit">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <GoogleMap zoom={12} center={map_center} mapContainerClassName="w-full h-[75vh]" options={{streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom:8, maxZoom:20}} mapTypeId="">
                    <MarkerF position={markerPosition} options={{draggable: true}} onDragEnd={(marker) => setMarkerPosition({lat: marker.latLng?.lat() ?? 51.898944022703, lng: marker.latLng?.lng() ?? -2.0743560791015625})} icon={{url: 'assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34)}} />
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

  function getAddress(lat: number, lng: number) {
    axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`)
    .then((response) => {
      if (response.data.error) {
        toast.error(response.data.error)
        return;
      }
      if (response.data.address) {
        setMarkerAddress(response.data.address)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function formatAddress() {
    const addr: any = markerAddress;
    const placeTypes: string[] = ["shop", "amenity", "building", "leisure", "tourism", "historic", "man_made", "aeroway", "military", "office", "highway"];
  
    let formattedAddress = '';
    
    if (addr.house_number) {
      formattedAddress += addr.house_number + ' ';
    }
  
    formattedAddress = placeTypes.filter(type => addr[type]).map(type => addr[type] + ', ').join('') + formattedAddress;
    formattedAddress += addr.road ? addr.road + ', ' : '';
    formattedAddress += addr.quarter ? addr.quarter + ', ' : '';
    formattedAddress += addr.town ? addr.town + ', ' : '';
    formattedAddress += addr.city ? addr.city + ', ' : '';
    formattedAddress += addr.postcode ? addr.postcode : '';
  
    return formattedAddress.trim().replace(/,$/, '');
  }
  
}

interface Address {
  shop?: string;
  amenity?: string;
  building?: string;
  leisure?: string;
  tourism?: string;
  historic?: string;
  man_made?: string;
  aeroway?: string;
  military?: string;
  office?: string;
  highway?: string;
  house_number?: string;
  road?: string;
  quarter?: string;
  town?: string;
  city?: string;
  postcode?: string;
}