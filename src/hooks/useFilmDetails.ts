import { useState } from "react";
import { fetchMovieById } from "../api/api";
import type { FilmType } from "../helpers/types";

export const useFilmDetails = () => {
  const [filmWithDetails, setFilmWithDetals] = useState<FilmType | any>({});
  const [error, setError] = useState("");

  const loadDetailsById = async (id: number) => {
    try {
      setError(""); // сброс предыдущей ошибки, если была
      const data = await fetchMovieById(id);
      setFilmWithDetals(data);
    } catch (error: any) {
      setError(() => {
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";

        return errorMessage;
      });
    }
  };

  return { filmWithDetails, loadDetailsById, error };
};
