import { Skeleton } from "@vkontakte/vkui";

import "./styles.scss";

export const SkeletonCard = () => {
  return (
    <div className="skeleton">
      <Skeleton className="skeleton__poster" />
      <div className="skeleton__body">
        <div className="skeleton__main">
          <Skeleton width="100%" height={20} className="skeleton__row" />
          <Skeleton width="75%" height={20} className="skeleton__row" />
          <Skeleton width="50%" height={20} className="skeleton__row" />
        </div>
        <div className="skeleton__button">
          <Skeleton width="40%" height={20} className="skeleton__row" />
        </div>
      </div>
    </div>
  );
};
