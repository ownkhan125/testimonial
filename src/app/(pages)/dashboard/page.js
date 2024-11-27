'use client'


import Loader from '@/components/Loader';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaFolderPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const page = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    // const [searchValue, setSearchValue] = useState("");
    const [image, setImage] = useState(null);
    const header = watch("header");
    const message = watch("message");
    const name = watch("name", '');
    const formattedName = name.replace(/ /g, / /g);


    const handleUpload = async (e) => {
        const file = e.target.files[0];

        // Convert the file to base64
        const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
        setImage(base64)
    };

    const uploadImage = async () => {
        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: image }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.log('uploadImage::', error?.message);
        }

    };


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if (data.image) {
                const imageUrl = await uploadImage();
                data.image = imageUrl;
            }

            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
            })
            if (res.ok) {
                fetchPosts()
            }
        } catch (error) {
            console.log('dashboard page:', error);
        } finally {
            setLoading(false);
        }
        reset();
        document.querySelector('.space-Modal').close()
        document.body.classList.remove('fixed')
        setImage(null)
    };



    const fetchPosts = async () => {
        const response = await fetch('/api/product');
        const data = await response.json();
        setProduct(data)
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <div className='hero-section'>
                <div className='main'>
                    <div className='container-1'>
                        <div className='my-3'>
                            <h1>Spaces</h1>
                        </div>
                        <div className='space-create'>
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
                                <button className='btn fit-content' onClick={() => { document.querySelector('.space-Modal').showModal(); document.body.classList.add('fixed') }} >
                                    Create a new Space
                                </button>
                            </div>





                            <dialog className="space-Modal">
                                <button onClick={() => {
                                    document.querySelector('.space-Modal').close()
                                    document.body.classList.remove('fixed')
                                }}
                                    className="w-fit absolute top-2 right-3">
                                    <IoMdClose />
                                </button>
                                <div className="flex items-start justify-between">
                                    <div className="w-[40%] relative flex flex-col p-4 border rounded-md">
                                        <div className="w-[250px] absolute top-[-15px] left-0 text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-green-600 bg-green-200 rounded-full py-1 px-3">
                                            Live preview - Testimonial page
                                        </div>
                                        <div className='relative w-[80px] h-[80px] rounded-md overflow-hidden mx-auto my-2'>
                                            <Image
                                                src={image || "https://testimonial.to/static/media/just-logo.040f4fd2.svg"}
                                                alt="your space"
                                                fill={true}
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
                                                <div className="text-start">
                                                    <label className="block text-gray-700 text-sm mb-1" >
                                                        Space Name
                                                    </label>
                                                    <input required className='w-full border rounded-md p-2 ' type='text' placeholder='enter space name...' {...register("name")} />
                                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                                </div>
                                                <div className='mb-4 text-start'>
                                                    <p className='fs-12'>Public Url: {window.location.host}/{formattedName} </p>
                                                </div>

                                                <div className="flex items-center gap-x-1  mb-4 text-start">
                                                    <label className=" text-gray-700 text-sm select-none" htmlFor='square'>
                                                        Space Logo
                                                    </label>
                                                    <input className=' border rounded-md p-2 ' type='checkbox' id='square' {...register("square")} />
                                                    {errors.square && <p className="text-red-500">{errors.square.message}</p>}
                                                    <span>square?</span>
                                                </div>

                                                <div className="flex items-center gap-x-2 my-1">
                                                    <div
                                                        className="w-[50px] min-w-[50px] h-[50px] bg-slate-200 rounded-full"
                                                        style={{ backgroundImage: image != null ? `url(${image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                    ></div>
                                                    <label htmlFor="image-input" className="btn fit-content">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            {...register('image')}
                                                            style={{ display: 'none' }}
                                                            onChange={handleUpload}

                                                            id="image-input"
                                                        />
                                                        <span>Change</span>
                                                    </label>
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
                                                <button
                                                    className="btn"
                                                    disabled={loading}
                                                >
                                                    {loading ? <Loader /> : "Create New Space"}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>



                    <div className='space-card-section'>
                        <div className='container-1'>
                            <div className='flex relative'>
                                <input
                                    id="search"
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    placeholder="Search testimonials by name, email, or keywords"
                                    type="search"
                                // value={searchValue}
                                // onChange={(e) => setSearchValue(e.target.value)} 
                                />
                                <div className='absolute top-[50%] left-2 translate-y-[-50%] cursor-pointer'>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>



                            <div className='grid grid-cols-3 grid-flow-row gap-5  my-4'>
                                {
                                    session ?
                                        product?.map((item, index) => (
                                            <div key={index} className='space-card'>
                                                <div className='flex items-center justify-between'>
                                                    <a href='' className='flex items-center gap-x-2'>
                                                        <div className="avatar">
                                                            <Image
                                                                src={item?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                                // onChange={handleUpload}
                                                                alt="your space"
                                                                fill
                                                            />
                                                        </div>

                                                        <span className='line-clamp-1'>
                                                            {item.name}
                                                        </span>
                                                    </a>

                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                                                        </svg>
                                                    </div>
                                                </div>


                                                <div className='flex items-center justify-between gap-x-2 p-2 mt-8 border-t border-gray-200'>
                                                    <span className='fs-14'>Videos: </span>
                                                    <span className='fs-14'>Text: </span>
                                                </div>
                                            </div>

                                        ))
                                        : <button>quite</button>
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default page