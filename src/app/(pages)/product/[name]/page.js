'use client';


import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {

    const params = useParams();
    return (
        <>

            <h1>own khan {params.name}</h1>
        </>
    )
}

export default page