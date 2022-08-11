import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  notification: null,
  isSelectedMovie: false,
  movieId: null,
  movie: null,
  updatedFavMovieList: null,
  allMovies: null,
  allWatchlists: null
};


const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    showNotifications: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },

    selectMovie: (state, action) => {
      state.isSelectedMovie = true;
      state.movieId = action.payload.movieId;
      state.movie = action.payload.movie;
    },

    unselectMovie: (state) => {
      state.isSelectedMovie = false;
      state.movieId = null;
      state.movie = null;
    },

    setFavMovieList: (state, action) => {
      state.updatedFavMovieList = action.payload.newFavMovieList;
    },

    setAllWatchlists: (state, action) => {
      state.allWatchlists = action.payload.allWatchlists;
    },

    setAllMovies: (state, action) => {
      state.allMovies = action.payload.movies;
    },
  },
});


// ! ADD FAVORITE MOVIE
export const addFavoriteMovie = (movie_id) => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Adding movie to favorite..." }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/api/v1/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ movie_id: movie_id }),
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed add movie to favorite list...")
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.setFavMovieList({ newFavMovieList: JSON.parse(data.favorite_movies) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Added movie to favorite successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while adding movie to favorite" }))
    }
  }
}

// ! REMOVE FAVORITE MOVIE
export const removeFavoriteMovie = (movie_id) => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Removing movie from favorite..." }))
    const token = localStorage.getItem("token");
    const sendRequest = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/favorites/${movie_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed to sign up...")
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.setFavMovieList({ newFavMovieList: JSON.parse(data.favorite_movies) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Removed movie from favorite successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while removing movie from favorite" }))
    }
  }
}

// ! GET WATCLISTS FOR USER
export const getAllWatchlists = () => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Fetching user watchlists..." }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/api/v1/watchlists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed to fetch all the watchlists...")
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.setAllWatchlists({ allWatchlists: JSON.parse(data.watchlists) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Fecthed watchlists successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while fetching all the watchlists" }))
    }
  }
}

// ! GET WATCLISTS FOR USER
export const getAllMovies = () => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Fetching all movies..." }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/api/v1/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed to fetch all the movies...")
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.setAllMovies({ movies: data }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Fecthed all movies successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while fetching all the movies" }))
    }
  }
}


export const { selectMovie, unselectMovie, setAllMovies, setAllWatchlists } = movieSlice.actions;
export default movieSlice.reducer;
