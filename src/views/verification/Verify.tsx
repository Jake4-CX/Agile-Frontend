import { useNavigate, useParams } from "react-router-dom";
import { GeneralLayout } from "../../layouts/general"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { VerifyService } from "../../API/Services/VerifyService";
import { AxiosError, AxiosResponse } from "axios";

export const Verify = (props: any) => {

  const navigate = useNavigate();
  const { verification_uuid } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>();

  const { verifyEmail } = VerifyService();

  const uuid_regex = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$");

  if (verification_uuid === undefined) {
    // Redirect user to previous page and display a toast message
    useEffect(() => {
      navigate(-1)
      toast.error("This page requires providing a verification UUID")
    }, [])
    return <></>
  } else if (!uuid_regex.test(verification_uuid)) {
    // Redirect user to previous page and display a toast message
    useEffect(() => {
      navigate(-1)
      toast.error("Verification UUID must be a valid UUID")
    }, [])
    return <></>
  }

  // Query the backend to verify the user's account
  useEffect(() => {
    const verify = async () => {

      try {
        const response: AxiosResponse<any, any>&{response?: any} = await verifyEmail(verification_uuid)

        if (response.status === 200) {
          setVerified(true)
        } else {
          setVerified(false)
          if (response.response.data.message) {
            console.warn(response.response.data.message)
          }
        }
      } catch (error: any) {
        setVerified(false)
      }

      setLoading(false)
    }
    
    verify();
  }, []);

  return (
    <GeneralLayout>
      <div className='flex flex-grow justify-center items-center h-[960px] max-h-screen w-full my-16'>
        <main className='rounded-t-2xl rounded-b-md bg-white mx-auto p-8 md:pt-12 shadow-2xl w-11/12 max-w-lg'>

          {
            !loading ? (
              verified ? (
                <>
                  <section>
                    <h3 className='text-2xl font-bold'>Verified</h3>
                    <p className='text-gray-500 pt-2'>Your account has been verified!</p>
                  </section>

                  <hr className='h-0 my-2 -mx-8 border border-solid border-t-0 border-gray-600 opacity-10'></hr>

                  <section className='mt-6'>
                    <div className='flex flex-col'>
                      <button onClick={() => navigate('/login')} className='w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200' type='submit'>Login</button>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <a>This verify UUID could not verify</a>
                </>
              )
            ) : (
              <>
                <a>Loading</a>
              </>
            )
          }

        </main>
      </div>
    </GeneralLayout>
  )
}