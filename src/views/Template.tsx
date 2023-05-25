import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { GeneralLayout } from "../layouts/general"

export const Template = (props: any) => {
  return (
    <GeneralLayout>
      <div className="flex flex-col justify-center items-center">
        <p>Some text</p>
      </div>

    </GeneralLayout>
  )

}

