import { Title as TitleVKUI } from "@vkontakte/vkui";
import "./styles.scss";

type TitleProps = {
  children: React.ReactNode;
  level?: any;
};

export const Title: React.FC<TitleProps> = ({ children, ...rest }) => {
  return (
    <TitleVKUI className="title" {...rest}>
      {children}
    </TitleVKUI>
  );
};
