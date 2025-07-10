const API_KEY = "3M4PM11-HNQMSZB-N4QY5C9-VWBQSXP";
const BASE_URL = "https://api.kinopoisk.dev/v1.4/movie";

export async function fetchMovies(page: number = 1) {
  const response = await fetch(`${BASE_URL}?page=${page}`, {
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при загрузке фильмов");
  }

  const data = await response.json();
  return data.docs; // зависит от ответа API
}