import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import MoviesListPage from "./pages/MoviesListPage";
import SeriesListPage from "./pages/SeriesListPage";
import PersonalDetailPage from "./pages/PersonalDetailPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import NotFound from "./components/UI/NotFound";
import { useEffect } from "react";

function App() {
  const api_key = `${process.env.REACT_APP_TMDB_API_KEY}`
  console.log(api_key);

useEffect(() => {
  fetch(`https://imdb-api.com/en/API/MostPopularMovies/${api_key}`)
  .then(res => res.json())
  .then(data => console.log(data))
}, [])


  return (
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>

      <Route path="/movies" element={<MoviesListPage />}></Route>
      <Route path="/series" element={<SeriesListPage />}></Route>
      <Route path="/account" element={<PersonalDetailPage />}></Route>
      <Route path="/favourites" element={<FavouriteMoviesPage />}></Route>
      <Route path="/page-not-found" element={<NotFound />}></Route>
      <Route path="/*" element={<Navigate replace to="/page-not-found"/>}></Route>
    </Routes>
  );
}

export default App;
