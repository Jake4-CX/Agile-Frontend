


export const MapKeys = (props: any) => {

  const setShowMapKeys = props.setShowMapKeys as React.Dispatch<React.SetStateAction<boolean>>;

  return (
    <>
      <div className="absolute inset-0 overflow-auto z-30 flex justify-center items-center bg-slate-900/10 backdrop-blur-sm rounded-b-xl lg:rounded-xl shadow-lg">
        <div onClick={() => setShowMapKeys(false)} className="fixed inset-0 z-10"></div>
        <div className="bg-gray-300/70 rounded-lg shadow-lg p-4 z-20">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col items-center h-full">
              <h1 className="text-lg font-medium text-center">Map keys</h1>
              <hr className="w-10/12 border-x-2 border-gray-600" />
              <div className="w-full h-full my-4 mx-6 space-y-6">

                <div className="grid place-items-center grid-cols-3 col-span-1 w-full h-18" key={1}>
                  <span className="font-semibold col-span-2">Selected Location: </span>
                  <img className="z-20 w-6 text-center" src="assets/images/orange_pointer_maps.png" />
                </div>

                <div className="grid place-items-center grid-cols-3 col-span-1 w-full h-18" key={2}>
                  <span className="font-semibold col-span-2">Open Report: </span>
                  <img className="z-20 w-6" src="assets/images/brown_pointer_maps.png" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}