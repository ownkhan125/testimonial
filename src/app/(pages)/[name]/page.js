'use client'


import Loader from '@/components/Loader';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { RatingStar } from 'rating-star';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaVideo } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdEdit } from "react-icons/md";
import ReactStars from "react-rating-stars-component";



const page = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(5);
    const [image, setImage] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const name = params?.name;


    const toggle = () => {
        setShow(!show)
    }



    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();


    // Rating funtion 
    const onRatingChange = (newRating) => {
        setRating(newRating);
    };


    // handle image  

    const handleImage = async (e) => {
        const file = e.target.files[0];

        // Convert the file to base64
        const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
        setImage(base64)
    };


    // handle photo  
    const handlePhoto = async (e) => {
        const file = e.target.files[0];

        // Convert the file to base64
        const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
        setPhoto(base64)
    };


    // convert cloudinary link funtion 
    const uploadImage = async (asset) => {
        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: asset }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.log('check function error');
            console.log('uploadImage::', error?.message);
        }
    };



    // sendData backend funtion
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if (data.image) {
                const imageUrl = await uploadImage(image);
                data.image = imageUrl;
            }

            if (data.photo) {
                const imageUrl = await uploadImage(photo);
                data.photo = imageUrl;
            }
            data.rating = rating;

            const res = await fetch(`/api/product/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
            })

        } catch (error) {
            console.log('dashboard page:', error);
        } finally {
            setLoading(false);
        }
        reset();
        toggle()
        document.body.classList.remove('fixed')
        setPhoto(null)
        setImage(null)
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/product/${name}`);
                const response = await res.json();
                setData(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [name]);




    return (

        <>
            <div className='container-1'>
                <div className='max-w-3xl mx-auto text-center pb-6 md:pb-16'>
                    <div className='relative w-[100px] h-[100px] rounded-md overflow-hidden mx-auto my-2'>
                        {data?.image && <Image
                            src={data?.image}
                            alt="Product"
                            fill
                            sizes='100%'
                        />}
                    </div>

                    <div className='mb-3'>
                        <h1 className='text-[52px]'>{data.name}</h1>
                    </div>

                    <div className='mb-3'>
                        <h2>{data.header}</h2>
                    </div>

                    <div className='w-fit flex flex-wrap gap-3 items-center  mx-auto'>
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




                <div className={show ? "modal" : "hidden"}>
                    <button
                        onClick={() => toggle()}
                        className="w-fit absolute top-2 right-3"
                    >
                        <IoMdClose className="text-xl" />
                    </button>

                    <p className="fs-18">Write text testimonial to</p>

                    <div className="relative w-[40px] h-[40px] rounded-md overflow-hidden my-2">
                        <Image src={data?.image || 'https://testimonial.to/static/media/logo-dark.8447f219.svg'}
                            alt="Testimonial logo"
                            fill
                            sizes='100%'
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Rating */}
                        <div>
                            <RatingStar
                                clickable
                                maxScore={5}
                                noBorder={true}
                                id="rating"
                                rating={rating}
                                onRatingChange={onRatingChange}
                                {...register("rating")}
                            />
                        </div>

                        {/* Testimonial Text */}
                        <div>
                            <textarea
                                {...register("message", {
                                    required: "Message is required",
                                    minLength: {
                                        value: 10,
                                        message: "Message must be at least 10 characters",
                                    },
                                })}
                                rows="5"
                                placeholder="What did you dislike? How can we make it better?"
                                className="shadow-sm border flex-1 form-input block w-full min-w-0 rounded-md text-gray-800 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border-gray-300 p-2"
                            />
                            {errors.message && (
                                <span className="text-red-500 text-sm">{errors.message.message}</span>
                            )}
                        </div>

                        {/* Attach Image */}
                        <div>
                            <label>Attach Image(s)</label>
                            <div className="my-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("photo")}
                                    onChange={handlePhoto}
                                />
                            </div>
                        </div>

                        {/* Name */}
                        <div className="mt-1 relative rounded-md">
                            <label htmlFor="name" className="text-sm text-gray-700">
                                Your Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className="w-full border border-gray-300 text-gray-700 rounded-lg sm:text-sm sm:leading-5 p-2"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name.message}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mt-1 relative rounded-md">
                            <label htmlFor="email" className="text-sm text-gray-700">
                                Your Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full border border-gray-300 text-gray-700 rounded-lg sm:text-sm sm:leading-5 p-2"
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>

                        {/* Upload Photo */}
                        <div>
                            <span className="fs-14">Upload Your Photo</span>
                            <div className="flex items-center gap-3 my-2">
                                <div className="avatar">
                                    <Image
                                        src={image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                        alt="user-profile"
                                        fill
                                        sizes='100%'
                                    />
                                </div>
                                <label>
                                    <input type="file" accept="image/*" {...register("image")} onChange={handleImage} />
                                </label>
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start gap-3">
                            <div>
                                <input
                                    type="checkbox"
                                    id="permission-check"
                                    {...register('permission')}
                                />
                            </div>
                            <div>
                                <label
                                    className="fs-14 select-none"
                                    htmlFor="permission-check"
                                >
                                    I give permission to use this testimonial across social
                                    channels and other marketing efforts
                                </label>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-stretch justify-end gap-2 mt-4">
                            <button
                                type="button"
                                className="btn-transparent fit-content"
                                onClick={() => toggle()}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn fit-content">
                                {loading ? <Loader /> : 'Send'}
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </>
    )
}

export default page