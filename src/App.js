import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import MoviesListPage from "./pages/MoviesListPage";
import SeriesListPage from "./pages/SeriesListPage";
import PersonalDetailPage from "./pages/PersonalDetailPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import NotFound from "./components/UI/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>

      {isLoggedIn &&
        <>
          <Route path="/movies" element={<MoviesListPage />}></Route>
          <Route path="/series" element={<SeriesListPage />}></Route>
          <Route path="/account" element={<PersonalDetailPage />}></Route>
          <Route path="/favourites" element={<FavouriteMoviesPage />}></Route>
        </>
      }
      <Route path="/page-not-found" element={<NotFound />}></Route>
      <Route path="/*" element={<Navigate replace to="/page-not-found" />}
      ></Route>
    </Routes>
  );
}

export default App;
