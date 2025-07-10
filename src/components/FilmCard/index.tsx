import "./styles.scss";

import { film } from "../../helpers/mocked";
import { normalizeDate } from "../../helpers/utils";
import { useNavigate } from "react-router-dom";

type FilmCard = {
  fullview?: boolean;
};

export const FilmCard: React.FC<FilmCard> = ({ fullview = false }) => {
  const {
    poster,
    name,
    alternativeName,
    year,
    rating,
    premiere,
    description,
    genres,
  } = film;

  const navigate = useNavigate();

  return (
    <div className="film-card">
      <div className="film-card__image">
        <img src={poster.previewUrl} alt={name} />
      </div>
      <div className="film-card__content">
        <div className="film-card__main">
          <div className="film-card__title">
            <div className="film-card__title-rus">{name}</div>
            <div className="film-card__title-original">{alternativeName}</div>
          </div>
          <div className="film-card__year">Год выпуска - {year}</div>
          <div className="film-card__rating">Рейтинг - {rating.kp}</div>
          {fullview && (
            <div className="film-card__created-at">
              Дата выхода - {normalizeDate(premiere?.world)}
            </div>
          )}
        </div>
        {fullview && (
          <div className="film-card__info">
            <div className="film-card__info-block">
              <div className="film-card__info-title">Жанры</div>
              <div className="film-card__info-text">
                {genres.map((genre) => genre.name).join(", ")}
              </div>
            </div>
            <div className="film-card__info-block">
              <div className="film-card__info-title">Описание</div>
              <div className="film-card__info-text">{description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
