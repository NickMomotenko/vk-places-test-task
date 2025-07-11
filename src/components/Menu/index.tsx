import { NavLink } from "react-router-dom";

import { ROUTES } from "./../../helpers/routes";

import "./styles.scss";

export const Menu = () => {
  return (
    <nav className="menu">
      <ul className="menu__list">
        {ROUTES?.map(({ name, route }, ind) => (
          <li className="menu__item" key={ind}>
            <NavLink
              to={route}
              className={({ isActive }) =>
                isActive ? "menu__link active" : "menu__link"
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
