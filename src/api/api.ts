const API_KEY = "3M4PM11-HNQMSZB-N4QY5C9-VWBQSXP";
const BASE_URL = "https://api.kinopoisk.dev/v1.4/movie";

export async function fetchMovies(
  params: URLSearchParams,
  page: number = 1,
  limit = 50
) {
  params.set("page", String(page));
  params.set("limit", String(limit));

  const response = await fetch(`${BASE_URL}?${params.toString()}`, {
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при загрузке фильмов");
  }

  const data = await response.json();
  return data.docs;
}

export async function fetchMovieById(id: number) {
  const response = await fetch(`${BASE_URL}/${id}}`, {
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при загрузке фильмов");
  }

  const data = await response.json();
  return data;
}
