import { useState } from "react";
import { fetchMovieById } from "../api/api";

export const useFilmDetails = () => {
  const [filmWithDetails, setFilmWithDetals] = useState({});

  const loadDetailsById = async (id: number) => {
    const data = await fetchMovieById(id);

    setFilmWithDetals(data);
  };

  return { filmWithDetails, loadDetailsById };
};
