import { MultipleSlider } from "../../components/MultipleSlider";

import "./styles.scss";
import { ChipsSelects } from "../../components/ChipsSelect";
import { Button } from "@vkontakte/vkui";
import { FilmCard } from "../../components/FilmCard";
import { fetchMovies } from "../../api/api";
import { useMovieFilters } from "../../hooks/useMovieFilters";
import { useEffect } from "react";
import { films } from "../../helpers/mocked";
import { Title } from "../../components/Title";
import { useFavorites } from "../../hooks/useFavorites";

export const FilmsContainer = () => {
  const { filters, updateFilter } = useMovieFilters();
  const { rating, year, genres } = filters;

  const { addToFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        console.log(data);
      } catch (err) {
        console.error(err);
      } finally {
        // setLoading(false);
      }
    };

    // loadMovies();
  }, []);

  return (
    <div className="films">
      <div className="films__filters">
        <div className="films__genre">
          <ChipsSelects
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
                value={rating}
                onChange={(newValue: any) => updateFilter({ rating: newValue })}
                min={0}
                max={10}
              />
            </div>
            <div className="films__multiple-slider">
              <MultipleSlider
                value={year}
                title="По году выпуска"
                onChange={(newValue: any) => updateFilter({ year: newValue })}
                min={1990}
                max={new Date().getFullYear()}
              />
            </div>
          </div>
          <div className="films__submit">
            <Button size="l">Найти</Button>
          </div>
        </div>
      </div>
      <Title>Все фильмы</Title>
      <ul className="films__list">
        {films?.map((film, ind) => (
          <li className="films__item" key={ind}>
            <FilmCard
              film={film}
              onAddClick={addToFavorite}
              isFavorite={isFavorite(film?.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
