import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useMovieFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const parseRange = (value: string, fallback: [number, number]): [number, number] => {
    if (!value) return fallback;
    const [a, b] = value.split("-").map(Number);
    if (isNaN(a)) return fallback;
    return [a, isNaN(b) ? a : b];
  };

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  // Теперь жанры хранятся как ?genres=аниме,вестерн
  const genresParam = searchParams.get("genres.name") || "";
  const genres = genresParam ? genresParam.split(",") : [];

  const ratingParam = searchParams.get("rating.kp") || "";
  const yearParam = searchParams.get("year") || "";

  const rating = parseRange(ratingParam, [0, 10]);
  const year = parseRange(yearParam, [1990, new Date().getFullYear()]);

  useEffect(() => {
    correctRange("year", yearParam, [1874, 2050]);
    correctRange("rating.kp", ratingParam, [0, 10]);
  }, [yearParam, ratingParam]);

  const correctRange = (
    key: string,
    rawValue: string,
    [min, max]: [number, number]
  ) => {
    if (!rawValue) return;
    const [start, end] = parseRange(rawValue, [min, max]);
    const fixedStart = clamp(start, min, max);
    const fixedEnd = clamp(end, min, max);

    if (fixedStart !== start || fixedEnd !== end) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set(key, fixedStart === fixedEnd ? `${fixedStart}` : `${fixedStart}-${fixedEnd}`);
        return next;
      });
    }
  };

  const updateFilter = (
    newFilters: Record<string, string | string[] | [number, number]>
  ) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      for (const [key, value] of Object.entries(newFilters)) {
        if (key === "genres.name") {
          const arr = value as string[];
          if (arr.length === 0) {
            params.delete("genres.name");
          } else {
            params.set("genres.name", arr.join(","));
          }
        } else if (Array.isArray(value)) {
          const [start, end] = value as [number, number];
          params.set(key, start === end ? `${start}` : `${start}-${end}`);
        } else {
          params.set(key, value);
        }
      }

      return params;
    });
  };

  return {
    filters: { genres, rating, year },
    updateFilter,
  };
};