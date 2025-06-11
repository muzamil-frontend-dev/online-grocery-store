import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Header />
      <main className="app-main">
        <Container fluid className="px-0">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
