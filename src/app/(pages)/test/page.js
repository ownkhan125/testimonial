import { Rating } from '@smastrom/react-rating'
import React from 'react'

const page = () => {
  return (
    <Rating value={3} style={{maxWidth : "200px" , color : "goldenrod"}}  />
  )
}

export default page