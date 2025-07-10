import { Title as TitleVKUI } from "@vkontakte/vkui";
import "./styles.scss";

type TitleProps = {
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ children }) => {
  return <TitleVKUI className="title">{children}</TitleVKUI>;
};
