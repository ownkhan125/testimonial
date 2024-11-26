import { connectDB } from "@/connectDB/connectDB";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
    try {
        await connectDB();

        const { params } = context;
        const spaceName = params?.name;
        console.log('Dynamic slug (spaceName):', spaceName);

        if (!spaceName) {
            return NextResponse.json('Bad Request', { status: 400 });
        }

        const product = await Product.findOne({ name: spaceName });

        if (!product) {
            return NextResponse.json('Not Found', { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });

    } catch (error) {
        console.error('[dynamic] page error::', error?.message);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
};
