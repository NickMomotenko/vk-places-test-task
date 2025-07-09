import './styles.scss'

export const FilmCard = () => {
  return <div className='film-card'>
    <div className="film-card__image"></div>
    <div className="film-card__content">
        <div className="film-card__title"></div>
        <div className="film-card__year"></div>
        <div className="film-card__rating"></div>
    </div>
  </div>;
};
