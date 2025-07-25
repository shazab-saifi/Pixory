export const fetchData = async ({
  pageParam,
  currentOption,
  query,
}: {
  pageParam?: number;
  currentOption: string;
  query?: string;
}) => {
  let data = [];

  try {
    let response;

    if (query) {
      response = await fetch(
        `/api/${currentOption === "photos" ? "photoSearch" : "videoSearch"}?query=${query}&page=${pageParam}`,
      );
    } else {
      response = await fetch(`/api/${currentOption}?page=${pageParam}`);
    }

    data = await response.json();
  } catch (error) {
    console.error("Internal server error:", error);
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred during fetchData");
  }

  let nextPage: number | null = null;
  if (data.next_page) {
    try {
      const url = new URL(data.next_page);
      const nextParam = url.searchParams.get("page");
      nextPage = nextParam ? parseInt(nextParam, 10) : null;
    } catch (e) {
      console.log(e);
      nextPage = null;
    }
  }

  return {
    data,
    nextPage,
  };
};
