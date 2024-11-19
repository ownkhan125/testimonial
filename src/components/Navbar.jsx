'use client'

import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'

const Navbar = () => {

    const { data: session } = useSession();
    console.log('check session ', session?.user?.image);


    if (!session) {
        return <p>User is not logged in.</p>;
    }

    return (
        <>
            <section className='bg-white'>
                <nav>
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




                            <div >
                                <button>
                                    <div className='avatar bg-slate-500'>
                                        <Image
                                            src={session?.user?.image || "https://testimonial.to/static/media/logo-dark.8447f219.svg"}
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