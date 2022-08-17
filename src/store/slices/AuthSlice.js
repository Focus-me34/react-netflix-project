import { createSlice } from "@reduxjs/toolkit";


const isToken = localStorage.getItem("token") ? true : false;

const initialState = {
  isAuthModalOpen: false,
  user: JSON?.parse(localStorage.getItem("user")) || null, // ! If there's a token, there's a user obviously
  // user: isToken ? JSON.parse(localStorage.getItem("user")) : null, // ! If there's a token, there's a user obviously
  notification: isToken ? { status: "success", title: "Success", message: "Signed in successfully!" } : null,
  isLoggedIn: isToken ? true : false,
  token: isToken ? localStorage.getItem("token") : null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // toggleModal: (state) => {
    //   state.isAuthModalOpen = !state.isAuthModalOpen;
    // },

    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },

    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
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
      state.user = action.payload.user;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    destroySession: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});


// ! SIGN UP
export const signUp = (credentials) => {
  return async (dispatch) => {
    dispatch(authSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Signing up Please wait..." }))

    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "localhost:3006"
        },
        body: JSON.stringify({
          user: { email: credentials.email, password: credentials.password },
        }),
      });

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
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "localhost:3006"
       },
        body: JSON.stringify({ user: { email: credentials.email, password: credentials.password } }),
      })

      if (!res.ok) {
        throw new Error("An error occured: Failed to sign in...")
      }

      // console.log(`Hello from the res section`);
      // console.log(res);
      // console.log(`Headers only`);
      // console.log(res.headers);
      // console.log(`AUTH HEADER ONLY`);
      // console.log(res.headers.get('authorization').split(' ')[1]);
      // console.log(`Cycling starts`);
      // res.headers.forEach(console.log);
      // console.log(`Auth header only`);
      // for (let entry of res.headers.entries()) { console.log(entry) };
      // console.log(`END OF RES SECTION`);
      return [res.json(), res];
      }

    try {
      const [data, res] = await sendRequest();
      console.log(data)
      console.log(res.headers.get('authorization').split(' ')[1]);
      dispatch(authSlice.actions.setSession({ token: data.token, user: data.user }));
      dispatch(authSlice.actions.toggleModal())
      dispatch(authSlice.actions.showNotifications({ status: "success", title: "Success", message: "Signed in successfully!" }))
    } catch (error) {
      dispatch(authSlice.actions.showNotifications({ status: "error", title: "Error", message: "An error occured while signing in. Please try again" }))
    }
  }
}

// ! SIGN OUT
export const signOut = () => {
  return async (dispatch) => {
    dispatch(authSlice.actions.showNotifications({ status: "pending", title: "Sending...", message: "Signing in Please wait..." }))
    const token = localStorage.getItem("token");
    const sendRequest = async () => {
      const res = await fetch("http://localhost:3000/users/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}}`,
          // "Access-Control-Allow-Origin": "http://localhost:3006"
        },
      });

      if (!res.ok) {
        throw new Error("An error occured: Failed to sign out...")
      }

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

export const { openAuthModal, closeAuthModal, destroySession } = authSlice.actions;
export default authSlice.reducer;
