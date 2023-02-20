import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../API/axios";
import { Footer } from "../components/Footer";
import { MyReports } from "../components/MyReports";
import { Navbar } from "../components/Navbar";

export const Dashboard = (props: any) => {

  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-white dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="flex-grow">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold ml-0 m-auto px-4 pt-8 pb-2">Dashboard</h1>
              <hr className="border-gray-300 border-x-2" />
              {/* My Reports */}  
              <div className="bg-gray-200 rounded-lg shadow-lg px-6 py-4 w-7/12 h-[428px] my-4">
                <h2 className="text-2xl font-medium text-[#000]">Your Reports</h2>
                <hr className="border-gray-300 border-x-2" />

                <div className="flex items-center justify-center">
                  {/* Table */}
                  <div className="flex flex-col mt-4 w-full items-center">
                    {/* Potentially turn MyReports into a shared table and provide table results as a prop */}
                    <MyReports /> 
                  </div>
                </div>
              </div>

              {/* Recent reports in my area */}
              <div className="bg-gray-200 rounded-lg shadow-lg px-6 py-4 w-7/12 h-[428px] my-4">
                <h2 className="text-2xl font-medium text-[#000]">Recent reports in your area</h2>
                <hr className="border-gray-300 border-x-2" />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}