import {
  ChipsSelect as ChipsSelectVK,
  FormItem,
} from "@vkontakte/vkui";

import { genres } from "../../helpers/mocked";

import "./styles.scss";

type ChipsSelectsProps = {
  data: string[];
  onChange: (values: string[]) => void;
  disabled?:boolean;
};

export const ChipsSelects: React.FC<ChipsSelectsProps> = ({
  data,
  disabled,
  onChange,
}) => {
  return (
    <div className="chips-select">
      <FormItem htmlFor="colorsWithoutButton" top="Выберите или добавьте жанр">
        <ChipsSelectVK
          id="colorsWithoutButton"
          value={data.map((item) => ({ value: item, label: item }))}
          onChange={(newValue) => onChange(newValue.map((item) => item.value))}
          options={genres.map(({ name }) => {
            return { value: name, label: name };
          })}
          disabled={disabled}
          creatable={true}
          placeholder="Не выбраны"
        />
      </FormItem>
    </div>
  );
};
