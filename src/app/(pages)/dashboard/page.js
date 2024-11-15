'use client'

import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaFolderPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const page = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();


    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const name = watch("name");
    const img = watch("image");
    const square = watch("square");
    const header = watch("header");
    const message = watch("message");


    const handleDivClick = () => {

        console.log("Ref Current Value:", fileInputRef.current);
        // if (fileInputRef === null) {
        fileInputRef.current.click();
        // }
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const onSubmit = async (data) => {
        try {
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
            })

        } catch (error) {
            console.log('dashboard page:', error);
        }
        reset();
        document.querySelector('.space-Modal').close()
        setImage(null)
    };

    return (
        <>
            <div className='hero-section'>
                <div className='container-1'>
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

                        <div>
                            <button className='btn fit-content' onClick={() => document.querySelector('.space-Modal').showModal()} >
                                Create a new Space
                            </button>
                        </div>





                        <dialog className='space-Modal max-w-[60%] w-[100%] absolute  rounded-md duration-150 p-8'>
                            <button onClick={() => document.querySelector('.space-Modal').close()}
                                className="w-fit absolute top-2 right-3">
                                <IoMdClose />
                            </button>
                            <div className="flex items-start justify-between">
                                <div className="w-[40%] relative flex flex-col p-4 border rounded-md">
                                    <div className="w-[250px] absolute top-[-15px] left-0 text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-green-600 bg-green-200 rounded-full py-1 px-3">
                                        Live preview - Testimonial page
                                    </div>
                                    <div className='relative w-[80px] h-[80px] overflow-hidden mx-auto'>
                                        <Image
                                            src={"https://testimonial.to/static/media/just-logo.040f4fd2.svg" || img}
                                            alt="your space"
                                            fill
                                        />
                                    </div>
                                    <h2 className='mb-2'>{header || 'Header goes here'}</h2>
                                    <p className='mb-2'>{message || 'Your custom message'}</p>
                                </div>


                                <div className="w-[60%] flex flex-col gap-4 px-3">
                                    <div>
                                        <h2 className='my-2'>Create a New Space</h2>
                                        <p className='my-2'>After the Space is created, it will generate a dedicated page for collecting testimonials.</p>
                                    </div>

                                    <div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-4 text-start">
                                                <label className="block text-gray-700 text-sm mb-1" >
                                                    Space Name
                                                </label>
                                                <input required className='w-full border rounded-md p-2 ' type='name' placeholder='enter space name...' {...register("name")} />
                                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                            </div>

                                            <div className="flex items-center gap-x-1  mb-4 text-start">
                                                <label className=" text-gray-700 text-sm " htmlFor='square'>
                                                    Space Logo
                                                </label>
                                                <input className=' border rounded-md p-2 ' type='checkbox' id='square' {...register("square")} />
                                                {errors.square && <p className="text-red-500">{errors.square.message}</p>}
                                                <span>square?</span>
                                            </div>

                                            <div className="flex items-center gap-x-2 my-1">
                                                <div
                                                    className="w-[50px] h-[50px] bg-slate-200 rounded-full"
                                                    style={{ backgroundImage: image != null ? `url(${image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                    onClick={() => handleDivClick()}
                                                ></div>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                    // {...register('image')}
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />

                                                <div className="btn fit-content" onClick={() => handleDivClick()}>
                                                    <span>Change</span>
                                                </div>
                                            </div>


                                            <div className="mb-4 text-start">
                                                <label className="block text-gray-700 text-sm mb-1" >
                                                    Header Title
                                                </label>
                                                <input required className='w-full border rounded-md p-2 ' type='text' placeholder='Would you like to give a shoutout for xyz?' {...register("header")} />
                                                {errors.header && <p className="text-red-500">{errors.header.message}</p>}
                                            </div>



                                            <div className="mb-4 text-start">
                                                <textarea id="message" name="message" rows="4" {...register("message")}
                                                    placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
                                                    className="flex-1 border p-2  w-full min-w-0 rounded-md text-gray-800  transition duration-150 ease-in-out
                                              sm:text-sm sm:leading-5 border-gray-300"></textarea>
                                            </div>


                                            <button className='btn'>Create New Space</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>


            <div className='testimonial-card-section'>
                <div className='container-1'>
                    <div className='flex relative'>
                        <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            placeholder="Search testimonials by name, email, or keywords" type="search" value="" />
                        <div className='absolute top-[50%] left-2 translate-y-[-50%] cursor-pointer'>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default page