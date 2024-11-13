// 'use client'

// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'

// const page = () => {
//     const {register , handleSubmit , watch} = useForm();
//     const [preview , setPreview] = useState(null);

//     const imgUrl = watch("file")

//     useEffect(() => {
    
//         console.log(imgUrl[0]);
//     // const url = URL.createObjectURL(imgUrl[0]);
//     // setPreview(url)
    
//     }, [imgUrl]);
//   return (
//  <>
//  <form onSubmit={handleSubmit(data => console.log(data))}>
//     <input type='file' {...register("file")} />

//     <button type='submit'>click here</button>
//  </form>
//  <img src={preview} />
//  </>
//   )
// }

// export default page