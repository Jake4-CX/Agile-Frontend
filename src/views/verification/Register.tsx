import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../API/Services/UseAuth';
import { toast } from 'react-toastify'
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
import { GeneralLayout } from '../../layouts/general';

export const Register = (props: any) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const passwordInput = React.createRef<HTMLInputElement>()

  const [recaptchaToken, setRecaptchaToken] = useState('')
  const recaptchaRef = React.createRef<ReCAPTCHA>()

  const { registerRequest } = UseAuth()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if all data is not empty
    if (!email || !password || !firstName || !lastName) {
      toast.error("You are required to enter all fields!");
      return;
    }

    if (recaptchaToken === '') {
      toast.error("Please verify that you are not a robot")
      return
    }

    try {
      const resp = await registerRequest(email, password, firstName, lastName, recaptchaToken) as any

      recaptchaRef.current?.reset()
      setRecaptchaToken('')

      if (resp.status === 200) {
        toast.success("You have registered successfully!");
        navigate('/login');
      } else {
        console.log(resp)
        toast.error(resp.response.data.message);
      }

    } catch (err: any) {
      console.log(err)
      err.response === undefined ? toast.error("Unable to query API") :
        (err.response.status === 401 ? toast.error(err.response.data.message) : toast.error("Something went wrong!"));
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
      <div className="flex flex-col justify-center items-center">

        <div className='flex flex-grow justify-center items-center h-[960px] max-h-screen w-full my-16'>
          <main className='rounded-t-2xl rounded-b-md bg-white mx-auto p-8 md:pt-12 shadow-2xl w-11/12 max-w-lg'>
            <section>
              <h3 className='text-2xl font-bold'>Register</h3>
              <p className='text-gray-500 pt-2'>Create a new account</p>
            </section>

            <hr className='h-0 my-2 -mx-8 border border-solid border-t-0 border-gray-600 opacity-10'></hr>

            <section className='mt-6'>
              <div className='flex flex-col'>
                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className='mb-6 pt-6 rounded bg-gray-200'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='email'>Email<a className='text-red-700 font-medium'>*</a></label>
                    <input className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={email} onChange={(e) => setEmail(e.target.value)} type='email' name='email' placeholder='your@email.com' required />
                  </div>

                  {/* firstName */}
                  <div className='mb-6 pt-6 rounded bg-gray-200'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='firstName'>First Name<a className='text-red-700 font-medium'>*</a></label>
                    <input className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={firstName} onChange={(e) => setFirstName(e.target.value)} type='text' name='firstName' placeholder='John' required />
                  </div>

                  {/* lastName */}
                  <div className='mb-6 pt-6 rounded bg-gray-200'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='lastName'>Last Name<a className='text-red-700 font-medium'>*</a></label>
                    <input className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={lastName} onChange={(e) => setLastName(e.target.value)} type='text' name='lastName' placeholder='Smith' required />
                  </div>

                  {/* Password */}
                  <div className='mb-6 pt-6 rounded bg-gray-200'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='password'>Password<a className='text-red-700 font-medium'>*</a></label>
                    <input ref={passwordInput} className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={password} onChange={(e) => setPassword(e.target.value)} type='password' name='password' placeholder='password' required />
                  </div>

                  {/* Forgot password */}
                  <div className='flex justify-end'>
                    <p className='text-sm text-gray-700 hover:text-gray-900 hover:underline mb-6'>
                      <a className='cursor-pointer' onClick={() => navigate('/forgot')}>Forgot password?</a>
                    </p>
                  </div>

                  <button className='w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200' type='submit'>Register</button>

                  {/* ReCaptcha */}
                  <div className='flex items-center justify-center mt-4'>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={(token) => token && setRecaptchaToken(token)}
                      onExpired={() => setRecaptchaToken('')}
                    />
                  </div>

                </form>

                {/* Sign up */}
                <div className='max-w-lg mx-auto text-center mt-12 mb-6'>
                  <p className='text-gray-700'>
                    Already have an account?&nbsp;
                    <a className='transition duration-500 font-bold hover:underline hover:text-gray-800 cursor-pointer' onClick={() => navigate('/login')}>Sign in.</a>
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </GeneralLayout>
  )
}