import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type AxiosErrorLike = {
  code?: string;
  response?: unknown;
  message?: string;
};

export async function GET(req: NextRequest) {
  const pageParam = req.nextUrl.searchParams.get("page") ?? "1";
  const retries = 3;

  for (let i = 0; i < retries; i++) {
    try {
      const before = Date.now();
      const response = await axios.get(
        `https://api.pexels.com/videos/popular?page=${pageParam}&per_page=10`,
        {
          headers: {
            Authorization: process.env.PEXELS_API_KEY,
          },
          timeout: 10000,
        }
      );
      const after = Date.now();

      console.log(
        `Time taken to fetch video ${Math.floor((after - before) / 1000)}s`
      );

      const limit = response.headers["x-ratelimit-limit"];
      const remaining = response.headers["x-ratelimit-remaining"];
      const reset = response.headers["x-ratelimit-reset"];

      console.log(response.status);
      console.log("Rate Limit:", limit);
      console.log("Remaining:", remaining);
      console.log(
        "Reset Time:",
        new Date(parseInt(reset || "0") * 1000).toLocaleString()
      );

      return NextResponse.json(response.data);
    } catch (err) {
      const error = err as AxiosErrorLike;
      // const code = error.code;
      // const response = error.response;
      const message = error.message || String(err);

      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, 1000 * (i + 1)));
        continue;
      }

      return new NextResponse(
        JSON.stringify({
          error: "Failed to fetch videos from Pexels",
          details: message,
        }),
        { status: 500 }
      );
    }
  }

  return new NextResponse(
    JSON.stringify({ error: "Retries exhausted without success" }),
    { status: 500 }
  );
}
