interface HeroImageResponse {
    imageUrl: string;
}

export async function getHeroImage(): Promise<HeroImageResponse> {
    const TWENTY_HOURS = 20 * 60 * 60 * 1000;
    const TWO_HOUR = 2 * 60 * 60 * 1000;

    const now = Date.now();

    const batchIndex = Math.floor(now / TWENTY_HOURS) % 100;
    const imageIndex = Math.floor((now % TWENTY_HOURS) / TWO_HOUR);

    try {
        const res = await fetch(
            `https://api.pexels.com/v1/search?query=nature&per_page=10&page=${batchIndex}`,
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY || ''
                },
                next: { revalidate: 72000 }
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const photos = data.photos;
        const image = photos[imageIndex] || photos[0];

        return {
            imageUrl: image.src.landscape
        };
    } catch (error) {
        console.error('Error fetching hero image:', error);
        return {
            imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg'
        };
    }
}