import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import movieReducer from "./slices/MovieSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
  },
});

export default store
