'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  const { data: session } = useSession();

  console.log('check the session', session);
  return (
    <>
      <div className='container-1'>
        <h1>home page {session?.user?.userId}</h1>
      </div>
    </>
  )
}

export default page