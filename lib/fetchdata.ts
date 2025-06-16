export const fetchData = async ({
    pageParam,
    currentOption,
    query
}: {
    pageParam?: number;
    currentOption: string;
    query?: string
}) => {
    let data = [];

    try {
        if (query) {
            const response = await fetch(`/api/photoSearch?query=${query}&page=${pageParam}`);
            data = await response.json();
        } else {
            const response = await fetch(`/api/${currentOption}?page=${pageParam}`);
            data = await response.json();
        }
    } catch (error) {

    }

    let nextPage: number | null = null;
    if (data.next_page) {
        const url = new URL(data.next_page);
        const nextParam = url.searchParams.get('page')

        nextPage = nextParam ? parseInt(nextParam, 10) : null;
    }

    return {
        data,
        nextPage
    }
}