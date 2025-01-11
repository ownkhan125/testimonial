import React from 'react'

const PageLoader = () => {
    return (
        <>

            <div className="w-full flex items-center justify-center">
                <div className="w-fit flex loader bg-white p-2 rounded-full space-x-1">
                    <div className="w-[10px] h-[10px] bg-gray-800 rounded-full animate-bounce"></div>
                    <div className="w-[10px] h-[10px] bg-gray-800 rounded-full animate-bounce"></div>
                    <div className="w-[10px] h-[10px] bg-gray-800 rounded-full animate-bounce"></div>
                </div>
            </div>

        </>
    )
}

export default PageLoader