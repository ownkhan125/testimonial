import { NextResponse } from "next/server";

export const GET = async (req , context) => {
    try {

       const data = await context.params

        return NextResponse.json(data.id, { status: 200 });

        
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });

    }
} 