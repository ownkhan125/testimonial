import { connectDB } from "@/connectDB/connectDB";
import { Product } from "@/models/product.model";
import { Testimonial } from "@/models/testimonial.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/models/user.model";

export const GET = async (req, context) => {
    try {
        // Connect to the database
        const params = await context.params;
        const product = params?.name;
        const formattedProduct = product.trim().replace(/-/g, ' ');



        if (!product && !params) {
            return NextResponse.json("invalid params", { status: 400 });
        };

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json('successfull', { status: 404 });

        await connectDB();

        // Find product by name
        const result = await Product.findOne({ name: formattedProduct });

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
        const formattedProduct = spaceName.trim().replace(/-/g, ' ');

        if (!spaceName) {
            return NextResponse.json('invalid params', { status: 400 });
        }

        const product = await Product.findOne({ name: formattedProduct });
        if (!product) return NextResponse.json('invalid params', { status: 400 });


        // Parse request body
        const { data } = await req.json();

        // Create a new Testimonial
        const userTestimonial = new Testimonial({
            name: data.name,
            email: data.email,
            message: data.message,
            photo: data.photo.url,
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



export const PUT = async (req, context) => {
    try {

        const params = await context.params;
        const previousName = params?.name;
        const formattedName = previousName.trim().replace(/-/g, ' ');
        await connectDB();

        const { data } = await req.json();

        if (!data) {
            return NextResponse.json('user unAuthorized', { status: 401 })
        };

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('user unAuthorized', { status: 401 })
        };

        const user = await User.findById(session?.user?.userId);
        if (!user) {
            return NextResponse.json('user not found', { status: 404 })
        }
        const existingProduct = await Product.findOne({ name: formattedName, author: user._id });
        if (!existingProduct) {
            return NextResponse.json('not found product', { status: 404 })
        }

        const product = await Product.updateOne(
            { name: data?.name, author: user._id },
            {
                author: user._id,
                name: data.name,
                square: data.square,
                header: data.header,
                message: data.message,
                image: data.image.url,
            }
        );


        return NextResponse.json('successfull', { status: 200 })
    } catch (error) {
        console.log('product PUT::', error?.message);
        return NextResponse.json(error.message, { status: 500 })
    }
}





