import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const pageParam = req.nextUrl.searchParams.get('page') || 1;

    try {
        const response = await axios.get(`https://api.pexels.com/videos/popular?page=${pageParam}&per_page=10`, {
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