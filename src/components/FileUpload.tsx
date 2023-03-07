import { useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { ImCross } from "react-icons/im"
import { toast } from "react-toastify"

export const FileUpload = ({ files, setFiles }: any) => {

  const uploadFileRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const uploadFile = (e: any) => {
    console.log(e.target.files)
    const uploadFiles = Array.from(e.target.files)

    if (uploadFiles.length > 4) {
      toast.warn("You can only assign a maximum of 4 photographs to this report.")
      return
    }

    setFiles(uploadFiles)
    console.log(files)
  }

  const onDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("dragenter")
    setDragActive(true)
  }

  const onDragLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("dragleave")
    setDragActive(false)
  }

  const onFileDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("drop")
    console.log(e.dataTransfer.files)

    if (e.dataTransfer.files.length > 4) {
      toast.warn("You can only assign a maximum of 4 photographs to this report.")
      return
    }

    setFiles(e.dataTransfer.files)
    setDragActive(false)
  }

  const removeFile = (file: any) => {
    const updatedList = [...files as FileList]

    const fileIndex = Array.from(files).map((obj: any, index: number) => {
      if (file == obj) {
        return index
      }
    }).filter(isFinite as any)[0]

    if (fileIndex !== undefined) {
      updatedList.splice(fileIndex, 1)
      setFiles(updatedList)
  
      console.log(updatedList)
    }

  }

  return (
    <>
      {previewPhotos()}
      {uploadPhotos()}
    </>
  )

  function uploadPhotos() {
    return (
      <>
        <div className="flex flex-wrap mt-6 mb-12 justify-center"
          onClick={() => uploadFileRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onFileDrop}
        >
          <div className="w-full h-full">
            <div className={`bg-white rounded-lg border-2 shadow-lg hover:shadow-xl transition duration-500 relative text-center p-6 cursor-pointer ${dragActive ? 'border-slate-800 bg-slate-300' : 'border-dashed'}`}
            >
              <div className="flex flex-col items-center">
                <FiUpload className="text-5xl text-slate-900 hover:text-slate-700 transition duration-300 mb-6" />
                <a className="block text-lg font-bold">Upload Photographs</a>
              </div>
              <input ref={uploadFileRef} className="hidden" type="file" multiple accept="image/*" onChange={uploadFile} />
            </div>
          </div>
        </div>
      </>
    )
  }

  function previewPhotos() {
    return (
      <>
        <div className="flex flex-wrap mt-6 mb-12 justify-center">
          {
            files && Array.from(files).map((file: any) => (
              <>
                <div className={`w-full max-w-full p-3 md:w-1/2 ${files.length > 2 ? 'xl:w-1/3' : (files.length == 2 ? 'xl:w-1/2' : 'xl:w-full')}`}>
                  <div className="bg-white rounded-lg shadow-lg m-w-sm hover:shadow-2xl transition duration-300 relative">
                    <div className="rounded-t-lg w-full bg-cover bg-no-repeat bg-center object-fill h-48" style={{ backgroundImage: 'url(' + URL.createObjectURL(file) + ')' }} />
                    <ImCross className="z-10 absolute top-3 right-3 text-xl text-gray-50 hover:text-red-500 transition duration-300 cursor-pointer" onClick={() => removeFile(file)} />
                    <div className="p-3">
                      <p className="text-center font-semibold pb-2 truncate overflow-hidden ...">{file.name}</p>
                    </div>
                  </div>
                </div>
              </>
            ))
          }
        </div>
      </>
    )
  }
}