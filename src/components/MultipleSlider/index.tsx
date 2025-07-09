import { FormItem, Slider } from "@vkontakte/vkui";

import "./styles.scss";

type MultipleSliderProps = {
  title: string;
  start?: number;
  end?: number;
  onChange: (value: any) => void;
};

export const MultipleSlider: React.FC<MultipleSliderProps> = ({
  title,
  start,
  end,
  onChange,
}) => {
  return (
    <div className="multiple-slider">
      {/* <div className="multiple-slider__title">{title}</div> */}
      <div className="multiple-slider__body">
        <FormItem top={title}>
          <Slider
            withTooltip
            multiple
            step={1}
            defaultValue={[start, end]}
            getAriaValueText={(value, index) =>
              index === 0 ? `Start thumb is ${value}` : `End thumb is ${value}`
            }
            onChange={(value) => onChange(value)}
          />
        </FormItem>
      </div>
      <div className="multiple-slider__footer">
        <div className="multiple-slider__start">{start}</div>
        <div className="multiple-slider__end">{end}</div>
      </div>
    </div>
  );
};
