import { connectDB } from "@/connectDB/connectDB";
import { Product } from "@/models/product.model";
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
        const result = await Product.findOne({ name: product }).populate({
            path: 'testimonials', 
        });

        if (!result) {
            return NextResponse.json('Not Found', { status: 404 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('[dynamic] page error::', error?.message);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
};