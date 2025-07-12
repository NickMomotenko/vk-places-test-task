import { Button, Title } from "@vkontakte/vkui";
import "./styles.scss";

type ModalContainerProps = {
  isActive: boolean;
  isFavorite: boolean;
  onAdd: any;
  onClose: any;
};

export const ModalContainer: React.FC<ModalContainerProps> = ({
  isActive,
  onAdd,
  onClose,
  isFavorite,
}) => {
  const titleText = !isFavorite
    ? "Добавить фильм в избранное?"
    : "Удалить фильм из избранного?";

  return (
    <div className={isActive ? "modal modal--active" : "modal"}>
      <div className="modal__content">
        <Title className="modal__title">{titleText}</Title>
        <div className="modal__buttons">
          <Button size="l" className="modal__button" onClick={onAdd}>
            {!isFavorite ? "Добавить" : "Удалить"}
          </Button>
          <Button
            mode="secondary"
            size="l"
            className="modal__button"
            onClick={onClose}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};
