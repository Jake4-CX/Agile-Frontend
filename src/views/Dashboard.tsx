import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../API/axios";
import { Footer } from "../components/Footer";
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
              <p>This is the dashboard page</p>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}