import { MultipleSlider } from "../../components/MultipleSlider";

import "./styles.scss";
import { ChipsSelects } from "../../components/ChipsSelect";
import { Button, Spinner } from "@vkontakte/vkui";
import { FilmCard } from "../../components/FilmCard";
import { fetchMovies } from "../../api/api";
import { useMovieFilters } from "../../hooks/useMovieFilters";
import { films } from "../../helpers/mocked";
import { Title } from "../../components/Title";
import { SkeletonCard } from "../../components/SkeletonCard";
import { ModalContainer } from "../ModalContainer";
import { useFavoriteModal } from "../../hooks/useFavoriteModal";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const FilmsContainer = () => {
  const { filters, updateFilter } = useMovieFilters();
  const { rating, year, genres } = filters;

  const [searchParams] = useSearchParams();

  const {
    modal,
    isFavorite,
    filmToFavorites,
    openWithFilm,
    confirmAdd,
    cancel,
  } = useFavoriteModal();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    // setIsLoading(true);
    // try {
    //   const data = await fetchMovies(searchParams);
    //   console.log(data);
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 4000);
    // }
  };

  return (
    <div className="films">
      <div className="films__filters">
        <div className="films__genre">
          <ChipsSelects
            disabled={true}
            data={genres}
            onChange={(selectedGenres: any) =>
              updateFilter({ genres: selectedGenres })
            }
          />
        </div>
        <div className="films__filter">
          <div className="films__multiple">
            <div className="films__multiple-slider">
              <MultipleSlider
                title="По рейтингу"
                disabled={true}
                value={rating}
                onChange={(newValue: any) => updateFilter({ rating: newValue })}
                min={0}
                max={10}
              />
            </div>
            <div className="films__multiple-slider">
              <MultipleSlider
                value={year}
                disabled={true}
                title="По году выпуска"
                onChange={(newValue: any) => updateFilter({ year: newValue })}
                min={1990}
                max={new Date().getFullYear()}
              />
            </div>
          </div>
          <div className="films__submit">
            <Button size="l" onClick={loadMovies} disabled>
              {isLoading ? <Spinner style={{ color: "#fff" }} /> : "Найти"}
            </Button>
          </div>
        </div>
      </div>
      <Title>Все фильмы</Title>
      <div className="films__content">
        {!films.length || isLoading ? (
          <ul className="films__list">
            {[...new Array(4)]?.map((film, ind) => (
              <li className="films__item" key={ind}>
                <SkeletonCard />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="films__list">
            {films?.map((film, ind) => (
              <li className="films__item" key={ind}>
                <FilmCard
                  film={film}
                  onAddClick={openWithFilm}
                  isFavorite={isFavorite(film?.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {modal.isActive && (
        <ModalContainer
          isActive={modal.isActive}
          onAdd={confirmAdd}
          onClose={cancel}
          isFavorite={isFavorite(filmToFavorites?.id)}
        />
      )}
    </div>
  );
};
