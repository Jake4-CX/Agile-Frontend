import React, { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export const Login = (props: any) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(email, password)

    axios.post('/users/login', {
      user_email: email,
      user_password: password,
    }).then((res) => {
      console.log(res)

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        toast.success("You have logged in successfully!");
        navigate('/');
      } else {
        toast.error("An error occoured");
      }
    }).catch((err) => {
      console.log(err)

      if (err.response.status === 500) {
        console.log(err.response.data.message);
        toast.error("Invalid credentials!");
      }
    });


  }

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-theme-gray-slate'>
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
              </form>

              {/* Sign up */}
              <div className='max-w-lg mx-auto text-center mt-12 mb-6'>
                <p className='text-gray-700'>
                  Don't have an account?&nbsp;
                  <a className='transition duration-500 font-bold hover:underline hover:text-gray-800 cursor-pointer' onClick={() => navigate('/register')}>Sign up.</a>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}