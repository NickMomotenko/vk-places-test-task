import { FilmCard } from "../../components/FilmCard";
import { Title } from "../../components/Title";
import { useFavorites } from "../../hooks/useFavorites";

import "./styles.scss";

export const FavoritesFilmsContainer = () => {
  const { favorites, isFavorite, addToFavorite } = useFavorites();

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
                onAddClick={addToFavorite}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
