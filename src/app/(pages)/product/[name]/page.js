'use client';


import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {

    const params = useParams();
    return (
        <>

            <div className='container-1'>
                <h1>own khan {params.name}</h1>
            </div>
        </>
    )
}

export default page