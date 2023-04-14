import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";


type Props = {
  children: React.ReactNode;
};

export const GeneralLayout: React.FC<Props> = ({ children }: Props) => {

  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#f8f8f8] dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">

          {/* Navbar */}
          <Navbar />

          <section className="min-h-full flex-grow">
            {children}
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>

    </>
  )
}