import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  notification: null,
  allMovies: null,
  isSelectedMovie: false,
  movieId: null,
  movie: null,
  allFavorites: null,
  allWatchlists: null,
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

    setAllMovies: (state, action) => {
      state.allMovies = action.payload.movies;
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

    setFavorites: (state, action) => {
      state.allFavorites = action.payload.favorite_movies;
    },

    setFavMovieList: (state, action) => {
      state.updatedFavMovieList = action.payload.newFavMovieList;
    },

    setAllWatchlists: (state, action) => {
      state.allWatchlists = action.payload.allWatchlists;
    },

    // addToWatchList: (state, action) => {
    //   state.allWatchlists = action.payload.allWatchlists;
    // },
  },
});


// ! GET ALL MOVIES
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


// ! GET ALL MOVIES
export const getFavorites = () => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Fetching all favorite movies..." }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/api/v1/favorites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed to fetch all the favorite movies...")
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.setFavorites({ favorite_movies: data.favorite_movies }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Fecthed all favorite movies successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while fetching all the favorite movies" }))
    }
  }
}


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
      dispatch(movieSlice.actions.setFavorites({ favorite_movies: JSON.parse(data.favorite_movies) }));
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
      dispatch(movieSlice.actions.setFavorites({ favorite_movies: JSON.parse(data.favorite_movies) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Removed movie from favorite successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while removing movie from favorite" }))
    }
  }
}


// ! GET WATCHLISTS FOR USER
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


// ! ADD A MOVIE TO A WATCHLIST
export const addMovieToWatchlist = (name, movie_id) => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Adding movie to watchlist..." }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/api/v1/watchlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ wl_name: name, movie_id: movie_id }),
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed to add movie to watchlist...")
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.setAllWatchlists({ favorite_movies: JSON.parse(data.favorite_movies) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Added movie to watchlist successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while adding movie to watchlist" }))
    }
  }
}

// ! DELETE A MOVIE FROM A USER'S SPECIFIC WATCHLIST
export const deleteMovieFromWatchlist = (name, movie_id) => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Deleting movie from watchlist..." }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/api/v1/watchlists", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ wl_name: name, movie_id: movie_id }),
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed to delete movie from watchlist...")
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.setAllWatchlists({ favorite_movies: JSON.parse(data.favorite_movies) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Deleted movie from watchlist successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while deleting movie from watchlist" }))
    }
  }
}

export const { selectMovie, unselectMovie, setAllMovies, setFavorites, setAllWatchlists } = movieSlice.actions;
export default movieSlice.reducer;
