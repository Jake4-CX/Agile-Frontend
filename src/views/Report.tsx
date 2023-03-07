import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "../API/axios";

import { Combobox, Listbox, Transition } from '@headlessui/react'
import { Options } from "../API/Services/Options";
import { FiCheck, FiChevronDown, FiUpload } from "react-icons/fi";
import { FileUpload } from "../components/FileUpload";
import { ImCross } from "react-icons/im";
import { ReportService } from "../API/Services/ReportService";
import { ImageService } from "../API/Services/ImageService";

export const Report = (props: any) => {

  const map_center = useMemo(() => ({ lat: 51.898944022703, lng: -2.0743560791015625 }), [])
  var [markerPosition, setMarkerPosition] = useState({ lat: 51.898944022703, lng: -2.0743560791015625 })
  var [markerAddress, setMarkerAddress] = useState({} as Address)
  var [reportDescription, setReportDescription] = useState("")
  const [files, setFiles] = useState()

  const { getOptionsRequest } = Options()
  const [categories, setCategories] = useState([{ id: 0, report_type_name: "Loading report types...", report_type_description: "" }] as ReportType[])
  const [selectedCategory, setSelectedCategory] = useState({ id: 0, report_type_name: "Select a category", report_type_description: "abc" } as ReportType)
  const [severity, setSeverity] = useState(5)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getOptionsRequest()
        if (response.data.types !== null) {
          setCategories(response.data.types)

        }
      } catch (e: any) {
        if (e.response) {
          console.warn("Error getting categories: ", e.response.data)
        } else {
          console.warn("Error getting categories: ", e.message)
        }
      }
    }

    getCategories()

  }, [])

  useEffect(() => {
    getAddress(markerPosition.lat, markerPosition.lng)
  }, [markerPosition])

  const handleSubmit = async (e: any) => { // Report form submit (and upload images)
    e.preventDefault();

    if (selectedCategory.id === 0) {
      toast.warn("Please select a report category")
      return
    } else if (reportDescription === "") {
      toast.warn("Please enter a description")
      return
    } else if (markerPosition.lat === 0 && markerPosition.lng === 0) {
      toast.warn("Please select a location")
      return
    }

    // build data object
    const data = {
      report_type_id: selectedCategory.id,
      report_description: reportDescription,
      report_latitude: markerPosition.lat,
      report_longitude: markerPosition.lng,
      report_serverity: severity
    }


    const { createUserReportRequest } = ReportService()
    const { uploadImageRequest } = ImageService()

    // attempt to post report

    try {
      const response = await createUserReportRequest(data)

      if (response.data) {
        console.log("Report submitted successfully!")

        // Upload images to report, then display success toast message
        if (files !== undefined) {
          const image_group_id: number = response.data.image_group.id;

          const uploadFiles = files as File[];
          Array.from(uploadFiles).map((file: File) => {
            console.log("FileName: ", file.name)

            if (!([["image/jpeg", "image/png", "image/gif"].includes(file.type)])) {
              toast.warn(file.name + " must be a jpeg, png or gif")

            } else if (file.size > 5000000) {
              toast.warn(file.name + " must be less than 5MB")

            } else {

              const formData = new FormData()
              formData.append("image", file)

              try {
                uploadImageRequest(formData, image_group_id)
                console.log("Image uploaded successfully!")
              } catch (e: any) {
                console.warn("Error uploading image: ", e.message)
              }

            }

          });
        }

        toast.success("Report submitted successfully!")
      }

    } catch (e: any) {
      toast.error("Error submitting report: " + e.message)
      console.error(e.message)
    }
  }

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })
  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#f8f8f8] dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="min-h-full flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 lg:space-x-6 space-y-6 lg:space-y-0 w-full h-full justify-center items-center mt-12">
              <div className="col-span-1 row-span-1 bg-[#f8f8f8] dark:bg-[#1d2029]">
                {
                  !isLoaded ? (
                    <div className="flex flex-col justify-center items-center">
                      <div className="bg-slate-50 shadow-lg w-full h-[87vh] lg:h-[65vh] rounded-xl p-12 justify-center items-center">
                        <h1 className="font-bold text-5xl text-center">Loading</h1>
                      </div>
                    </div>
                  ) : (
                    <>
                      <GoogleMap zoom={12} center={map_center} mapContainerClassName="w-full h-[87vh] lg:h-[65vh] rounded-xl shadow-lg" options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom: 8, maxZoom: 20 }} mapTypeId="">
                        <MarkerF position={markerPosition} options={{ draggable: true }} onDragEnd={(marker) => setMarkerPosition({ lat: marker.latLng?.lat() ?? 51.898944022703, lng: marker.latLng?.lng() ?? -2.0743560791015625 })} icon={{ url: '/assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }} />
                      </GoogleMap>
                    </>
                  )
                }
              </div>
              <div className="col-span-1 row-span-1 bg-[#f8f8f8] dark:bg-[#1d2029]">
                <div className="flex flex-col justify-center items-center w-full h-full lg:h-[65vh] space-y-5">

                  <div className="flex justify-center items-center w-full h-full">
                    <div className="bg-slate-50 shadow-lg rounded-lg px-12 py-6 w-full h-full">
                      <h1 className="font-bold text-2xl text-left">Report</h1>
                      <hr className="border-black" />
                      <form onSubmit={handleSubmit} className="">

                        <div className="flex-auto mb-auto">

                          {/* Location */}
                          <p className="truncate overflow-hidden ...">Location: {formatAddress()}</p>
                          <p className="">Latitude: {markerPosition.lat.toFixed(6)}</p>
                          <p className="">Longitude: {markerPosition.lng.toFixed(6)}</p>

                          <div className="mt-6 space-y-4">
                            {/* Report Category - Dropdown box */}
                            <div className="flex flex-col">
                              <label className="font-bold text-left">Report Category</label>
                              <div className="top-16 w-full">
                                {selectedCategory !== undefined && comboBox()}
                              </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col">
                              <label className="font-bold text-left">Description</label>
                              <textarea className="rounded-lg bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-0 sm:text-sm h-[90px] m-h-[120px]" placeholder="Enter a description about the problem" value={reportDescription} onChange={(e) => setReportDescription(e.target.value)}></textarea>
                            </div>

                            {/* Severity range slider */}
                            <div className="flex flex-col">
                              <label className="font-bold text-left">Severity</label>
                              <input className="accent-purple-500 w-full" type="range" min={"1"} max={"10"} onChange={(e) => setSeverity(parseInt(e.target.value))} defaultValue={5} />
                            </div>
                          </div>
                        </div>


                        <div className="sticky">
                          {/* Photograph preview & upload */}
                          <FileUpload files={files} setFiles={setFiles} />

                          {/* Submit button for form */}
                          <div className="flex justify-center">
                            <button className="w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Submit</button>
                          </div>

                        </div>


                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section >
        </div >
        <Footer />
      </div >
    </>
  )

  function comboBox() {

    return (
      <>
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedCategory.report_type_name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((category: ReportType) => (
                  <Listbox.Option
                    key={category.id}
                    value={category}
                    disabled={category.id === 0 ? true : false}
                    className={({ active }) =>
                      `relative select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      } ${category.id === 0 ? 'cursor-not-allowed' : 'cursor-default'}`}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {category.report_type_name}
                        </span>
                        {selected && (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>)}
                      </>)}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </>
    )
  }

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
        console.warn("getAddress error: ", error)
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