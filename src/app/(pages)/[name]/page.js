'use client'


import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaVideo } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdEdit } from "react-icons/md";


const page = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const name = params?.name;


    const toggle = () => {
        setShow(!show)
    }


    const fetchData = async () => {
        try {
            const res = await fetch(`/api/product/${name}`)
            const response = await res.json();
            setData(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])



    return (

        <>
            <div className='container-1'>
                <div className='max-w-3xl mx-auto text-center pb-6 md:pb-16'>
                    <div className='relative w-[100px] h-[100px] rounded-md overflow-hidden mx-auto my-2'>
                        <Image
                            src={data.image}
                            alt="Product"
                            fill={true}
                        />
                    </div>

                    <div className='mb-3'>
                        <h1 className='text-[52px]'>{data.name}</h1>
                    </div>

                    <div className='mb-3'>
                        <h2>{data.header}</h2>
                    </div>

                    <div className='w-fit flex flex-wrap gap-x-6 items-center justify-between mx-auto'>
                        <button className='btn gap-x-2 fit-content'>
                            <FaVideo />
                            Record a Video
                        </button>
                        <button className='btn gap-x-2 fit-content bg-black ' onClick={() => toggle()}>
                            <MdEdit className='text-lg' />
                            Send in Text
                        </button>
                    </div>
                </div>




                <div className={show ? 'modal' : 'hidden '}>
                    <button onClick={() => toggle()}
                        className="w-fit absolute top-2 right-3">
                        <IoMdClose className='text-xl' />
                    </button>
                    <p className='fs-18'>Write text testimonial to</p>

                    <div className='relative w-[40px] h-[40px] rounded-md overflow-hidden mx-auto my-2'>
                        <Image
                            src={data.image}
                            alt="Product"
                            fill={true}  
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page