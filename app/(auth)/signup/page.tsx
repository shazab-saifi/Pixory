'use client'

import Form from '@/components/Form'
import Navbar2 from '@/components/Navbar2'
import { CredentialsTypes } from '@/lib/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();

  const handleSignUp = async ({ email, name, password }: CredentialsTypes) => {
    try {
      const user = await axios.post('/api/auth/signup', {
        email,
        name,
        password
      });

      if (user.statusText === "OK") {
        router.push('/signin');
      } else {
        return;
      }
    } catch (error) {
      console.error(`Some internal server error occured : ${error}`);
    }
  }

  return (
    <div className='w-full h-full'>
      <Navbar2 />
      <div className='w-full h-full flex items-center justify-center'>
        <div className='w-sm flex flex-col items-center justify-center gap-4 md:gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <h1 className="font-semibold text-3xl w-full text-center">Sign Up</h1>
          <Form reqfn={handleSignUp} />
        </div>
      </div>
    </div>
  )
}

export default page