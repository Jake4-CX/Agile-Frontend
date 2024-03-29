import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { GeneralLayout } from '../../layouts/general';
import { VerifyService } from '../../API/Services/VerifyService';
import { toast } from 'react-toastify';

export const Forgot = (props: any) => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const { forgotPassword } = VerifyService()

  const handleSubmit = async (e: any) => {
    e.preventDefault()


    try {
      const res = await forgotPassword(email)

      if (res.status === 200) {
        toast.success("Email sent")
        navigate('/login')
      } else {
        toast.error("Failed to send email")
      }

    } catch (err) {
      console.log(err)
    }
  }



  return (
    <GeneralLayout>
      <div className='flex flex-grow justify-center items-center h-[960px] max-h-screen w-full my-16'>
        <main className='rounded-t-2xl rounded-b-md bg-white mx-auto p-8 md:pt-12 shadow-2xl w-11/12 max-w-lg'>
          <section>
            <h3 className='text-2xl font-bold'>Forgot Password</h3>
            <p className='text-gray-500 pt-2'>Enter your email address to reset your password</p>
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

                <button className='w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200' type='submit'>Submit</button>

              </form>
            </div>
          </section>
        </main>
      </div>
    </GeneralLayout>
  )
}