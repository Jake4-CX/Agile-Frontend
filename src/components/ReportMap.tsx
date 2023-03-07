import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from 'react-toastify'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export const ReportMap = (props: any) => {

  var mapCenter = useMemo(() => ({lat: parseFloat(props.mapCenter.lat), lng: parseFloat(props.mapCenter.lng)}), [])
  var markerPosition = props.markerPosition as { lat: number, lng: number }
  var setMarkerPosition = props.setMarkerPosition as React.Dispatch<React.SetStateAction<{ lat: number, lng: number }>>

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY })

  return (
    !isLoaded ? (
      <>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-slate-50 shadow-lg w-full h-[87vh] lg:h-[65vh] rounded-b-xl lg:rounded-xl p-12 justify-center items-center">
            <h1 className="font-bold text-5xl text-center">Loading Maps</h1>
          </div>
        </div>
      </>
    ) : (
      <>
        <GoogleMap zoom={12} center={mapCenter} mapContainerClassName="w-full h-[87vh] lg:h-[65vh] rounded-b-xl lg:rounded-xl shadow-lg" options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false, minZoom: 8, maxZoom: 20 }} mapTypeId="">
          <MarkerF position={markerPosition} options={{ draggable: true }} onDragEnd={(marker) => setMarkerPosition({ lat: marker.latLng?.lat() ?? 51.898944022703, lng: marker.latLng?.lng() ?? -2.0743560791015625 })} icon={{ url: '/assets/images/orange_pointer_maps.png', scaledSize: new window.google.maps.Size(22, 34) }} />
        </GoogleMap>
      </>
    )
  )

}