'use client'

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown';
import Link from 'next/link';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { data: session, status } = useSession();



    const toggle = () => {
        setShow(!show);
    }





    return (
        <>
            <section className='bg-white'>
                <nav >
                    <div className="container-1 mx-auto">
                        <div className='flex justify-between items-center'>
                            <div className='w-[150px] h-auto overflow-hidden cursor-pointer '>
                                <Link href={'/'}>
                                    <Image
                                        src="https://testimonial.to/static/media/logo-dark.8447f219.svg"
                                        alt="testimonial logo"
                                        width={0}
                                        height={0}
                                        priority
                                    />
                                </Link>
                            </div>


                            <div className={`flex gap-x-3 items-center ${session ? '' : 'hidden'}`}>
                                <div className='hidden md:block'>
                                    <Link className='btn fit-content' href={'/dashboard'}>
                                        Dashboard
                                    </Link>
                                </div>
                                <button className='relative' onClick={() => toggle()} >
                                    <div className='avatar '>
                                        <Image
                                            src={session?.user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            alt="session profile"
                                            sizes='100%'
                                            fill
                                        />
                                    </div>
                                    <Dropdown main={show ? '' : 'hidden'} />
                                </button>
                            </div>



                            <div className={`flex gap-x-3 items-center ${session ? 'hidden' : ''}`}>
                                <div className='hidden md:block'>
                                    <Link className='btn-transparent fit-content' href={'/api/auth/signin'}>
                                        Sign In
                                    </Link>
                                </div>

                                <div className='hidden md:block'>
                                    <Link className='btn fit-content' href={'/signup'}>
                                        Sign Up
                                    </Link>
                                </div>
                            </div>


                        </div>
                    </div>
                </nav>
            </section>
        </>
    )
}

export default Navbar