import { connectDB } from "@/connectDB/connectDB";
import { Product } from "@/models/product.model";
import { Testimonial } from "@/models/testimonial.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req, context) => {
    try {
        // Connect to the database
        const params = await context.params;
        const product = params?.name;

        if (!product && !params) {
            return NextResponse.json("invalid params", { status: 400 });
        };

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json('successfull', { status: 404 });

        await connectDB();

        // Find product by name
        const result = await Product.findOne({ name: product });
        console.log(result);

        if (!result) {
            return NextResponse.json('Not Found', { status: 404 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('[dynamic] page error::', error?.message);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
};

export const POST = async (req, context) => {
    try {
        // Connect to the database
        await connectDB();

        // Access context.params synchronously
        const params = await context.params
        const spaceName = params?.name;

        if (!spaceName) {
            return NextResponse.json('invalid params', { status: 400 });
        }

        const product = await Product.findOne({ name: spaceName });
        if (!product) return NextResponse.json('invalid params', { status: 400 });


        // Parse request body
        const { data } = await req.json();

        // Create a new Testimonial
        const userTestimonial = new Testimonial({
            name: data.name,
            email: data.email,
            message: data.message,
            image: data.image.url,
            rating: data.rating,
            permission: data.permission,
        });

        if (!product.testimonials > 0) {
            product.testimonials = []
        };

        product.testimonials.push(userTestimonial._id);

        await product.save();
        await userTestimonial.save();

        return NextResponse.json('successfull', { status: 200 });
    } catch (error) {
        console.error('testimonial Post::', error?.message);
        return NextResponse.json(error.message, { status: 500 });
    }
};
