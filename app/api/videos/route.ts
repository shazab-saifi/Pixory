import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const pageParam = req.nextUrl.searchParams.get('page') || 1;

    try {
        const before = Date.now();
        const response = await axios.get(`https://api.pexels.com/videos/popular?page=${pageParam}`, {
            headers: {
                Authorization: process.env.PEXELS_API_KEY
            }
        });
        const after = Date.now();

        console.log(`Time taken to fetch video ${Math.floor((after / 1000) - (before / 1000))}s`);
        const limit = response.headers['x-ratelimit-limit']
        const remaining = response.headers['x-ratelimit-remaining'];
        const reset = response.headers['x-ratelimit-reset'];

        console.log(response.status);
        console.log('Rate Limit:', limit);
        console.log('Remaining:', remaining);
        console.log('Reset Time:', new Date(parseInt(reset || '0') * 1000).toLocaleString());

        return NextResponse.json(response.data);
    } catch (error) {
        return new NextResponse(JSON.stringify({ Error: error }), {
            status: 500
        });
    }
}