import { useParams } from "react-router-dom";

import { FilmCard } from "../../components/FilmCard";
import { SkeletonCard } from "../../components/SkeletonCard";

import { useEffect } from "react";
import { useFilmDetails } from "../../hooks/useFilmDetails";
import { Title } from "../../components/Title";
import { useFavoriteModal } from "../../hooks/useFavoriteModal";
import { ModalCard, Spacing, ButtonGroup, Button } from "@vkontakte/vkui";
import { useComprasionData } from "../../hooks/useComprasionData";

export const FilmDetailsContainer = () => {
  const params = useParams();

  const { loadDetailsById, filmWithDetails, error } = useFilmDetails();

  const { modal, isFavorite, filmToFavorites, openWithFilm, confirmAdd } =
    useFavoriteModal();

  const { addToComprasion, isCompresed } = useComprasionData();

  useEffect(() => {
    const { id } = params;

    const handleLoadFilDetailsById = async () => {
      await loadDetailsById(Number(id));
    };

    handleLoadFilDetailsById();
  }, [params.id]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="film-details">
      <Title>Выбранный фильм</Title>
      {error ? (
        <Title>{error}</Title>
      ) : Object.keys(filmWithDetails).length === 0 ? (
        <SkeletonCard />
      ) : (
        <FilmCard
          fullview
          film={filmWithDetails}
          isFavorite={isFavorite(filmWithDetails?.id)}
          onAddClick={openWithFilm}
          onComprasionClick={addToComprasion}
          isCompresed={isCompresed(filmWithDetails && filmWithDetails.id)}
        />
      )}
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
