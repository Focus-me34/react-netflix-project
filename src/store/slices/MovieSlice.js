import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  notification: null,
  allMovies: null,
  isSelectedMovie: false,
  isAddingToWatchlist: false,
  movieId: null,
  movie: null,
  allFavorites: null,
  allWatchlists: null,

  watchlist: null,
  // ?EVERYTIME WE ADD OR REMOVE A MOVIE FROM A WATCHLIST, WE MAKE SET THIS VARIABLE TO TRUE.
  // ? WE USE IT TO FETCH DATA ABOUT A SPECIFIC WATCHLIST (REFRESHES "WATCHLIST" STATE) OR NOT DEPENDING ON ITS VALUE.
  refreshWatchlist: false,
  watchlistMovies: null,
  watchlistCreator: null,
  reviews: null,
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
      state.refreshWatchlist = true;
    },

    setWatchlistWithReviews: (state, action) => {
      state.watchlist = action.payload.watchlist;
      state.reviews = action.payload.reviews;
      state.watchlistMovies = action.payload.watchlistMovies;
      state.watchlistCreator = action.payload.watchlistCreator;
      state.refreshWatchlist = false;
    },

    unsetWatchlistWithReviews: (state) => {
      state.watchlist = null;
      state.reviews = null;
      state.watchlistMovies = null;
      state.watchlistCreator = null;
    },

    openWatchlistForm: (state, action) => {
      state.isAddingToWatchlist = true;
      state.movie = action.payload.movie;
      state.movieId = action.payload.movie_id;
    },

    closeWatchlistForm: (state) => {
      state.isAddingToWatchlist = false;
      state.movie = null;
      state.movieId = null;
    },

    addReviewToReviews: (state, action) => {
      state.reviews = [action.payload.review, ...state.reviews];
    },

    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload.review_id)
    },

    updateReview: (state, action) => {
      const review_matching_id = state.reviews.find(review => review.id === action.payload.review.id )
      const reviewToUpdateIndex = state.reviews.indexOf(review_matching_id);
      if (reviewToUpdateIndex !== -1) state.reviews[reviewToUpdateIndex] = action.payload.review;
    },
  },
});


// ! GET ALL MOVIES
export const getAllMovies = () => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Fetching all movies..." }))
    const token = localStorage.getItem("token");
    // console.log(token)
    // console.log()
    // console.log("Clean token")
    // const cleanToken = token.slice(1,-1)
    // console.log(cleanToken)
    // const authorizationValue = `Bearer ${cleanToken}`
    // console.log("Authorization value coming")
    // console.log(authorizationValue)
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


// ! GET ALL WATCHLISTS
export const getAllWatchlists = () => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Fetching watchlists..." }))
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

// ! GET WATCHLIST WITH ID (SHOW)
export const getWatchlist = (watchlist_id) => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Fetching specified watchlist..." }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/watchlists/${watchlist_id}`, {
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
      dispatch(movieSlice.actions.setWatchlistWithReviews({ watchlist: JSON.parse(data.watchlist), reviews: JSON.parse(data.reviews), watchlistMovies: JSON.parse(data.movies), watchlistCreator: JSON.parse(data.watchlist_creator) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Fecthed specified watchlist successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while fetching the specified watchlist" }))
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
      dispatch(movieSlice.actions.setAllWatchlists({ allWatchlists: JSON.parse(data.watchlists) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Added movie to watchlist successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while adding movie to watchlist" }))
    }
  }
}

// ! DELETE A MOVIE FROM A USER'S SPECIFIC WATCHLIST
export const deleteMovieFromWatchlist = (movie_id) => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Deleting movie from watchlist..." }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/watchlists/${movie_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        // body: JSON.stringify({ movie_id: movie_id }),
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed to delete movie from watchlist...")
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.setAllWatchlists({ allWatchlists: JSON.parse(data.watchlists) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Deleted movie from watchlist successfully!" }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while deleting movie from watchlist" }))
    }
  }
}

// ! ADD A REVIEW TO A WATCHLIST
export const addReviewToWatchlist = (watchlist_id, comment) => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: `Adding review to watchlist with id ${watchlist_id}...` }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ watchlist_id: watchlist_id, comment: comment }),
      });

      if (!res.ok) {
        throw new Error(`An error occured: Failed to add review for the watchlist with id ${watchlist_id}...`)
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      dispatch(movieSlice.actions.addReviewToReviews({ review: JSON.parse(data.review) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: `Added movie review to watchlist with id ${watchlist_id} successfully!` }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: `An error occured while adding movie to the watchlist with id ${watchlist_id}` }))
    }
  }
}

// ! ///////////////////////////////////////////////////////////////////////
// ! ///////////////////////////////////////////////////////////////////////
// ! ///////////////////////////////////////////////////////////////////////
// ! UPDATE A REVIEW
export const updateReview = (review, modifificationObject) => {
  console.log(modifificationObject);
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: `Updating review with id ${review.id}...` }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/reviews/${review.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...modifificationObject
        })
      });

      if (!res.ok) {
        throw new Error(`An error occured: Failed to update review with id ${review.id}...`)
      }

      return res.json();
    }

    try {
      const data = await sendRequest();
      await sendRequest();
      dispatch(movieSlice.actions.updateReview({ review: JSON.parse(data.review) }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: `Updated review with id ${review.id} successfully!` }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: `An error occured while updating review with id ${review.id}` }))
    }
  }
}


// ! DELETE A REVIEW FROM A WATCHLIST
export const deleteReviewFromWatchlist = (review_id) => {
  return async (dispatch) => {
    dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: `Deleting review with id ${review_id}...` }))
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/reviews/${review_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error(`An error occured: Failed to delete review with id ${review_id}...`)
      }

      return res.json();
    }

    try {
      await sendRequest();
      dispatch(movieSlice.actions.deleteReview({ review_id: review_id }));
      dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: `Deleted review with id ${review_id} successfully!` }))
    } catch (error) {
      dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: `An error occured while deleting review with id ${review_id}` }))
    }
  }
}

// // ! GET REVIEWS FOR SPECIFIC WATCHLIST (SHOW)
// export const getWatchlist = (watchlist_id) => {
//   return async (dispatch) => {
//     dispatch(movieSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Fetching specified watchlist..." }))
//     const token = localStorage.getItem("token");

//     const sendRequest = async () => {
//       const res = await fetch(`http://localhost:3000/api/v1/watchlists/${watchlist_id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         }
//       });

//       if (!res.ok) {
//         throw new Error("An error occured: Failed to fetch all the watchlists...")
//       }

//       return res.json();
//     }

//     try {
//       const data = await sendRequest();
//       dispatch(movieSlice.actions.setWatchlistWithReviews({ watchlist: JSON.parse(data.watchlist), reviews: JSON.parse(data.reviews), watchlistMovies: JSON.parse(data.movies), watchlistCreator: JSON.parse(data.watchlist_creator) }));
//       dispatch(movieSlice.actions.showNotifications({ status: "success", title: "Success", message: "Fecthed specified watchlist successfully!" }))
//     } catch (error) {
//       dispatch(movieSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while fetching the specified watchlist" }))
//     }
//   }
// }

export const { selectMovie, unselectMovie, setAllMovies, setFavorites, setAllWatchlists, setWatchlistWithReviews, unsetWatchlistWithReviews, openWatchlistForm,closeWatchlistForm } = movieSlice.actions;
export default movieSlice.reducer;
