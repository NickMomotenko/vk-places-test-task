import { useState } from "react";
import { Container } from "../../components/Container";
import { MultipleSlider } from "../../components/MultipleSlider";

import "./styles.scss";
import { ChipsSelects } from "../../components/ChipsSelect";

export const FilmsContainer = () => {
  const [rating, setRating] = useState([0, 100]);
  const [year, setYear] = useState([0, 100]);

  return (
    <div className="films">
      <Container>
        <div className="films__filters">
          <div className="films__genre">
            <ChipsSelects />
          </div>
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
      </Container>
    </div>
  );
};
