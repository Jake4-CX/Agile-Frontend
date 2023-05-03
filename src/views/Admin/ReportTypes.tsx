import { useNavigate } from "react-router";
import { OptionsService } from "../../API/Services/OptionsService";
import { GeneralLayout } from "../../layouts/general";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AiFillEdit, AiFillEye, AiFillPlusCircle } from "react-icons/ai";
import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";


export const ReportTypes = (props: any) => {


  const navigate = useNavigate();
  const { getOptionsRequest, addReportTypeRequest, updateReportTypeRequest } = OptionsService();

  const [options, setOptions] = useState<ReportType[]>()

  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<ReportType>();

  useEffect(() => {
    const getOptions = async () => {
      const response = await getOptionsRequest();

      if (response && response.status === 200) {
        setOptions(response.data.types)
      } else {
        toast.error("Error getting report types");

      }
    }

    getOptions();
  }, []);

  const [typeName, setTypeName] = useState<string>("");
  const [typeDescription, setTypeDescription] = useState<string>("");
  const [selectedTypeIcon, setSelectedTypeIcon] = useState<string>("orange");

  function createType() {
    if (typeName === "" || typeDescription === "") {
      toast.error("Please fill in all fields");
      return;
    }

    const addType = async (newType: { type_name: string, type_description: string, type_icon: string }) => {
      const response = await addReportTypeRequest(newType.type_name, newType.type_description, newType.type_icon);

      if (response && response.status === 200) {
        toast.success("Type added successfully");
        setShowCreate(false);
        window.location.reload();
      } else {
        toast.error("Error adding type");
      }
    }

    const newType = {
      type_name: typeName,
      type_description: typeDescription,
      type_icon: selectedTypeIcon
    }

    console.log(newType);

    addType(newType);

  }

  function selectEdit(type: ReportType) {
    setSelectedType(type);
    setTypeName(type.report_type_name);
    setTypeDescription(type.report_type_description);
    setSelectedTypeIcon(type.report_type_icon);
    setShowEdit(true);
  }

  function editType() {

    if (selectedType === undefined) {
      toast.error("Please select a type");
      return;
    }
    if (typeName === "" || typeDescription === "") {
      toast.error("Please fill in all fields");
      return;
    }

    const updateType = async (newType: { type_id: number, type_name: string, type_description: string, type_icon: string }) => {
      const response = await updateReportTypeRequest(newType.type_id, newType.type_name, newType.type_description, newType.type_icon);

      if (response && response.status === 200) {
        toast.success("Type updated successfully");
        setShowEdit(false);
        window.location.reload();
      } else {
        toast.error("Error updating type");
      }
    }

    const newType = {
      type_id: selectedType.id,
      type_name: typeName,
      type_description: typeDescription,
      type_icon: selectedTypeIcon
    }

    console.log(newType);

    updateType(newType);

  }


  return (
    <GeneralLayout>
      <div className="flex items-center justify-center mt-4 md:mt-12">
        <div id="my-issues" className="flex flex-col w-10/12">
          <div className=" flex flex-col justify-center items-center p-2 dark:text-white text-2xl font-bold">
            <h1 className="py-1">Report Types</h1>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{(options !== undefined) ? options.length : 0} issues</span>
          </div>

          <div className="flex flex-col sm:items-end sm:justify-between px-10 py-4">
            <button onClick={() => setShowCreate(!showCreate)} className="flex items-center justify-center w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <AiFillPlusCircle className="w-5 h-5" />
              <span>Add Type</span>
            </button>
          </div>

          {
            options ? (
              <>
                <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-800 table-auto">
                      <tr>
                        {
                          ["ID", "Report Name", "Report Description", "Report Icon", "Actions"].map((columnName, key) => {
                            return <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{columnName}</th>
                          })
                        }
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                      {options.map((option, key) => {
                        return (
                          <>
                            <tr key={key}>
                              <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">{option.id}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{option.report_type_name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100 truncate overflow-hidden w-[24vw] md:w-[40vw] 2xl:w-[26vw]">{option.report_type_description}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{option.report_type_icon}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => selectEdit(option)} className="flex flex-row space-x-1 px-4 py-2 font-medium bg-gray-100 rounded-md hover:bg-gray-200 duration-150 cursor-pointer text-slate-600">
                                  <AiFillEdit className="w-5 h-5" />
                                  <span className="text-sm font-medium">Edit</span>
                                </button>
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Modal popup - Create & Edit Type. Required Arguments: Type Name, Type Description & type icon (dropdown listbox) */}

                {
                  showCreate && (
                    <>
                      <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="modal">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div onClick={() => setShowCreate(false)} className="fixed inset-0 bg-gray-500/25 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
                          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Create Type
                                  </h3>
                                  <div className="mt-2">
                                    <div className="flex flex-col space-y-2 pb-12">

                                      {/* Type Name */}
                                      <div className="flex flex-col space-y-1">
                                        <label htmlFor="report-name" className="text-sm font-medium text-gray-700">Type Name</label>
                                        <input onChange={(e) => setTypeName(e.target.value)} type="text" name="report-name" id="report-name" placeholder="Enter a name for the type" className="block w-full bg-gray-100 text-gray-700 rounded focus:outline-none border-b-4 border-gray-300 focus:border-indigo-500 transition duration-500 px-3 py-3" />
                                      </div>

                                      {/*  */}
                                      <div className="flex flex-col space-y-1">
                                        <label htmlFor="report-icon" className="text-sm font-medium text-gray-700">Type Icon</label>
                                        {iconSelector()}
                                      </div>

                                      {/* Description */}
                                      <div className="flex flex-col space-y-1">
                                        <label htmlFor="type-description" className="text-sm font-medium text-gray-700">Description</label>
                                        <textarea name="type-description" className="block w-full bg-gray-100 text-gray-700 rounded focus:outline-none border-b-4 border-gray-300 focus:border-indigo-500 transition duration-500 px-3 py-3 sm:text-sm h-[90px] m-h-[120px]" placeholder="Enter a description about the type" value={typeDescription} onChange={(e) => setTypeDescription(e.target.value)}></textarea>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button onClick={createType} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Create
                              </button>
                              <button onClick={() => setShowCreate(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }

                {/* Modal popup - like CreateType, but for Editing a type. */}

                {
                  showEdit && (
                    <>
                      <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="modal">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-gray-500/25 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
                          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Edit Type
                                  </h3>
                                  <div className="mt-2">
                                    <div className="grid grid-cols-1 gap-6">
                                      {/* Name */}
                                      <div className="flex flex-col space-y-1">
                                        <label htmlFor="type-name" className="text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" name="type-name" className="block w-full bg-gray-100 text-gray-700 rounded focus:outline-none border-b-4 border-gray-300 focus:border-indigo-500 transition duration-500 px-3 py-3 sm:text-sm" placeholder="Enter a name for the type" value={typeName} onChange={(e) => setTypeName(e.target.value)} />
                                      </div>

                                      {/* Icon */}
                                      <div className="flex flex-col space-y-1">
                                        <label htmlFor="type-icon" className="text-sm font-medium text-gray-700">Icon</label>
                                        {iconSelector()}
                                      </div>

                                      {/* Description */}
                                      <div className="flex flex-col space-y-1">
                                        <label htmlFor="type-description" className="text-sm font-medium text-gray-700">Description</label>
                                        <textarea name="type-description" className="block w-full bg-gray-100 text-gray-700 rounded focus:outline-none border-b-4 border-gray-300 focus:border-indigo-500 transition duration-500 px-3 py-3 sm:text-sm h-[90px] m-h-[120px]" placeholder="Enter a description about the type" value={typeDescription} onChange={(e) => setTypeDescription(e.target.value)}></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button onClick={editType} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Save
                              </button>
                              <button onClick={() => setShowEdit(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
              </>
            ) : (
              <>
                <p>Loading</p></>
            )
          }
        </div>
      </div>


    </GeneralLayout>
  )

  function iconSelector() {

    return (
      <>
        <Listbox value={selectedTypeIcon} onChange={setSelectedTypeIcon}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full bg-gray-100 text-gray-700 rounded border border-gray-300 focus:border-indigo-500 transition duration-500 px-3 py-3 text-left focus:outline-none">
              <span className="flex items-center">
                <span className="ml-3 block truncate capitalize">{selectedTypeIcon}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-50 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {["orange", "green", "blue", "brown", "purple", "red", "yellow"].map((icon, key) => (
                  <Listbox.Option
                    key={key}
                    className={({ active }) => `${active ? 'text-white bg-indigo-600' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`}
                    value={icon}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span className={`${selected ? 'font-semibold' : 'font-normal'} ml-3 block truncate capitalize`}>
                            {icon}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </>
    )
  }
}