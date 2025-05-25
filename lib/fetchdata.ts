export const fetchData = async ({
    pageParam,
    currentOption
}: {
    pageParam?: number;
    currentOption: string
}) => {
    const response = await fetch(`/api/${currentOption}?page=${pageParam}`);
    const data = await response.json();

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