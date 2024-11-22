'use client'

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'

const Navbar = () => {

    const { data: session } = useSession();

    return (
        <>
            <section className='bg-white'>
                <nav >
                    <div className="container-1 mx-auto">
                        <div className='flex justify-between items-center'>
                            <div className='relative w-[180px] h-auto overflow-hidden'>
                                <Image
                                    src="https://testimonial.to/static/media/logo-dark.8447f219.svg"
                                    alt="your space"
                                    width={180}
                                    height={0}
                                />
                            </div>




                            <div>
                                <button onClick={() => signOut()}>
                                    <div className='avatar'>
                                        <Image
                                            src={session?.user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            alt="your space"
                                            width={180}
                                            height={0}
                                        />
                                    </div>
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