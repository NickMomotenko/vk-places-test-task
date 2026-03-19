import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FilmDetailsContainer } from "./containers/FilmDetailsContainer";
import { FilmsContainer } from "./containers/FilmsContainer";
import { FavoritesFilmsContainer } from "./containers/FavoritesFilmsContainer";

import { Container } from "./components/Container";
import { Menu } from "./components/Menu";
import { ComprasionContainer } from "./containers/ComprasionContainer";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Menu />
        <Routes>
          <Route path="/" element={<FilmsContainer />} />
          <Route path="/favorites" element={<FavoritesFilmsContainer />} />
          <Route path="/movies/:id" element={<FilmDetailsContainer />} />
          <Route path="/comprasion" element={<ComprasionContainer />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
