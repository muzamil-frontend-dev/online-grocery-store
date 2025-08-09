import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
