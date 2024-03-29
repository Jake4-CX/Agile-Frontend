import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseAuth } from '../../API/Services/UseAuth'
import { toast } from 'react-toastify'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import axios from '../../API/axios'
import ReCAPTCHA from 'react-google-recaptcha'
import { GeneralLayout } from '../../layouts/general'


export const Login = (props: any) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const recaptchaRef = React.createRef<ReCAPTCHA>()

  const { loginRequest } = UseAuth()


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email, password)

    if (recaptchaToken === '') {
      toast.error("Please verify that you are not a robot")
      return
    }

    try {
      const resp = await loginRequest(email, password, recaptchaToken) as any

      recaptchaRef.current?.reset()
      setRecaptchaToken('')

      if (resp.status === 200) {
        localStorage.setItem('accessToken', resp.data.tokens.accessToken);
        localStorage.setItem('refreshToken', resp.data.tokens.refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        delete resp.data.tokens;
        localStorage.setItem('user', JSON.stringify(resp.data));
        toast.success("You have logged in successfully!");
        navigate('/');
      } else {
        toast.error(resp.response.data.message);
      }

    } catch (err: any) {
      console.log("Something went wrong?")
      toast.error("Failed to query API")
    }

  }

  return (
    <GeneralLayout>
      <div className="flex flex-col justify-center items-center">

        <div className='flex flex-grow justify-center items-center h-[960px] max-h-screen w-full'>
          <main className='rounded-t-2xl rounded-b-md bg-white mx-auto p-8 md:pt-12 shadow-2xl w-11/12 max-w-lg'>
            <section>
              <h3 className='text-2xl font-bold'>Login</h3>
              <p className='text-gray-500 pt-2'>Sign in to your account</p>
            </section>

            <hr className='h-0 my-2 -mx-8 border border-solid border-t-0 border-gray-600 opacity-10'></hr>

            <section className='mt-6'>
              <div className='flex flex-col'>
                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className='mb-6 pt-6 rounded bg-gray-200'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='email'>Email</label>
                    <input className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='your@email.com' />
                  </div>

                  {/* Password */}
                  <div className='mb-6 pt-6 rounded bg-gray-200'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='password'>Password</label>
                    <input className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' />
                  </div>

                  {/* Forgot password */}
                  <div className='flex justify-end'>
                    <p className='text-sm text-gray-700 hover:text-gray-900 hover:underline mb-6'>
                      <a className='cursor-pointer' onClick={() => navigate('/forgot')}>Forgot password?</a>
                    </p>
                  </div>

                  <button className='w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200' type='submit'>Login</button>

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
                <div className='max-w-lg mx-auto text-center my-6'>
                  <p className='text-gray-700'>
                    Don't have an account?&nbsp;
                    <a className='transition duration-500 font-bold hover:underline hover:text-gray-800 cursor-pointer' onClick={() => navigate('/register')}>Sign up.</a>
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