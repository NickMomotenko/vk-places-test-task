import { useEffect, useState } from "react";
import { MultipleSlider } from "../../components/MultipleSlider";

import "./styles.scss";
import { ChipsSelects } from "../../components/ChipsSelect";
import { Button } from "@vkontakte/vkui";
import { FilmCard } from "../../components/FilmCard";
import { fetchMovies } from "../../api/api";
import { useMovieFilters } from "../../hooks/useMovieFilters";

// useEffect(() => {
//   const loadMovies = async () => {
//     try {
//       const data = await fetchMovies(); // можно передать page, если нужно
//       console.log(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       // setLoading(false);
//     }
//   };

//   // loadMovies();
// }, []);

export const FilmsContainer = () => {
  const { filters, updateFilter } = useMovieFilters();

  const [rating, setRating] = useState<[number, number]>([0, 10]);
  const [year, setYear] = useState<[number, number]>([
    1990,
    new Date().getFullYear(),
  ]);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    updateFilter({
      rating,
      year,
    });
  }, [rating, year]);

  console.log(genres);

  return (
    <div className="films">
      <div className="films__filters">
        <div className="films__genre">
          <ChipsSelects data={genres} onChange={setGenres} />
        </div>
        <div className="films__filter">
          <div className="films__multiple">
            <div className="films__multiple-slider">
              <MultipleSlider
                title="По рейтингу"
                value={rating}
                onChange={setRating}
                min={0}
                max={10}
              />
            </div>
            <div className="films__multiple-slider">
              <MultipleSlider
                value={year}
                title="По году выпуска"
                onChange={setYear}
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
      <div className="films__list">
        {/* {[...new Array(1)].map((_, ind) => (
          <div className="films__item">
            <FilmCard key={ind} fullview />
          </div>
        ))} */}
      </div>
    </div>
  );
};
