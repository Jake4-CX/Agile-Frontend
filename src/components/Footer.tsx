import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Footer() {

  const navigate = useNavigate();

  return (
    <>
      <footer className="bg-[#f8f8f8] dark:bg-gray-900 mt-16 relative inset-x-0 bottom-0 mb-0 mx-auto w-full 2xl:w-4/6">
        <div className="container p-6 mx-auto">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <img src="https://www.fixmystreet.com/cobrands/fixmystreet.com/images/site-logo-homepage.png" alt="logo" className="w-36" onClick={() => navigate("/")} />

                <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">Reporting local issues to your council made easy.</p>

                <div className="flex w-2/3">
                  <div className="flex flex-row space-x-2 mt-6 -mx-2">
                    <div className="flex">
                      <FaTwitter className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Twitter" />
                    </div>

                    <div className="flex">
                      <FaFacebook className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook" />
                    </div>

                    <div className="flex">
                      <FaInstagram className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Instagram" />
                    </div>

                    <div className="flex">
                      <FaYoutube className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="YouTube" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">About</h3>
                  <a onClick={() => navigate("/forgot")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Forgot Password</a>
                  <a onClick={() => navigate("/login")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Login</a>
                  <a onClick={() => navigate("/register")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Register</a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">Report a problem</h3>
                  <a onClick={() => navigate("/report")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Report a problem</a>
                  <a onClick={() => navigate("/reports")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Reports</a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">About</h3>
                  <a onClick={() => navigate("/help")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Contact Us</a>
                  <a onClick={() => navigate("/help")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Carrers</a>
                  <a onClick={() => navigate("/help")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Help</a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
                  <a href="tel:+4401452425000" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">+44 01452 425000</a>
                  <a href="mailto:contact@fixmystreet.com?subject=Support" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">contact@fixmystreet.com</a>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

          <div>
            <p className="text-center text-gray-500 dark:text-gray-400">© FixMyStreet 2023 - All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}