import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/user.model";
import { Product } from "@/models/product.model";
import { connectDB } from "@/connectDB/connectDB";




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

        const product = new Product({
            author: user._id,
            name: data.name,
            square: data.square,
            header: data.header,
            message: data.message
        });
        await product.save();

        return NextResponse.json('successfull', { status: 200 })
    } catch (error) {
        console.log(error?.message);
        return NextResponse.json(error.message, { status: 500 })
    }
}