import { useSearchParams } from "react-router-dom";

export const useMovieFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ===== Helpers =====
  const parseRange = (value: string, fallback: [number, number]) => {
    if (!value) return fallback;
    const parts = value.split("-");
    const start = Number(parts[0]);
    const end = Number(parts[1] ?? parts[0]);

    if (isNaN(start) || isNaN(end)) return fallback;
    return [start, end] as [number, number];
  };

  const genres = searchParams.getAll("genres.name");
  const ratingParam = searchParams.get("rating") || "";
  const yearParam = searchParams.get("year") || "";

  const rating = parseRange(ratingParam, [0, 10]);
  const year = parseRange(yearParam, [1990, new Date().getFullYear()]);

  // ===== Update Filters =====
  const updateFilter = (
    newFilters: Record<string, string | string[] | [number, number]>
  ) => {
    const params = new URLSearchParams();

    // 1. Сначала копируем все текущие параметры, кроме тех, которые перезаписываем в newFilters
    // При этом genres.name нужно копировать всегда, если не перезаписаны в newFilters
    searchParams.forEach((value, key) => {
      const isGenres = key === "genres.name";
      const keyInNewFilters = Object.prototype.hasOwnProperty.call(
        newFilters,
        key === "genres.name" ? "genres" : key
      );

      // Если это genres.name и в newFilters нет 'genres' — сохраняем
      if (isGenres && !keyInNewFilters) {
        params.append(key, value);
      }
      // Если это не genres.name и ключ не в newFilters — сохраняем
      else if (!isGenres && !keyInNewFilters) {
        params.append(key, value);
      }
    });

    // 2. Теперь добавляем/заменяем параметры из newFilters
    for (const key in newFilters) {
      const value = newFilters[key];

      if (Array.isArray(value)) {
        if (typeof value[0] === "string") {
          // Для genres — добавляем по одному
          value.forEach((genre) => {
            params.append("genres.name", genre);
          });
        } else {
          // Для диапазонов
          const [start, end] = value as [number, number];
          const stringValue = start === end ? `${start}` : `${start}-${end}`;
          params.set(key, stringValue);
        }
      } else {
        params.set(key, value);
      }
    }

    setSearchParams(params);
  };

  return {
    filters: {
      genres,
      rating,
      year,
    },
    updateFilter,
  };
};
