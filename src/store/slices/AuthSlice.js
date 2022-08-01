import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthModalOpen: false,
  user: null,
  notification: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleModal: (state) => { state.isAuthModalOpen = !state.isAuthModalOpen },
    showNotifications: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      }
    },
    // signup: (state) => { console.log(state) },
    // login: (state, action) => { console.log(action) },
    // logout: (state) => { state.user = null },
  }
})

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
      await sendRequest();
      dispatch(authSlice.actions.showNotifications({ status: "success", title: "Success", message: "Signed up successfully!" }))
    } catch (error) {
      dispatch(authSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while signing up. Please try again" }))
    }
  }
}

export const signIn = (credentials) => {
  return async (dispatch) => {
    dispatch(authSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Signing in Please wait..." }))

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/users/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ user: { email: credentials.email, password: credentials.password } })
      })

      if (!res.ok) {
        throw new Error("An error occured: Failed to sign up...")
      }

      console.log(res);
      return res.json()
    }

    try {
      const data = await sendRequest();
      console.log(data);
      dispatch(authSlice.actions.showNotifications({ status: "success", title: "Success", message: "Signed in successfully!" }))
    } catch (error) {
      dispatch(authSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while signing in. Please try again" }))
    }
  }
}

export const { toggleModal } = authSlice.actions;
export default authSlice.reducer;
