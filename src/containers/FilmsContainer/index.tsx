import { useState } from "react";
import { MultipleSlider } from "../../components/MultipleSlider";

import "./styles.scss";
import { ChipsSelects } from "../../components/ChipsSelect";
import { Button } from "@vkontakte/vkui";
import { FilmCard } from "../../components/FilmCard";

export const FilmsContainer = () => {
  const [rating, setRating] = useState([0, 10]);
  const [year, setYear] = useState([1990, new Date().getFullYear()]);

  return (
    <div className="films">
      <div className="films__filters">
        <div className="films__genre">
          <ChipsSelects />
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
        <div className="films__item">
          <FilmCard />
        </div>
        <div className="films__item">
          <FilmCard />
        </div>
      </div>
    </div>
  );
};
