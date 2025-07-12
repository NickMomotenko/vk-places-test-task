import { forwardRef } from "react";

import "./styles.scss";
import { Spinner } from "@vkontakte/vkui";

export const InfiniteBlock = forwardRef<HTMLDivElement>(({ loading }, ref) => {
  return (
    <div ref={ref} className="infinite-block">
      <div
        className={
          loading ? "infinite-block__loader active" : "infinite-block__loader"
        }
      >
        <Spinner size="m" style={{ color: "black" }} />
      </div>
    </div>
  );
});
