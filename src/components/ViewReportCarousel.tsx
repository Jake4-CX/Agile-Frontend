import { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export const ViewReportCarousel = (props: any) => {

  const reportImages = props.reportImages as Image[]
  const reportUUID = props.reportUUID as string

  const baseUrl = import.meta.env.VITE_API_URL

  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        {
          reportImages.length > 0 && (
            <>
              <div className="w-full h-full bg-cover rounded relative" style={{ backgroundImage: "url('" + baseUrl + "images/" + reportImages[currentSlide].image_uuid + "." + reportImages[currentSlide].image_file_type + "')" }}>
                <BsFillArrowLeftCircleFill className="z-10 absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl text-gray-100 cursor-pointer" onClick={() => currentSlide > 0 ? setCurrentSlide(currentSlide - 1) : setCurrentSlide(reportImages.length-1)} />
                <BsFillArrowLeftCircleFill className="z-10 absolute top-1/2 right-3 transform -translate-y-1/2 text-2xl text-gray-100 cursor-pointer rotate-180" onClick={() => currentSlide < reportImages.length-1 ? setCurrentSlide(currentSlide + 1) : setCurrentSlide(0)} /> 
              </div>

              <div className={`grid grid-rows-1 auto-cols-max justify-center w-full h-1/3 gap-3 pt-4 ${reportImages.length > 3 ? 'grid-cols-4' : (reportImages.length > 2 ? 'grid-cols-3' : (reportImages.length == 1 ? 'grid-cols-1 w-1/3' : 'grid-cols-2 w-2/3'))}`}>
                {
                  reportImages.map((image, index) => {
                    return (
                      <div key={index} className="flex w-full h-full bg-cover rounded cursor-pointer" style={{ backgroundImage: "url('" + baseUrl + "images/" + image.image_uuid + "." + image.image_file_type + "')" }} onClick={() => setCurrentSlide(index)} />
                    )
                  })
                }
              </div>
            </>
          )
        }
      </div>
    </>
  )
}