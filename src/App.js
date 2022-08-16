import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";


import Homepage from "./pages/HomePage";
import MoviesListPage from "./pages/MoviesListPage";
import SeriesListPage from "./pages/SeriesListPage";
import PersonalDetailPage from "./pages/PersonalDetailPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import NotFound from "./components/UI/NotFound";
import WatchlistPage from "./pages/WatchlistPage";
import WatchlistShow from "./components/watchlists/WatchlistShow";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = "02dd4cd70ad7780c66d197c4bf127340";
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${token}&language=en-US&page=5`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   fetch(`http://localhost:3000/api/v1/favorites`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({movie_id: 20})
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   fetch(`http://localhost:3000/api/v1/watchlists`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`,
  //     },
  //     // body: JSON.stringify({movie_id: 20})
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   fetch(`http://localhost:3000/api/v1/watchlists`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     },
  //     body: JSON.stringify({name: "CQFD", movie_id: 29})
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(JSON.parse(data.watchlists)));
  // }, [])

  // ! WATCHLIST SHOW
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   fetch(`http://localhost:3000/api/v1/watchlists/1`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     }
  //     // body: JSON.stringify({name: "CQFD", movie_id: 29})
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(JSON.parse(data.reviews)));
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>

      {isLoggedIn && (
        <>
          <Route path="movies" element={<MoviesListPage />}></Route>
          <Route path="series" element={<SeriesListPage />}></Route>
          <Route path="account" element={<PersonalDetailPage />}></Route>
          <Route path="favourites" element={<FavouriteMoviesPage />}></Route>

          <Route path="watchlists">
            <Route index element={<WatchlistPage />} />
            <Route path=":watchlistId" element={<WatchlistShow />}>
              <Route path="comments" element={<p>DOUPI</p>} />
            </Route>
          </Route>
        </>
      )}
      <Route path="page-not-found" element={<NotFound />}></Route>
      <Route
        path="/*"
        element={<Navigate replace to="/page-not-found" />}
      ></Route>
    </Routes>
  );
}

export default App;
