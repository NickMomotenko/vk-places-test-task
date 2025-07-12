import { useParams } from "react-router-dom";

import { FilmCard } from "../../components/FilmCard";
import { SkeletonCard } from "../../components/SkeletonCard";

// import { film } from "./../../helpers/mocked";
import { useEffect } from "react";
import { useFilmDetails } from "../../hooks/useFilmDetails";

export const FilmDetailsContainer = () => {
  const params = useParams();

  const { loadDetailsById, filmWithDetails } = useFilmDetails();

  useEffect(() => {
    const { id } = params;

    const handleLoadFilDetailsById = async () => {
      await loadDetailsById(Number(id));
    };

    handleLoadFilDetailsById();
  }, [params.id]);

  return (
    <div className="film-details">
      {Object.keys(filmWithDetails).length === 0 ? (
        <SkeletonCard />
      ) : (
        <FilmCard fullview film={filmWithDetails} />
      )}
    </div>
  );
};
