import { useEffect } from "react";

import { FilmCard } from "../../components/FilmCard";
import { InfiniteBlock } from "../../components/InfiniteBlock";
import { Title } from "../../components/Title";
import { ModalContainer } from "../../components/ModalContainer";

import { useFavoriteModal } from "../../hooks/useFavoriteModal";
import { useInfiniteScrollFromItems } from "../../hooks/usePaginatedData";

import "./styles.scss";
import { ModalCard, Spacing, ButtonGroup, Button } from "@vkontakte/vkui";

export const FavoritesFilmsContainer = () => {
  const {
    modal,
    favorites,
    isFavorite,
    filmToFavorites,
    openWithFilm,
    confirmAdd,
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
      <ModalCard
        open={modal.isActive}
        onClose={modal.closeModal}
        title={
          !isFavorite(filmToFavorites?.id)
            ? "Добавить в избранное?"
            : "Удалить из избранного?"
        }
        actions={
          <>
            <Spacing size={16} />
            <ButtonGroup gap="m" stretched>
              <Button
                key="deny"
                size="l"
                mode="secondary"
                stretched
                onClick={() => {
                  modal.closeModal();
                  confirmAdd();
                }}
              >
                {!isFavorite(filmToFavorites?.id) ? "Добавить" : "Удалить"}
              </Button>
              <Button
                key="allow"
                size="l"
                mode="primary"
                stretched
                onClick={modal.closeModal}
              >
                Отмена
              </Button>
            </ButtonGroup>
          </>
        }
      />
    </div>
  );
};
