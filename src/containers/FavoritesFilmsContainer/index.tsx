import { useEffect } from "react";

import { FilmCard } from "../../components/FilmCard";
import { InfiniteBlock } from "../../components/InfiniteBlock";
import { Title } from "../../components/Title";
import { ModalContainer } from "../../components/ModalContainer";

import { useFavoriteModal } from "../../hooks/useFavoriteModal";
import { useInfiniteScrollFromItems } from "../../hooks/usePaginatedData";

import "./styles.scss";

export const FavoritesFilmsContainer = () => {
  const {
    modal,
    favorites,
    isFavorite,
    filmToFavorites,
    openWithFilm,
    confirmAdd,
    cancel,
  } = useFavoriteModal();

  const { data: favoritesToRender, sentryRef } = useInfiniteScrollFromItems({
    items: favorites,
    pageSize: 10,
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);
  }, []);

  return (
    <div className="favorite-films">
      <Title>Избранные фильмы</Title>
      <div className="favorite-films__content">
        {!favoritesToRender.length ? (
          <Title>Избранных фильмов еще нету</Title>
        ) : (
          <ul className="favorite-films__list">
            {favoritesToRender?.map((film, ind) => (
              <li className="favorite-films__item" key={ind}>
                <FilmCard
                  film={film}
                  isFavorite={isFavorite(film?.id)}
                  onAddClick={openWithFilm}
                />
              </li>
            ))}
          </ul>
        )}

        <InfiniteBlock ref={sentryRef} />
      </div>
      <ModalContainer
        isActive={modal.isActive}
        onAdd={() => {
          confirmAdd();
        }}
        onClose={cancel}
        isFavorite={isFavorite(filmToFavorites?.id)}
      />
    </div>
  );
};
