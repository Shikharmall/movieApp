import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ShowDetailsScreen from "./pages/ShowDetailsScreen";
import NoPage from "./pages/NoPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <Routes>
      <Route exact path="/" element={<HomeScreen />} />
      <Route exact path="/show/:id" element={<ShowDetailsScreen />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
