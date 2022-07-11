import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import SignUp from "./components/pages/SignUp";
import Rota from "./components/pages/Rota";
import DefaultLayout from "./components/layouts/DefaultLayout";

const App = () => {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rota" element={<Rota />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
};

export default App;
