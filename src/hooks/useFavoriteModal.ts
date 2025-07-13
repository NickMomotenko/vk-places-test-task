import { useState } from "react";

import { useFavorites } from "./useFavorites";
import { useModal } from "./useModal";
import type { FilmType } from "../helpers/types";

export const useFavoriteModal = () => {
  const [filmToFavorites, setFilmToFavorites] = useState<FilmType | any>({});

  const modal = useModal();

  const { favorites, addToFavorite, isFavorite } = useFavorites();

  const openWithFilm = (film: FilmType) => {
    setFilmToFavorites(film);
    modal.showModal();
  };

  const confirmAdd = () => {
    addToFavorite(filmToFavorites);
    modal.closeModal();
  };

  const cancel = () => {
    modal.closeModal();
    setFilmToFavorites({});
  };

  return {
    modal,
    favorites,
    isFavorite,
    filmToFavorites,
    openWithFilm,
    confirmAdd,
    cancel,
  };
};
