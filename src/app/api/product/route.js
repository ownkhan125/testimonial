import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/user.model";
import { Product } from "@/models/product.model";
import { connectDB } from "@/connectDB/connectDB";
import { Testimonial } from "@/models/testimonial.model";




export const GET = async () => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const products = await Product.find({ author: session?.user?.userId }).populate("author");


        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.log('product Get::', error?.message);
        return NextResponse.json(error.message, { status: 500 })
    }
}


export const POST = async (req) => {
    try {

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

        const existingProduct = await Product.findOne({ name: data?.name });
        if (existingProduct) {
            return NextResponse.json('Product already exist', { status: 400 })
        }

        const product = new Product({
            author: user._id,
            name: data.name,
            square: data?.square,
            header: data.header,
            message: data?.message,
            image: data?.image
        });
        await product.save();

        return NextResponse.json('successfull', { status: 200 })
    } catch (error) {
        console.log('product Post::', error?.message);
        return NextResponse.json(error.message, { status: 500 })
    }
}


export const DELETE = async (req) => {
    try {
        // Connect to the database
        await connectDB();

        // Extract testimonial ID from the request body
        const { id } = await req.json();

        // Step 1: Delete the testimonial from the testimonials collection
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return NextResponse.json(
                { message: "Testimonial not found" },
                { status: 404 }
            );
        }

        // Step 2: Remove the testimonial ID from all products
        await Product.updateMany(
            { testimonials: id }, // Match products containing this testimonial ID
            { $pull: { testimonials: id } } // Remove the testimonial ID from the array
        );

        return NextResponse.json(
            { message: "Testimonial and references deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in DELETE:", error.message);
        return NextResponse.json(
            { message: "Error deleting testimonial", error: error.message },
            { status: 500 }
        );
    }
};



