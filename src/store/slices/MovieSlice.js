import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isSelectedMovie: false,
  movieId: null,
  movie: null,
  updatedFavMovieList: null
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
        state.movie = action.payload.movie
    },

    unselectMovie: (state) => {
        state.isSelectedMovie = false;
        state.movieId = null;
        state.movie = null;
    },

    updateFavMovieList: (state, action) => {
      state.updatedFavMovieList = action.payload.newFavMovieList
    }
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
      dispatch(movieSlice.actions.updateFavMovieList({ newFavMovieList: JSON.parse(data.favorite_movies) }));
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
      dispatch(movieSlice.actions.updateFavMovieList({ newFavMovieList: JSON.parse(data.favorite_movies) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Removed movie from favorite successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while removing movie from favorite" }))
    }
  }
}


export const { selectMovie, unselectMovie } = movieSlice.actions;
export default movieSlice.reducer;
