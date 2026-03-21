// const API_KEY = "3M4PM11-HNQMSZB-N4QY5C9-VWBQSXP";
// const BASE_URL = "https://api.poiskkino.dev/v1.5/movie";
// const BASE_URL_BY_ID = "https://api.poiskkino.dev/v1.4/movie";

export async function fetchMovies(
  params: URLSearchParams,
  page: number = 1,
  limit = 50,
) {
  params.set("page", String(page));
  params.set("limit", String(limit));

  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}?${params.toString()}`,
    {
      headers: {
        "X-API-KEY": import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    const message = `Ошибка при загрузке фильмов! ${
      Array.isArray(data?.message) ? data?.message[0] : data?.message
    }`;
    throw new Error(message);
  }

  return data.docs;
}

export async function fetchMovieById(id: number) {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL_BY_ID}/${id}`, {
    headers: {
      "X-API-KEY": import.meta.env.VITE_API_KEY,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const message = `Ошибка при загрузке выбранного фильма! ${
      Array.isArray(data?.message) ? data?.message[0] : data?.message
    }`;
    throw new Error(message);
  }

  return data;
}
