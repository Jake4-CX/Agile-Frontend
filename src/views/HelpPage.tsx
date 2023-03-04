import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export const HelpPage = (props: any) => {
  return (
    <>
      {/* Background image */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-white dark:bg-[#1d2029]"></div>
      <div className="flex flex-col min-h-screen">
        <div className="px-0 mx-auto w-full 2xl:w-4/6 flex flex-col flex-grow">
          <Navbar />

          <section className="min-h-full flex-grow">
            <div className="flex flex-col justify-center items-center">
              <p>Some text</p>
            </div>

          </section>

        </div>
        <Footer />
      </div>
    </>
  )

}

