import { useNavigate } from "react-router-dom";
А;

import { Button } from "@vkontakte/vkui";

import { normalizeDate } from "../../helpers/utils";

import "./styles.scss";

type FilmCard = {
  fullview?: boolean;
  film?: any;
  onAddClick?: any;
  isFavorite?: boolean;
};

export const FilmCard: React.FC<FilmCard> = ({
  fullview = false,
  film,
  isFavorite,
  onAddClick,
}) => {
  const {
    id,
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

  const handleFilmItemClick = () => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="film-card" onClick={handleFilmItemClick}>
      <div
        className={
          poster?.previewUrl
            ? `film-card__image`
            : "film-card__image no-preview"
        }
      >
        {poster?.previewUrl ? (
          <img src={poster?.previewUrl} alt={name} />
        ) : (
          <div className="film-card__image-text">Постера нет</div>
        )}
      </div>
      <div className="film-card__content">
        <div className="film-card__row">
          <div className="film-card__main">
            <div className="film-card__title">{name ?? alternativeName}</div>
            <div className="film-card__year">Год выпуска - {year}</div>
            <div className="film-card__rating">Рейтинг - {rating.kp}</div>
            {fullview && (
              <div className="film-card__created-at">
                Дата выхода - {normalizeDate(premiere?.world)}
              </div>
            )}
            {/* <div className="film-card__favorites">
            <Button>В избранное</Button>
          </div> */}
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
        <div className="film-card__bottom">
          <Button
            onClick={(event) => {
              event.stopPropagation();
              onAddClick(film);
            }}
            mode={isFavorite ? "secondary" : "primary"}
          >
            {!isFavorite ? "В избранное" : "Убрать из избранного"}
          </Button>
        </div>
      </div>
    </div>
  );
};
