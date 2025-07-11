import { useParams } from "react-router-dom";

import { FilmCard } from "../../components/FilmCard";
import { SkeletonCard } from "../../components/SkeletonCard";

import { film } from "./../../helpers/mocked";

export const FilmDetailsContainer = () => {
  const params = useParams();

  return (
    <div className="film-details">
      <FilmCard fullview film={film} />
      <SkeletonCard />
    </div>
  );
};
