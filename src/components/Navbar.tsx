import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiMenu } from "react-icons/fi";
import { ImCross } from "react-icons/im";

export function Navbar() {

  const navigate = useNavigate();

  const navLinks = [
    {"title": "Home", "link": "/"},
    {"title": "All reports", "link": "/reports"},
    {"title": "Help", "link": "/help"}
  ]

  const [isBurger, setIsBurger] = useState(false);

  return (
    <>
      <header className="bg-gray-600 border-b border-gray-400 py-4 z-20">
        <div className="flex items-center justify-between xl:max-w-7xl max-w-full px-[8%] xl:mx-auto flex-wrap w-full">
          <img src="https://www.fixmystreet.com/cobrands/fixmystreet.com/images/site-logo-homepage.png" alt="logo" className="w-36 ml-8" />
          {
            isBurger ? (
              <ImCross className="lg:hidden block text-white hover:text-slate-300 text-2xl mr-8 cursor-pointer duration-150" onClick={() => setIsBurger(!isBurger)} />
            ) : (
              <FiMenu className="lg:hidden block text-white hover:text-slate-300 text-3xl mr-8 cursor-pointer duration-150" onClick={() => setIsBurger(!isBurger)} />
            )
          }

          <nav className={ `${isBurger ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto w-full`}>
            <ul className="text-base text-gray-700 lg:flex lg:justify-between">
              {
                navLinks.map((link, index) => (
                  <li key={index}>
                    <a onClick={() => navigate(link.link)} className="lg:px-4 py-2 block text-white hover:text-sky-300 font-medium duration-150 cursor-pointer">{link.title}</a>
                  </li>
                ))
              }
              <li key={navLinks.length + 1} className="lg:ml-4">
                <a onClick={() => navigate("/login")} className="lg:px-6 py-2 block bg-blue-700 text-white font-medium rounded-xl cursor-pointer duration-150 text-center">Login</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )

}