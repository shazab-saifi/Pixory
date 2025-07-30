import { Metadata } from "next";
import SearchPageClient from "./SearchPageClient";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}): Promise<Metadata> {
  const query = (await searchParams).query;

  if (query) {
    return {
      title: `Search Results for "${query}" - Pixory`,
      description: `Find photos and videos related to "${query}" on Pixory. Discover high-quality visual content.`,
      keywords: [query, "photos", "videos", "visual content", "search"],
      openGraph: {
        title: `Search Results for "${query}" - Pixory`,
        description: `Find photos and videos related to "${query}" on Pixory.`,
        type: "website",
        images: [
          {
            url: "/ogImage.png",
            width: 1200,
            height: 630,
            alt: "Pixory - Visual Content Platform",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `Search Results for "${query}" - Pixory`,
        description: `Find photos and videos related to "${query}" on Pixory.`,
        images: ["/ogImage.png"],
      },
    };
  }

  return {
    title: "Search - Pixory",
    description:
      "Search for photos and videos on Pixory. Find high-quality visual content.",
    keywords: ["search", "photos", "videos", "visual content"],
    openGraph: {
      title: "Search - Pixory",
      description: "Search for photos and videos on Pixory.",
      type: "website",
      images: [
        {
          url: "/ogImage.png",
          width: 1200,
          height: 630,
          alt: "Pixory - Visual Content Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Search - Pixory",
      description: "Search for photos and videos on Pixory.",
      images: ["/ogImage.png"],
    },
  };
}

const page = () => {
  return <SearchPageClient />;
};

export default page;
