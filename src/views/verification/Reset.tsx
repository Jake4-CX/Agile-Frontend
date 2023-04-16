import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { GeneralLayout } from "../../layouts/general";
import { VerifyService } from "../../API/Services/VerifyService";
import React from "react";

export const Reset = (props: any) => {

  const navigate = useNavigate();
  const [password, setPassword] = useState('')

  const passwordInput = React.createRef<HTMLInputElement>()

  const { verification_uuid } = useParams();

  const { checkResetPasswordToken, resetPassword } = VerifyService();

  if (verification_uuid === undefined) {
    // Redirect user to previous page and display a toast message
    useEffect(() => {
      navigate(-1)
      toast.error("This page requires providing a verification UUID")
    }, []);
    return <></>
  }

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await checkResetPasswordToken(verification_uuid);

        if (response.status !== 200) {
          console.log(response.data.message)
          toast.error("Invalid verification token!")
          navigate(-1)
          return
        }

      } catch (error) {
        toast.error("Invalid token!")
        navigate(-1)
        return
      }
    }

    verify();
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(password)

    if (password.length == 0) {
      toast.error("Your password cannot be empty!")
      return
    }

    try {
      const response = await resetPassword(verification_uuid, password)

      if (response.status === 200) {
        toast.success("Your password has been reset!")
        navigate("/login")
      } else {
        toast.error("Something went wrong!")
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  useEffect(() => {
    if (password.length == 0 || password == "") {
      passwordInput.current?.classList.remove("border-green-500")
      passwordInput.current?.classList.remove("border-orange-500")
      passwordInput.current?.classList.remove("border-yellow-500")
      passwordInput.current?.classList.remove("border-red-500")
      passwordInput.current?.classList.add("border-gray-300")

      return;
    };

    const requirements = {
      number: new RegExp('.*[0-9]').test(password),
      lowerAlphabet: new RegExp('.*[a-z]').test(password),
      upperAlphabet: new RegExp('.*[A-Z]').test(password),
      symbols: new RegExp('.*[!@?#$£*]').test(password),
      length: new RegExp('.{8,}').test(password),
      recommendedLength: new RegExp('.{12,}').test(password)
    }

    var count = 0;

    for (const key in requirements) {

      if (requirements.hasOwnProperty(key)) {
        if (requirements[key as keyof typeof requirements]) {
          count++;
        }

      }
    }

    passwordInput.current?.classList.remove("border-gray-300")

    passwordInput.current?.setCustomValidity(count < 3 ? "Password must contain at least 3 of the following: 1 uppercase letter, 1 lowercase letter, 1 number, 1 symbol, and 8 characters (12 recommended)" : "")
    if (count < 3) {
      passwordInput.current?.classList.remove("border-green-500")
      passwordInput.current?.classList.remove("border-orange-500")
      passwordInput.current?.classList.remove("border-yellow-500")
      passwordInput.current?.classList.add("border-red-500")
    } else if (count <= 4) {
      passwordInput.current?.classList.remove("border-green-500")
      passwordInput.current?.classList.remove("border-red-500")
      passwordInput.current?.classList.remove("border-yellow-500")
      passwordInput.current?.classList.add("border-orange-500")
    } else if (count <= 5) {
      passwordInput.current?.classList.remove("border-green-500")
      passwordInput.current?.classList.remove("border-red-500")
      passwordInput.current?.classList.remove("border-orange-500")
      passwordInput.current?.classList.add("border-yellow-500")
    } else {
      passwordInput.current?.classList.remove("border-red-500")
      passwordInput.current?.classList.remove("border-orange-500")
      passwordInput.current?.classList.remove("border-yellow-500")
      passwordInput.current?.classList.add("border-green-500")
    }

  }, [password]);

  return (
    <GeneralLayout>
      <div className='flex flex-grow justify-center items-center h-[960px] max-h-screen w-full my-16'>
        <main className='rounded-t-2xl rounded-b-md bg-white mx-auto p-8 md:pt-12 shadow-2xl w-11/12 max-w-lg'>
          <section>
            <h3 className='text-2xl font-bold'>Reset Password</h3>
            <p className='text-gray-500 pt-2'>Enter a new password</p>
          </section>

          <hr className='h-0 my-2 -mx-8 border border-solid border-t-0 border-gray-600 opacity-10'></hr>

          <section className='mt-6'>
            <div className='flex flex-col'>

              <form onSubmit={handleSubmit}>
                {/* Password */}
                <div className='mb-6 pt-6 rounded bg-gray-200'>
                  <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='password'>Password</label>
                  <input ref={passwordInput} className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' />
                </div>

                <button className='w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200' type='submit'>Reset Password</button>

              </form>
            </div>
          </section>
        </main>
      </div>
    </GeneralLayout>
  )
}