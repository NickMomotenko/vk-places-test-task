import { forwardRef } from "react";

import "./styles.scss";

export const InfiniteBlock = forwardRef<HTMLDivElement>((props, ref) => {
  return <div ref={ref} className="infinite-block"></div>;
});
