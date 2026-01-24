import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "nature";
  const page = req.nextUrl.searchParams.get("page") || "1";

  try {
    const res = await axios(
      `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
