import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('query') || 'nature';
    const pageParam = req.nextUrl.searchParams.get('page') || '1';

    try {
        const res = await axios.get(`https://api.pexels.com/videos/search?query=${query}&per_page=10&page=${pageParam}`, {
            headers: {
                Authorization: process.env.PEXELS_API_KEY
            }
        });
        
        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Internal server error in videoSearch endpoint", error);
        return new NextResponse(JSON.stringify(error), {
            status: 500
        });
    }
}