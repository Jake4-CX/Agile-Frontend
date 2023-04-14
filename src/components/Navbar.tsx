import React, { Fragment, useState } from "react";
import { Menu, Transition } from '@headlessui/react'
import { Navigate, useNavigate } from "react-router-dom";

import { FiMenu, FiChevronDown, FiLogOut, FiSettings } from "react-icons/fi";
import { BsPersonFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";

import { UseAuth } from "../API/Services/UseAuth";

export function Navbar() {

  const navigate = useNavigate();
  const { getCurrentUser } = UseAuth();
  const user = getCurrentUser();

  const navLinks = [
    { "title": "Home", "link": "/" },
    { "title": "All reports", "link": "/reports" },
    { "title": "Help", "link": "/help" }
  ]

  const [isBurger, setIsBurger] = useState(false);

  return (
    <>
      <header className="bg-[#3E4756] border-b border-[#7A7A7A] py-4 z-20">
        <div className="flex items-center justify-between xl:max-w-7xl max-w-full px-[8%] xl:mx-auto flex-wrap w-full">
          <img src="https://www.fixmystreet.com/cobrands/fixmystreet.com/images/site-logo-homepage.png" alt="logo" className="w-36" onClick={() => navigate("/")} />
          {
            isBurger ? (
              <ImCross className="lg:hidden block text-white hover:text-slate-300 text-2xl cursor-pointer duration-150" onClick={() => setIsBurger(!isBurger)} />
            ) : (
              <FiMenu className="lg:hidden block text-white hover:text-slate-300 text-3xl cursor-pointer duration-150" onClick={() => setIsBurger(!isBurger)} />
            )
          }

          <nav className={`${isBurger ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto w-full`}>
            <ul className="text-base text-gray-700 lg:flex lg:justify-between">
              {
                navLinks.map((link, index) => (
                  <li key={index}>
                    <a onClick={() => navigate(link.link)} className="lg:px-4 py-2 block text-[#FFF] hover:text-[#A2ACBD] font-medium duration-150 cursor-pointer">{link.title}</a>
                  </li>
                ))
              }
              <li key={navLinks.length + 1} className="lg:ml-4">
                {

                  user ? (
                    <>
                      {dropDown(user)}
                    </>
                  ) : (
                    <>
                      <a onClick={() => navigate("/login")} className="block lg:px-6 py-2 bg-[#353535] hover:bg-[#3f3f3f] text-white text-center font-medium capitalize rounded-xl cursor-pointer duration-150">Login</a>
                    </>
                  )
                }
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )

}

function dropDown(user: Users) {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="top-16 w-full lg:text-right">
        <Menu as="div" className="w-full relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-[#353535] lg:px-6 py-2 text-sm font-medium text-white hover:bg-[#3f3f3f] duration-150">
              {user.first_name + " " + user.last_name}
              <FiChevronDown className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-full lg:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">

                <Menu.Item>
                  {({ active }) => (
                    <a
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => navigate("/dashboard")}
                    >
                      <img className="pointer-events-none flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="/assets/images/default-user-icon.jpg" alt="avatar" />
                      <div className="mx-1">
                        <h1 className={`${active ? '' : 'text-gray-700 dark:text-gray-200'} text-sm font-semibold`}>{user.first_name} {user.last_name}</h1>
                        <p className={`${active ? '' : 'text-gray-700 dark:text-gray-200'} text-sm`}>{user.user_email}</p>
                      </div>
                    </a>

                  )}
                </Menu.Item>

              </div>
              <div className="px-1 py-1 ">

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => (navigate("/profile"))}
                    >
                      {active ? (
                        <BsPersonFill className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <BsPersonFill className="mr-2 h-5 w-5 text-[#a78bfa]" aria-hidden="true" />
                      )}
                      My Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => (navigate("/settings"))}
                    >
                      {active ? (
                        <FiSettings
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <FiSettings
                          className="mr-2 h-5 w-5 text-[#a78bfa]"
                          aria-hidden="true"
                        />
                      )}
                      Settings
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => (navigate("/logout"))}
                    >
                      {active ? (
                        <FiLogOut
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <FiLogOut
                          className="mr-2 h-5 w-5 text-[#a78bfa]"
                          aria-hidden="true"
                        />
                      )}
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  )
}