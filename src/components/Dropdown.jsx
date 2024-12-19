import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const Dropdown = ({ main }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <>

            {
                session ? 
                <div className={`max-w-[200px] fs-18 my-2 absolute right-0 ${main}`}>
                    <ul>
                        <li className="w-full md:hidden rounded-t bg-gray-200 hover:bg-gray-400 py-1 px-2 sm:py-2 sm:px-4 block whitespace-nowrap overflow-hidden text-ellipsis">
                            <Link href={'/dashboard'}>
                                Dashboard
                            </Link>
                        </li>
                        <li className="w-full rounded-b md:rounded bg-gray-200 hover:bg-gray-400 py-1 px-2 sm:py-2 sm:px-4 block whitespace-nowrap overflow-hidden text-ellipsis" onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
                    :
                    <div className={`max-w-[200px] my-2 absolute right-0 ${main}`}>
                        <ul>
                            <li ><Link className="w-full rounded-t bg-gray-200 hover:bg-gray-400 py-1 px-2 sm:py-2 sm:px-4 block whitespace-nowrap overflow-hidden text-ellipsis " href='/api/auth/signin'>Login</Link></li>
                            <li ><Link className="w-full rounded-b bg-gray-200 hover:bg-gray-400 py-1 px-2 sm:py-2 sm:px-4 block whitespace-nowrap overflow-hidden text-ellipsis " href='/signup'>Sign Up</Link></li>
                        </ul>
                    </div>
            }


        </>
    )
}

export default Dropdown