interface HeroImageResponse {
  imageUrl: string;
}

export async function getHeroImage(): Promise<HeroImageResponse> {
  const TWO_HOUR = 2 * 60 * 60 * 1000;
  const now = Date.now();

  const date = new Date(now);
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const seed = day * 24 + hour;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=Colorful%20Abstract&per_page=20&page=1`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY || "",
        },
        next: { revalidate: TWO_HOUR / 1000 },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const photos = data.photos;
    if (!photos || photos.length === 0) {
      throw new Error("No photos found");
    }

    const imageIndex = seed % photos.length;
    const image = photos[imageIndex];

    return {
      imageUrl: image.src.landscape,
    };
  } catch (error) {
    console.error("Error fetching hero image:", error);
    return {
      imageUrl:
        "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
    };
  }
}
