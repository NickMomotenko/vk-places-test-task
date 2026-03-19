import { NavLink } from "react-router-dom";

import { ROUTES } from "./../../helpers/routes";

import "./styles.scss";
import { useFavorites } from "../../hooks/useFavorites";
import { useComprasionData } from "../../hooks/useComprasionData";
import { Counter } from "@vkontakte/vkui";

export const Menu = () => {
  const { favorites } = useFavorites();
  const { comprasionData } = useComprasionData();

  return (
    <nav className="menu">
      <ul className="menu__list">
        {ROUTES?.map(({ name, route }, ind) => {
          return (
            <li className="menu__item" key={ind}>
              <NavLink
                to={route}
                className={({ isActive }) =>
                  isActive ? "menu__link active" : "menu__link"
                }
              >
                {name}
                {name === "Избранные" && (
                  <Counter mode="primary" className="menu__counter">
                    {favorites.length}
                  </Counter>
                )}
                {name === "В сравнении" && (
                  <Counter mode="primary" className="menu__counter">
                    {comprasionData.length}
                  </Counter>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
