import { useState } from "react";

import { useFavorites } from "./useFavorites";
import { useModal } from "./useModal";

export const useFavoriteModal = () => {
  const [filmToFavorites, setFilmToFavorites] = useState<{}>({});

  const modal = useModal();

  const { favorites, addToFavorite, isFavorite } = useFavorites();

  const openWithFilm = (film: any) => {
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
