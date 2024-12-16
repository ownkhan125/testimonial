'use client';


import Deletemodal from '@/components/Deletemodal';
import DialogBox from '@/components/DialogBox';
import moment from 'moment';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { RatingStar } from 'rating-star';
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md';

const page = () => {
    const params = useParams();
    const name = params?.name;
    const [product, setProduct] = useState();
    const [Testimonial, setTestimonial] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const menuItems = [
        {
            label: "All",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 mr-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                    />
                </svg>
            ),
        },
        {
            label: "Text",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 mr-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                </svg>
            ),
        },
        // Add the remaining items similarly
    ];

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        document.body.classList.toggle('modal-open');
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${name}`);
                const response = await res.json();
                setProduct(response);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTestimonial = async () => {
            try {
                const res = await fetch(`/api/testimonials/${name}`);
                const response = await res.json();
                setTestimonial(response.testimonials);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
        fetchTestimonial();

    }, [name]);


    return (
        <>


            <DialogBox />
            <div className='product-hero-section'>
                <div className='container-1'>
                    <div className='flex items-center gap-x-2 justify-between'>
                        <div className='flex gap-x-3 items-center'>
                            <div className='square-md'>
                                <Image
                                    src={product?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                    alt='product'
                                    fill
                                    priority
                                />
                            </div>
                            <div>
                                <h1>{product?.name}</h1>
                            </div>
                        </div>



                        <div>
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                onClick={() => { document.querySelector('.space-Modal').showModal(); document.body.classList.add('modal-open') }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="-ml-1 mr-2 h-5 w-5 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125">
                                    </path>
                                </svg>
                                Edit space
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='inbox-section'>
                <div className='container-1'>
                    <div className='flex flex-col lg:flex-row'>
                        <div className='w-full lg:w-[30%]'>
                            <div className="h-[100%] p-4">
                                {/* For larger screens */}
                                <div className="hidden lg:block sticky top-10 bg-white rounded-lg p-2 shadow-md border z-[-1]">
                                    <div className="text-font-medium">
                                        <span>Inbox</span>
                                    </div>
                                    <div className="flex flex-col gap-y-2 my-3">
                                        {menuItems.map((item) => (
                                            <button key={item.label} className="btn-inbox-item">
                                                {item.icon}
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* For smaller screens */}
                                <div className=" lg:hidden">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full bg-white rounded-lg p-2 shadow-md border flex justify-between items-center"
                                    >
                                        <span>Inbox</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className={`h-6 w-6 duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 9l6 6 6-6"
                                            />
                                        </svg>
                                    </button>
                                    <div className='relative w-full'>
                                        {isOpen && (
                                            <div className="absolute z-50 w-full bg-white rounded-lg p-2 shadow-md border mt-2">
                                                <div className="flex flex-col gap-y-2">
                                                    {menuItems.map((item) => (
                                                        <button key={item.label} className="btn-inbox-item">
                                                            {item.icon}
                                                            {item.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='w-full lg:w-[70%] text-center p-4'>
                            <div className='flex items-center gap-x-4'>
                                <div className='relative w-[100%] z-[-1]'>
                                    <input
                                        id="search"
                                        name="search"
                                        placeholder="Search testimonials by name, emailz, or keywords"
                                        type="search"
                                    // value={searchValue}
                                    // onChange={(e) => setSearchValue(e.target.value)} 
                                    />
                                    <div className='absolute top-[50%] left-2 translate-y-[-50%] cursor-pointer'>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {
                                Testimonial?.map((item, index) => (
                                    <div key={index} className='testimonial-card'>
                                        <div className='flex items-center justify-between'>
                                            <div className='relative'>
                                                <span className='px-5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-600 text-left'>
                                                    Text
                                                </span>
                                                <span className='absolute -top-1 -left-2 bg-white rounded-full'>
                                                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </div>

                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 cursor-pointer text-purple-400 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-600">
                                                    <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.75zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="fit-content">
                                            <RatingStar
                                                maxScore={5}
                                                noBorder={true}
                                                id={`rating-${index}`}
                                                rating={item.rating}
                                            />
                                        </div>

                                        <div>
                                            <p className='fs-14'>this is testimonial for product :{item?.rating}</p>
                                        </div>



                                        <div className='grid grid-cols-4 gap-4'>
                                            <div className="img-wrapper">
                                                <Image
                                                    src={item?.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                    alt="Profile Image"
                                                    height={0}
                                                    width={180}
                                                // style={{ width: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>



                                        <div className='grid md:grid-cols-2 gap-4 mt-4'>
                                            <div>
                                                <div>
                                                    <span className='fs-14'>Name :</span>
                                                </div>
                                                <div className='flex items-center gap-x-2'>
                                                    <div className='avatar'>
                                                        <Image
                                                            src={item?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                            alt='user-photo'
                                                            fill
                                                        />
                                                    </div>
                                                    <p> {item?.name}</p>
                                                </div>
                                            </div>


                                            <div>
                                                <div>
                                                    <span className='fs-14'>Email :</span>
                                                </div>
                                                <div>
                                                    <p> {item?.email}</p>
                                                </div>
                                            </div>



                                            <div>
                                                <div>
                                                    <span className='fs-14'>Submitted At</span>
                                                </div>
                                                <div>
                                                    <p>{moment(item.createdAt).format("MMM DD, YYYY, h:mm:ss A")}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='text-end '>
                                            <button className='btn-tranparent fit-content transition-all rounded-full p-1 hover:bg-slate-200'
                                                onClick={() =>
                                                    toggleModal()

                                                }>
                                                <MdDeleteOutline className='text-2xl text-red-500' />
                                            </button>

                                        </div>
                                        <Deletemodal
                                            isOpen={isModalOpen}
                                            toggle={toggleModal}
                                            // onConfirm={handleDelete}
                                            name={item?.name}
                                        />
                                    </div>


                                )
                                )
                            }



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page