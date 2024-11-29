'use client'

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useState } from 'react'
import Dropdown from './Dropdown';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { data: session } = useSession();



    const toggle = () => {
        setShow(!show);
    }

    return (
        <>
            <section className='bg-white'>
                <nav >
                    <div className="container-1 mx-auto">
                        <div className='flex justify-between items-center'>
                            <div className=' w-[180px] overflow-hidden'>
                                <Image
                                    src="https://testimonial.to/static/media/logo-dark.8447f219.svg"
                                    alt="your space"
                                    width={180}
                                    height={0}
                                    priority
                                />
                            </div>




                            <div>
                                <button className='relative' onClick={() => toggle()} >
                                    <div className='avatar'>
                                        <Image
                                            src={session?.user?.image}
                                            alt="your space"
                                            sizes='100%'
                                            fill
                                        />
                                    </div>
                                    <Dropdown main={show ? '' : 'hidden'} />
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
        </>
    )
}

export default Navbar