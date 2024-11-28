import { connectDB } from "@/connectDB/connectDB";
import { Testimonial } from "@/models/testimonial.model";
import { NextResponse } from "next/server";




export const POST = async (req) => {
    try {
        await connectDB();
        const { data } = await req.json();

        const userTestimonial = new Testimonial({
            name: data.name,
            email: data.email,
            message: data.message,
            image: data.image.url,
            photo: data.photo.url,
            rating: data.rating,
            permission: data.permission
        })
        await userTestimonial.save();
        return NextResponse.json('successfull', { status: 200 })
    } catch (error) {
        console.log('testimonial Post::', error?.message);
        return NextResponse.json(error.message, { status: 500 })
    }
}