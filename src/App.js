import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import MovieListPage from "./pages/MovieListPage";
import PersonalDetailPage from "./pages/PersonalDetailPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import NotFound from "./components/UI/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/movies" element={<MovieListPage />}></Route>
      <Route path="/account" element={<PersonalDetailPage />}></Route>
      <Route path="/favourites" element={<FavouriteMoviesPage />}></Route>
      <Route path="/page-not-found" element={<NotFound />}></Route>
      <Route path="/*" element={<Navigate to="/page-not-found"/>}></Route>
    </Routes>
  );
}

export default App;
