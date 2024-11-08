'use client'

import React from 'react'
import { FaFolderPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const page = () => {
    return (
        <>
            <div className='container-1'>
                <div className='space-section'>
                    <div className='my-3'>
                        <h1>Spaces</h1>
                    </div>
                    <div className='text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
                        <div className='text-3xl text-slate-400 w-fit mx-auto  my-2'>
                            <FaFolderPlus />
                        </div>
                        <div className='text-center  my-2'>
                            <h2>No Spaces yet</h2>
                        </div>
                        <div className='text-center my-2'>
                            <p>Create your first space to start collecting testimonials</p>
                        </div>

                        <div className=''>
                            <button className='btn fit-content' onClick={() => document.getElementById('firstModal').showModal()} >
                                Create a new Space
                            </button>
                        </div>





                        <dialog id="firstModal" className='max-w-[50%] absolute  rounded-md duration-150 p-8'>
                            <button onClick={() => document.getElementById('firstModal').close()}
                                className="w-fit absolute top-2 right-3">
                                <IoMdClose />
                            </button>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-blue-300 w-full h-full rounded-md"></div>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui o fficia deserunt mollit anim id est laborum.
                                    </div>
                                </div>
                            </div>
                        </dialog>




                    </div>
                </div>
            </div>

        </>
    )
}

export default page