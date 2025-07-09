import { ChipsSelect as ChipsSelectVK, FormItem } from "@vkontakte/vkui";
import { useState } from "react";
import { genres } from "../../helpers/mocked";

import "./styles.scss";

export const ChipsSelects = () => {
  const [selectedColorsCopy, setSelectedColorsCopy] = useState([]);

  return (
    <div className="chips-select">
      <FormItem htmlFor="colorsWithoutButton" top="Выберите или добавьте жанр">
        <ChipsSelectVK
          id="colorsWithoutButton"
          value={selectedColorsCopy}
          onChange={setSelectedColorsCopy}
          options={genres.map(({ name }) => {
            return { value: name, label: name };
          })}
          creatable={true}
          placeholder="Не выбраны"
        />
      </FormItem>
    </div>
  );
};
