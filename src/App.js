import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components";
import Home from "./routes/Home/Home";
import Question from "./routes/Question/Question";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/question/:category/:difficulty" exact element={<Question />} />
          <Route path="/question/" exact element={<Question />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
