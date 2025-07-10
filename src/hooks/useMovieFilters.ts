import { useSearchParams } from "react-router-dom";

export const useMovieFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const genre = searchParams.get("genre") || "";

  const ratingParam = searchParams.get("rating") || "";
  const yearParam = searchParams.get("year") || "";

  const parseRange = (value: string) => {
    const parts = value.split("-");

    if (parts.length === 1) {
      return [Number(parts[0]), Number(parts[0])];
    }

    return [Number(parts[0]), Number(parts[1])];
  };

  const rating = parseRange(ratingParam) || [0, 10];
  const year = parseRange(yearParam) || [1990, new Date().getFullYear()];

  const updateFilter = (
    newFilters: Record<string, string | [number, number]>
  ) => {
    const params = new URLSearchParams(searchParams);

    for (const key in newFilters) {
      const value = newFilters[key];

      let stringValue = "";

      if (Array.isArray(value)) {
        stringValue =
          value[0] === value[1] ? `${value[0]}` : `${value[0]}-${value[1]}`;
      } else {
        stringValue = value;
      }

      if (stringValue) {
        params.set(key, stringValue);
      } else {
        params.delete(key);
      }
    }

    setSearchParams(params);
  };

  return {
    filters: {
      genre,
      rating,
      year,
    },
    updateFilter,
  };
};
