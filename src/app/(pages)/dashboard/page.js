'use client'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaFolderPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const page = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();


    const [image, setImage] = useState(null);
    const fileInputRef = useRef();
    const name = watch("name");
    const square = watch("square");
    const header = watch("header");
    const message = watch("message");


    const handleDivClick = () => {
        console.log("Ref Current Value:", fileInputRef.current);
        // if (fileInputRef == null) {
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

    const onSubmit = (data) => {
        console.log(data);
        reset();
        document.getElementById('firstModal').close()
        setImage(null)
    };

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





                        <dialog id="firstModal" className='max-w-[60%] w-[100%] absolute  rounded-md duration-150 p-8'>
                            <button onClick={() => document.getElementById('firstModal').close()}
                                className="w-fit absolute top-2 right-3">
                                <IoMdClose />
                            </button>
                            <div className="flex items-start justify-between">
                                <div className="w-[40%] flex flex-col p-4 border rounded-md">
                                    <h2 className='mb-2'>{header || 'Header goes here'}</h2>
                                    <p className='mb-2'>{message || 'Your custom message'}</p>
                                    <p className='mb-2'>{square || 'Your custom message'}</p>
                                </div>
                                <div className="w-[60%] flex flex-col gap-4">
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

                                            {/* <div className="flex items-center gap-x-2 my-1">
                                                <div
                                                    className="w-[50px] h-[50px] bg-slate-200 rounded-full"
                                                    style={{ backgroundImage: image != null ? `url(${image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                    onClick={() => handleDivClick()}
                                                ></div>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                    {...register(`${image}`)}
                                                    // style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />

                                                <div className="btn fit-content" onClick={() => handleDivClick()}>
                                                    <span>Change</span>
                                                </div>
                                            </div> */}


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

        </>
    )
}

export default page