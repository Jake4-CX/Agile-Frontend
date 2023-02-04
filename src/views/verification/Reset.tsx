import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'

export const Reset = (props: any) => {

  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { token } = useParams()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(password, confirmPassword)
    console.log(token)
    toast.success("Password reset successfully!");
    toast.error("Password reset failed!");
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-theme-gray-slate'>
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
                  <input className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' />
                </div>

                {/* Confirm Password */}
                <div className='mb-6 pt-6 rounded bg-gray-200'>
                  <label className='block text-gray-700 text-sm font-bold mb-2 ml-3' htmlFor='password'>Confirm Password</label>
                  <input className='bg-gray-200 rounded w-full text-geay-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 bg-clip-text' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='password' />
                </div>

                <button className='w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200' type='submit'>Reset Password</button>

              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}