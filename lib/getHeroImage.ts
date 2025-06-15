interface HeroImageResponse {
    imageUrl: string;
}

export async function getHeroImage(): Promise<HeroImageResponse> {
    const TWO_HOUR = 2 * 60 * 60 * 1000;
    const now = Date.now();
    
    const imageIndex = Math.floor(now / TWO_HOUR) % 10;

    try {
        const res = await fetch(
            `https://api.pexels.com/v1/search?query=nature&per_page=1&page=${imageIndex + 1}`,
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY || ''
                },
                next: { revalidate: TWO_HOUR / 1000 }
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const image = data.photos[0];

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