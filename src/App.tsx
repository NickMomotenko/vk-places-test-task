import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from "./components/Container";

import { FilmDetailsContainer } from "./containers/FilmDetailsContainer";
import { FilmsContainer } from "./containers/FilmsContainer";
import { FavoritesFilmsContainer } from "./containers/FavoritesFilmsContainer";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<FilmsContainer />} />
          <Route path="/favorites" element={<FavoritesFilmsContainer />} />
          <Route path="/movies/:id" element={<FilmDetailsContainer />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
