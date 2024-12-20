'use client'


import Loader from '@/components/Loader';
import { useValidation } from '@/hooks/useValidation';
import { spaceValidationSchema } from '@/utils/Validation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaFolderPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const page = () => {

    const { register, handleSubmit, setValue, setError, reset, watch, formState: { errors } } = useValidation(spaceValidationSchema);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const { data: session } = useSession();
    // const [searchValue, setSearchValue] = useState("");
    const header = watch("header");
    const message = watch("message");
    const name = watch("name");
    const formattedName = name?.replace(/ /g, '-');
    const [publicUrl, setPublicUrl] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(product);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const localUrl = URL.createObjectURL(file);
        setImage(localUrl)
        if (file.size > 5 * 1024 * 1024) {
            setValue("image", 'wrong-image');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            e.target.value = null;
            setError('image', {
                type: "manual",
                message: "jpeg, png are allowed",
            })
            setImage(null);
            return null;
        }

        // Convert the file to base64
        const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
        setValue('image', base64)
    };

    const uploadImage = async (img) => {
        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: img }),
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                alert('something wrong Image')
            }
        } catch (error) {
            console.log('uploadImage::', error?.message);
        }

    };


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if (data.image && data.image.length > 0) {
                const imageUrl = await uploadImage(data.image);
                if (!imageUrl) {
                    // If image is heavy or upload fails, stop execution
                    setLoading(false);
                    return;
                } else {
                    data.image = imageUrl;
                }
            } else {
                data.image = '';
            }
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
            })
            if (res.status == 400) {
                alert('Change Space Name, URL is not Available');
            }
        } catch (error) {
            console.log('dashboard page:', error);
        } finally {
            setLoading(false);
        }
        reset();
        document.querySelector('.space-Modal').close()
        document.body.classList.remove('modal-open')
        setImage(null)
    };




    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/product');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        setPublicUrl(`${window.location.host}/${formattedName}`);
        fetchPosts();
    }, [formattedName]);

    // filter input 
    useEffect(() => {
        if (searchTerm === '') {
            // If search term is empty, show all items
            setFilteredItems(product);
        } else {
            // Filter items based on search term (case insensitive)
            const filtered = product.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    }, [searchTerm, product]);

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
                                <button className='btn fit-content' onClick={() => { document.querySelector('.space-Modal').showModal(); document.body.classList.add('modal-open') }} >
                                    Create a new Space
                                </button>
                            </div>





                            <dialog className="space-Modal">
                                <button onClick={() => {
                                    document.querySelector('.space-Modal').close()
                                    document.body.classList.remove('modal-open')
                                }}
                                    className="w-fit absolute top-2 right-3">
                                    <IoMdClose />
                                </button>
                                <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
                                    <div className="w-full lg:w-[40%] relative flex flex-col p-2 border rounded-md">
                                        <div className="live-preview-tag">
                                            Live preview - Testimonial page
                                        </div>
                                        <div className='relative w-[80px] h-[80px] rounded-md overflow-hidden mx-auto my-2'>
                                            <Image
                                                src={image || "https://testimonial.to/static/media/just-logo.040f4fd2.svg"}
                                                alt="simple-space"
                                                fill
                                                sizes='100%'
                                            />
                                        </div>
                                        <h2 className='mb-2'>{header || 'Header goes here'}</h2>
                                        <p className='mb-2'>{message || 'Your custom message'}</p>
                                    </div>


                                    <div className="w-full lg:w-[60%] flex flex-col gap-4 px-3">
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
                                                    <input className='w-full border rounded-md p-2 ' type='text' placeholder='enter space name...' {...register("name")} />
                                                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                                                </div>
                                                <div className='mb-4 text-start'>
                                                    <p className='fs-12'>Public Url: {publicUrl} </p>
                                                </div>

                                                <div className="flex items-center gap-x-1  mb-4 text-start">
                                                    <label className=" text-gray-700 text-sm select-none" htmlFor='square'>
                                                        Space Logo
                                                    </label>
                                                    <input className='fit-content border rounded-md p-2 ' type='checkbox' id='square' {...register("square")} />
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
                                                            accept=".jpeg, .jpg, .png"
                                                            {...register('image')}
                                                            style={{ display: 'none' }}
                                                            onChange={handleUpload}
                                                            id="image-input"
                                                        />
                                                        <span>Change</span>
                                                    </label>
                                                    {errors.image && <p className="error-message">{errors.image.message}</p>}
                                                </div>


                                                <div className="mb-4 text-start">
                                                    <label className="block text-gray-700 text-sm mb-1" >
                                                        Header Title
                                                    </label>
                                                    <input className='w-full border rounded-md p-2 ' type='text' placeholder='Would you like to give a shoutout for xyz?' {...register("header")} />
                                                    {errors.header && <p className="error-message">{errors.header.message}</p>}
                                                </div>



                                                <div className="mb-4 text-start text-sm lg:text-md">
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
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className='absolute top-[50%] left-2 translate-y-[-50%] cursor-pointer'>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>



                            <div className='grid sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-5  my-4'>
                                {
                                    session &&
                                    filteredItems?.map((item, index) => (
                                        <div key={index} className='space-card'>
                                            <div className='flex items-center justify-between'>
                                                <Link href={`/product/${item.name.replace(/ /g, '-')}`} className='flex items-center gap-x-2'>
                                                    <div className="avatar">
                                                        <Image
                                                            src={item?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                            alt="simple"
                                                            fill
                                                            sizes='100%'
                                                            priority
                                                        />
                                                    </div>

                                                    <span className='line-clamp-1'>
                                                        {item.name}
                                                    </span>
                                                </Link>

                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                                                    </svg>
                                                </div>
                                            </div>


                                            <div className='p-1 mt-3 lg:p-2 lg:mt-6 border-t border-gray-200'>
                                                <span className='fs-14'>Testimonials :{item?.testimonials.length == 0 ? 0 : item?.testimonials.length} </span>
                                            </div>
                                        </div>

                                    ))
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