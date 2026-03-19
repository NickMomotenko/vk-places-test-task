import { useSearchParams } from "react-router-dom";

import { MultipleSlider } from "../../components/MultipleSlider";
import { ChipsSelects } from "../../components/ChipsSelect";
import { FilmCard } from "../../components/FilmCard";
import { Title } from "../../components/Title";
import { SkeletonCard } from "../../components/SkeletonCard";
import { InfiniteBlock } from "../../components/InfiniteBlock";

import { ModalContainer } from "../../components/ModalContainer";

import { useFavoriteModal } from "../../hooks/useFavoriteModal";
import { useMovieFilters } from "../../hooks/useMovieFilters";
import { useInfiniteScrollData } from "../../hooks/useInfiniteScrollData";

import { fetchMovies } from "../../api/api";

import { Button, ButtonGroup, ModalCard, Spacing, Spinner } from "@vkontakte/vkui";

import "./styles.scss";
import { useEffect } from "react";
import { useComprasionData } from "../../hooks/useComprasionData";

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

  const { addToComprasion, isCompresed } = useComprasionData();

  const {
    data: movies,
    sentryRef,
    reset,
    loading,
    error,
  } = useInfiniteScrollData({
    fetchPage: (page) => fetchMovies(searchParams, page, 50),
    pageSize: 50,
    maxPages: 100,
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="films">
      <div className="films__filters">
        <div className="films__genre">
          <ChipsSelects
            disabled={loading}
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
                disabled={loading}
                value={rating}
                onChange={(newValue: any) =>
                  updateFilter({ "rating.kp": newValue })
                }
                min={0}
                max={10}
              />
            </div>
            <div className="films__multiple-slider">
              <MultipleSlider
                value={year}
                disabled={loading}
                title="По году выпуска"
                onChange={(newValue: any) => updateFilter({ year: newValue })}
                min={1990}
                max={new Date().getFullYear()}
              />
            </div>
          </div>
          <div className="films__submit">
            <Button
              size="l"
              onClick={() => {
                reset();
              }}
              disabled={loading}
            >
              {loading ? <Spinner style={{ color: "#fff" }} /> : "Найти"}
            </Button>
          </div>
        </div>
      </div>
      <Title>Все фильмы</Title>
      <div className="films__content">
        {error && <Title>{error}</Title>}
        <ul className="films__list">
          {movies.length === 0 && loading
            ? [...Array(4)].map((_, ind) => (
                <li className="films__item" key={ind}>
                  <SkeletonCard />
                </li>
              ))
            : movies.map((film, ind) => (
                <li className="films__item" key={ind}>
                  <FilmCard
                    film={film}
                    onAddClick={openWithFilm}
                    onComprasionClick={addToComprasion}
                    isFavorite={isFavorite(film && film.id)}
                    isCompresed={isCompresed(film && film.id)}
                  />
                </li>
              ))}
        </ul>
        <InfiniteBlock ref={sentryRef} loading={loading} />
      </div>
      <ModalCard
        open={modal.isActive}
        onClose={modal.closeModal}
        title={
          !isFavorite(filmToFavorites?.id)
            ? "Добавить в избранное?"
            : "Удалить из избранного?"
        }
        actions={
          <>
            <Spacing size={16} />
            <ButtonGroup gap="m" stretched>
              <Button
                key="deny"
                size="l"
                mode="secondary"
                stretched
                onClick={() => {
                  modal.closeModal();
                  confirmAdd();
                }}
              >
                {!isFavorite(filmToFavorites?.id) ? "Добавить" : "Удалить"}
              </Button>
              <Button
                key="allow"
                size="l"
                mode="primary"
                stretched
                onClick={modal.closeModal}
              >
                Отмена
              </Button>
            </ButtonGroup>
          </>
        }
      />
    </div>
  );
};
