'use client';

import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useValidation } from '@/hooks/useValidation';
import { spaceValidationSchema } from '@/utils/Validation';


const DialogBox = () => {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useValidation(spaceValidationSchema);
    const params = useParams();
    const router = useRouter();
    const slugName = params?.name;
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const header = watch("header");
    const message = watch("message");
    const name = watch("name");
    const [publicUrl, setPublicUrl] = useState();

    // Handle image upload and preview
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const localUrl = URL.createObjectURL(file);
        setImage(localUrl)
        if (file.size > 5 * 1024 * 1024) {
            setValue("image", 'wrong-image');
            return;
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
            console.log('check function error');
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
                }
                data.image = imageUrl;
            } else {
                data.image = '';
            }
            const res = await fetch(`/api/product/${slugName}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data }),
            });
            if (res.ok) {
                const response = await res.json();
                router.push(`${response.name}`)
            } else {
                alert('your new data is not secure')
            }


        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
            reset();
            document.querySelector('.space-Modal').close();
            document.body.classList.remove('modal-open');
            setImage(null);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${slugName}`);
                const response = await res.json();

                // Set default values for form fields based on fetched data
                setValue("name", response.name || '');
                setValue("header", response.header || '');
                setValue("message", response.message || '');
                setValue("image", response.image || null);
                setImage(response.image || null);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };


        fetchProduct();
    }, [slugName, setValue]);


    useEffect(() => {
        setPublicUrl(`${window.location.host}/${name?.replace(/ /g, '-')}`);
    }, [name]);


    return (
        <>
            <dialog className="space-Modal">
                <button
                    onClick={() => {
                        document.querySelector('.space-Modal').close();
                        document.body.classList.remove('modal-open');
                    }}
                    className="w-fit absolute top-2 right-3"
                >
                    <IoMdClose />
                </button>
                <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
                    {/* Preview Section */}
                    <div className="w-full lg:w-[40%] relative flex flex-col p-4 border rounded-md text-center">
                        <div className="w-[250px] absolute top-[-15px] left-0 text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-green-600 bg-green-200 rounded-full py-1 px-3">
                            Live preview - Testimonial page
                        </div>
                        <div className="square-lg mx-auto my-2">
                            <Image
                                src={image || "https://testimonial.to/static/media/just-logo.040f4fd2.svg"}
                                alt="simple-space"
                                fill
                                sizes="100%"
                            />
                        </div>
                        <h2 className="mb-2">{header}</h2>
                        <p className="mb-2">{message}</p>
                    </div>

                    {/* Form Section */}
                    <div className="w-full lg:w-[60%] flex flex-col gap-4 px-3">
                        <div>
                            <h2 className="my-2">Edit Space</h2>
                            <p className="my-2">Edit the space details and save your changes.</p>
                        </div>

                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Space Name */}
                                <div className="text-start">
                                    <label className="block text-gray-700 text-sm mb-1">Space Name</label>
                                    <input
                                        required
                                        className="w-full border rounded-md p-2"
                                        type="text"
                                        placeholder="Enter space name..."
                                        {...register("name")}
                                        onChange={(e) => setValue("name", e.target.value)} // Update form state on change
                                    />
                                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                                </div>

                                {/* Public URL */}
                                <div className="mb-4 text-start">
                                    <p className="fs-12">Public Url: {publicUrl}</p>
                                </div>

                                {/* Space Logo */}
                                <div className="flex items-center gap-x-2 my-5">
                                    <div
                                        className="w-[50px] min-w-[50px] h-[50px] bg-slate-200 rounded-full"
                                        style={{
                                            backgroundImage: image != null ? `url(${image})` : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <label htmlFor="image-input" className="btn fit-content">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register("image")}
                                            style={{ display: 'none' }}
                                            onChange={handleUpload}
                                            id="image-input"
                                        />
                                        <span>Change</span>
                                    </label>
                                    {errors.image && <p className="error-message">{errors.image.message}</p>}
                                </div>

                                {/* Header Title */}
                                <div className="mb-4 text-start">
                                    <label className="block text-gray-700 text-sm mb-1">Header Title</label>
                                    <input
                                        required
                                        className="w-full border rounded-md p-2"
                                        type="text"
                                        placeholder="Enter header title..."
                                        {...register("header")}
                                    />
                                    {errors.header && <p className="error-message">{errors.header.message}</p>}
                                </div>

                                {/* Message */}
                                <div className="mb-4 text-start">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        {...register("message")}
                                        placeholder="Write your message..."
                                        className="flex-1 border p-2 w-full min-w-0 rounded-md text-gray-800 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border-gray-300"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button className="btn" disabled={loading}>
                                    {loading ? <Loader /> : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default DialogBox;
