import axios from '../../API/axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../API/Services/UseAuth';
import { toast } from 'react-toastify'

export const Register = (props: any) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const {registerRequest} = UseAuth()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if all data is not empty
    if (!email || !password || !firstName || !lastName) {
      toast.error("You are required to enter all fields!");
      return;
    }

    try {
      const resp = await registerRequest(email, password, firstName, lastName)
      toast.success("You have registered successfully!");
      navigate('/login');
    } catch (err: any) {
      console.log(err)
      err.response === undefined ? toast.error("Unable to query API") :
      (err.response.status === 401 ? toast.error(err.response.data.message) : toast.error("Something went wrong!"));
    }

  }


  return (
    <>
      <div className='flex justify-center items-center h-screen bg-theme-gray-slate'>
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
                  <input className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={password} onChange={(e) => setPassword(e.target.value)} type='password' name='password' placeholder='password' required />
                </div>

                {/* Forgot password */}
                <div className='flex justify-end'>
                  <p className='text-sm text-gray-700 hover:text-gray-900 hover:underline mb-6'>
                    <a className='cursor-pointer' onClick={() => navigate('/forgot')}>Forgot password?</a>
                  </p>
                </div>

                <button className='w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200' type='submit'>Login</button>
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
    </>
  )
}