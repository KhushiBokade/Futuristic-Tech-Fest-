// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from './Components/Home'; // Assuming these components exist
import Events from './Components/Events';
import Update from './Components/Updates';
import MainGuest from './Components/MainGuest';
import "./App.css";
import Updates from "./Components/Updates";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/guests" element={<MainGuest />} />
          <Route path="/updates" element={<Updates />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;