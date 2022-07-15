import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"; //Mohammad imported this .App.css as it was not imported when it was merged, hence the styling was not working for you none of you
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import SignUp from "./components/pages/SignUp";
import Rota from "./components/pages/Rota";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Dashboard from "./components/pages/Dashboard";

const App = () => {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          {/* I have replace Homepage with HeaderAndNav because there was nothing in Homepage. Also the bootstrap cdn is working as I have tested (check the last about componect for red text class) and removed the unneccessary extra codes from index.html. ByMohammad*/}
          <Route path="/" element={<Rota />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rota" element={<Rota />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
};

export default App;
