import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const response = await axios.get(`https://api.pexels.com/videos/videos/${id}`, {
            headers: {
                Authorization: process.env.PEXELS_API_KEY
            }
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({Error: error.message}), {
            status: 500
        });
    }
}