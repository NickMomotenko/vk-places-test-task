import { FilmCard } from "../../components/FilmCard";
import { Title } from "../../components/Title";
import { useFavoriteModal } from "../../hooks/useFavoriteModal";
import { useFavorites } from "../../hooks/useFavorites";
import { ModalContainer } from "../ModalContainer";

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

  return (
    <div className="favorite-films">
      <Title>Избранные фильмы</Title>
      <div className="favorite-films__content">
        <ul className="favorite-films__list">
          {favorites?.map((film, ind) => (
            <li className="favorite-films__item" key={ind}>
              <FilmCard
                film={film}
                isFavorite={isFavorite(film?.id)}
                onAddClick={openWithFilm}
              />
            </li>
          ))}
        </ul>
        <ModalContainer
          isActive={modal.isActive}
          onAdd={confirmAdd}
          onClose={cancel}
          isFavorite={isFavorite(filmToFavorites?.id)}
        />
      </div>
    </div>
  );
};
