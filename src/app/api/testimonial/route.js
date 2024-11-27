import { connectDB } from "@/connectDB/connectDB";
import { NextResponse } from "next/server";




export const POST = async (req) => {
    try {

        await connectDB();

        const { data } = await req.json();
        console.log('check the data testimonial', data);

        return NextResponse.json('successfull', { status: 200 })
    } catch (error) {
        console.log('testimonial Post::', error?.message);
        return NextResponse.json(error.message, { status: 500 })
    }
}