import { FormItem, Slider } from "@vkontakte/vkui";

import "./styles.scss";

type MultipleSliderProps = {
  title: string;
  min?: number;
  max?: number;
  value: any;
  onChange: (value: any) => void;
};

export const MultipleSlider: React.FC<MultipleSliderProps> = ({
  title,
  value,
  min,
  max,
  onChange,
}) => {
  return (
    <div className="multiple-slider">
      <div className="multiple-slider__body">
        <FormItem top={title}>
          <Slider
            withTooltip
            multiple
            step={1}
            min={min}
            max={max}
            value={value}
            getAriaValueText={(value, index) =>
              index === 0 ? `Start thumb is ${value}` : `End thumb is ${value}`
            }
            onChange={(value) => onChange(value as [number, number])}
          />
        </FormItem>
      </div>
      <div className="multiple-slider__footer">
        <div className="multiple-slider__value">
          {value[0] === value[1] ? value[0] : `${value[0]} - ${value[1]}`}
        </div>
      </div>
    </div>
  );
};
