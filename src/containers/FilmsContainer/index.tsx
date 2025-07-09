import { useState } from "react";
import { MultipleSlider } from "../../components/MultipleSlider";

import "./styles.scss";
import { ChipsSelects } from "../../components/ChipsSelect";
import { Button } from "@vkontakte/vkui";
import { FilmCard } from "../../components/FilmCard";

export const FilmsContainer = () => {
  const [rating, setRating] = useState([0, 100]);
  const [year, setYear] = useState([0, 100]);

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
                start={rating[0]}
                end={rating[1]}
                title="По рейтингу"
                onChange={setRating}
              />
            </div>
            <div className="films__multiple-slider">
              <MultipleSlider
                start={year[0]}
                end={year[1]}
                title="По году выпуска"
                onChange={setYear}
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
