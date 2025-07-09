import { Container } from "./components/Container";
import { FilmDetails } from "./containers/FilmDetails";
import { FilmsContainer } from "./containers/FilmsContainer";

function App() {
  return (
    <Container>
      <FilmsContainer />
      {/* <FilmDetails /> */}
    </Container>
  );
}

export default App;
