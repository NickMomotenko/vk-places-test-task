import { forwardRef } from "react";

import { Spinner } from "@vkontakte/vkui";

import "./styles.scss";

type InfiniteBlockProps = {
  loading?: boolean; 
};

export const InfiniteBlock = forwardRef<HTMLDivElement , InfiniteBlockProps>(({ loading }, ref) => {
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
