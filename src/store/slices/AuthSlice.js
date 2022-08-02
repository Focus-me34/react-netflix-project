import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthModalOpen: false,
  user: null,
  notification: null,
  isLoggedIn: false,
  token: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
    },

    showNotifications: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },

    setSession: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
    },

    destroySession: (state) => {
      state.token = null
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    }
  },
});


// ! SIGN UP
export const signUp = (credentials) => {
  return async (dispatch) => {
    dispatch(authSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Signing up Please wait..." }))

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email: credentials.email, password: credentials.password } })
      })

      if (!res.ok) {
        throw new Error("An error occured: Failed to sign up...")
      }
    }

    try {
      const data = await sendRequest();
      dispatch(authSlice.actions.showNotifications({ status: "success", title: "Success", message: "Signed up successfully!" }))
      // dispatch(authSlice.actions.setSession({ token: data.token }))
    } catch (error) {
      dispatch(authSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while signing up. Please try again" }))
    }
  }
}

// ! SIGN IN
export const signIn = (credentials) => {
  return async (dispatch) => {
    dispatch(authSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Signing in Please wait..." }))

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/users/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email: credentials.email, password: credentials.password } }),
      })

      if (!res.ok) {
        throw new Error("An error occured: Failed to sign in...")
      }

      return res.json()
    }

    try {
      const data = await sendRequest();
      dispatch(authSlice.actions.setSession({ token: data.token }));
      dispatch(authSlice.actions.toggleModal())
      dispatch(authSlice.actions.showNotifications({ status: "success", title: "Success", message: "Signed in successfully!" }))
    } catch (error) {
      dispatch(authSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while signing in. Please try again" }))
    }
  }
}

// ! SIGN OUT
export const signOut = (token) => {
  return async (dispatch) => {
    dispatch(authSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Signing in Please wait..." }))

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/users/sign_out", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}}`, "Content-Type": "application/json" }
      })

      if (!res.ok) {
        throw new Error("An error occured: Failed to sign out...")
      }

      console.log(res);
      return res.json()
    }

    try {
      sendRequest();
      dispatch(authSlice.actions.destroySession());
      dispatch(authSlice.actions.showNotifications({ status: "success", title: "Success", message: "Signed out successfully!" }))
    } catch (error) {
      dispatch(authSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while signing out. Please try again" }))
    }
  }
}

export const { toggleModal, destroySession } = authSlice.actions;
export default authSlice.reducer;
