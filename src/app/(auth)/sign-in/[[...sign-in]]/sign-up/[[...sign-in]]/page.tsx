import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500'>
      <SignUp />
    </div>
  )
}