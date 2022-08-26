/**
 * @jest-environment jsdom
 */

import store from "../../store/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "../navbar/Navbar";
import { act } from "react-dom/test-utils";
import thunk from "redux-thunk";
import { showNotifications, setSession, destroySession } from "../../store/slices/AuthSlice";

describe("Navbar", () => {

  beforeEach(() => {
    // ! WE MAKE SURE THE MOCKS ARE CLEARED BEFORE EACH TEST CASE
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  afterAll(() => {
    cleanup();
  });


  // ! SETUP A SPY ON USESELECTOR / USE DISPATCH  WITH "jest.spyOn"
  // ! WE DO THIS TO BE ABLE TO CHECK IF THE DISPATCH MOCK GOT CALLED AND HOW MANY TIMES
  const reactRedux = { useDispatch, useSelector }
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");


  // ! NAVBAR CONTAINS CORRECT ELEMENTS
  test("Navbar component should be rendered", () => {
    render(<Provider store={store}><Navbar /></Provider>);
    const navbarComponent = screen.getByTestId("test-navbar");
    expect(navbarComponent).toBeInTheDocument();
  });


  test("should have a logo as SVG", () => {
    render(<Provider store={store}><Navbar /></Provider>);
    const logoSvg = screen.getByTestId("logo-svg");
    expect(logoSvg).toBeInTheDocument();
  });


  test("should have a button 'sign in' if isLoggedIn === false", () => {
    render(<Provider store={store}><Navbar /></Provider>);

    const btnSignIn = screen.getByTestId("button-sign-in");
    expect(btnSignIn).toBeInTheDocument();
  });


  test("should have a button 'sign out' if isLoggedIn === true", async () => {
    const mockStore = configureStore();
    const initialState = {
      auth: {
        isAuthModalOpen: false, user: {id: 1, email: "test@test.com"}, notification: null,
        isLoggedIn: true, token: "ABC123",
      }
    };
    let updatedStore = mockStore(initialState);

    render(<Provider store={updatedStore}><Navbar /></Provider>);
    expect(screen.getByTestId("button-sign-out")).toBeInTheDocument()
  });


  // ! NAVBAR INTERACTION
  test("cliking the sign-in button should open the authModal component", async () => {
    render(<Provider store={store}><Navbar /></Provider>);

    const btnSignIn = screen.getByTestId("button-sign-in");

    userEvent.click(btnSignIn);
    await waitFor(() =>
      expect(screen.getByText(/New to Netflix/i)).toBeInTheDocument(),
      expect(screen.getByTestId("auth-modal-sign-up-btn")).toBeInTheDocument()
    )
  });

  test("cliking the sign-in button should dispatch action in charge of displaying the AuthModal component", async () => {
    const mockStore = configureStore();
    const initialState = {
      auth: {
        isAuthModalOpen: false,
        user: null,
        notification: null,
        isLoggedIn: false,
        token: null,
      },
    };
    let updatedStore = mockStore(initialState);

    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    updatedStore.dispatch = mockDispatch;

    render(<Provider store={updatedStore}><Navbar /></Provider>);
    const btnSignIn = screen.getByTestId("button-sign-in");
    expect(btnSignIn).toBeInTheDocument();
    expect(updatedStore.dispatch).not.toHaveBeenCalled();

    userEvent.click(btnSignIn);

    expect(updatedStore.dispatch).toHaveBeenCalledTimes(1);
    expect(updatedStore.dispatch.mock.lastCall[0].type).toMatch(/openAuthModal/i)
  });


  test("cliking on the backdrop should close the AuthModal", async () => {
    const mockStore = configureStore();
    const initialState = {
      auth: {
        isAuthModalOpen: true,
        user: null,
        notification: null,
        isLoggedIn: false,
        token: null,
      },
    };
    let updatedStore = mockStore(initialState);

    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    updatedStore.dispatch = mockDispatch;

    render(<Provider store={updatedStore}><Navbar /></Provider>);
    expect(updatedStore.dispatch).not.toHaveBeenCalled();

    const backdrop = screen.getByTestId("backdrop");

    userEvent.click(backdrop);
    // console.log(updatedStore.dispatch.mock.calls[2][0]);
    expect(updatedStore.dispatch).toHaveBeenCalledTimes(3);
    expect(updatedStore.dispatch.mock.calls[2][0].type).toMatch(/closeAuthModal/i)
  });


  // ! -------------------------------------------------------------------------
  // ! KEEP THIS BLOCK FOR FUTURE REFERENCE
  // ? MOCKS A STORE + DISPATCH ACTION FOR THIS MOCKED STORE
  // ? CHECKS THE NUMBER OF TIMES THE DISPATCH ACTION GOT EXECUTED
  // ? CHECK THE LAST ACTION EXECUTED
  test("cliking the sign-out button should sign out user", async () => {
    // ! We store the function to create our mockup store
    const mockStore = configureStore();
    // ! We mock a state for the store mockup
    const initialState = {
      auth: {
        isAuthModalOpen: false,
        user: { id: 1, email: "test@test.com" },
        notification: { status: "success", title: "Success", message: "Signed in successfully!" },
        isLoggedIn: true,
        token: "ABC123",
      },
    };
    // ! We create our mockup store with our initialState mockup
    let updatedStore = mockStore(initialState);

    // ! We store the jest function to create a mockup function
    const mockDispatch = jest.fn();
    // ! This sets up the spy on the mockDispatch function
    useDispatchMock.mockReturnValue(mockDispatch);
    // ! We replace the original dispatch method with our mockup function
    updatedStore.dispatch = mockDispatch;

    // ? HERE THE INITIAL CONTENT OF THE MOCK
    // console.log(updatedStore.dispatch.mock);

    // ! We pass our store mockup to the Provider
    render(<Provider store={updatedStore}><Navbar /></Provider>);
    const signOutBtn = screen.getByTestId("button-sign-out");
    expect(signOutBtn).toBeInTheDocument();

    // ! We expect the mockDispatch function to not have been called so far
    expect(updatedStore.dispatch).not.toHaveBeenCalled();

    // ! We simulate the action of a user clicking the selected button
    userEvent.click(signOutBtn);
    // ? HERE THE CONTENT OF THE MOCK CHANGED
    // console.log(updatedStore.dispatch.mock);

    // ! We now expect the mockDispatch function to have been called once
    expect(updatedStore.dispatch).toHaveBeenCalledTimes(1);
    // ! We expect the action to be dispatched when clicking the button to trigger the "destroySession action"
    expect(updatedStore.dispatch.mock.lastCall[0].type).toMatch("destroySession");
  });
  // ! -------------------------------------------------------------------------


  test("it should have a link to sign in", async () => {
    render(<Provider store={store}><Navbar /></Provider>);
    expect(screen.getByTestId("button-sign-in")).toBeInTheDocument();
  });


  // test("it should have a link to sign up", async () => {
  //   render(<Provider store={store}><Navbar /></Provider>);

  //   const btnSignIn = screen.getByTestId("button-sign-in");
  //   userEvent.click(btnSignIn);
  //   await waitFor(() =>
  //     expect(screen.getByText(/New to Netflix/i)).toBeInTheDocument(),
  //     expect(screen.getByTestId("auth-modal-sign-up-btn")).toBeInTheDocument()
  //   )

  //   const btnSignUp = screen.getByTestId("auth-modal-sign-up-btn");
  //   userEvent.click(btnSignUp);

  //   await waitFor(() => {
  //     expect(screen.getByText(/Already have an account/i)).toBeInTheDocument(),
  //     expect(screen.getByTestId("auth-modal-sign-in-btn")).toBeInTheDocument()
  //   })
  // });


  test("it should have a link to sign up", async () => {
    render(<Provider store={store}><Navbar /></Provider>);

    const btnSignIn = screen.getByTestId("button-sign-in");
    userEvent.click(btnSignIn);

    await waitFor(
      () => expect(screen.getByText(/New to Netflix/i)).toBeInTheDocument(),
      expect(screen.getByTestId("auth-modal-sign-up-btn")).toBeInTheDocument()
    );
  });

  // ! THIS TEST USES A MOCK STORE (NOT THE BEST IMO)
  test("it should destroy the user's session when clicking on the 'sign out' button", async () => {
    const mockStore = configureStore({});
    const initialState = {
      auth: {
        isAuthModalOpen: false,
        user: { id: 1, email: "test@test.com" },
        notification: {
          status: "success",
          title: "Success",
          message: "Signed in successfully!",
        },
        isLoggedIn: true,
        token: "ABC123",
      },
    };
    let updatedStore = mockStore(initialState);

    render(
      <Provider store={updatedStore}>
        <Navbar />
      </Provider>
    );

    const btnSignOut = screen.getByTestId("button-sign-out");

    expect(updatedStore.getActions()).toEqual([])

    userEvent.click(btnSignOut);

    expect(updatedStore.getActions()).not.toEqual([])
    expect(updatedStore.getActions().length).toBe(1);
    expect(updatedStore.getActions()[0].type).toMatch(/auth\/destroySession/i);
  });

  // ! THIS TEST USES THE REAL REDUX STORE. IT'S JUST AMAZING !!!
  test("it should destroy the user's session when clicking on the 'sign out' button", async () => {
    const spy = jest.spyOn(store, "dispatch"); // ALWAYS SPY BEFORE PASSING THE STORE TO THE PROVIDER

    store.dispatch(setSession({
        token: "ABC123",
      user: {
        id: 1,
        email: "test@test.com",
        username: "Tester",
        created_at: "2022-08-19T21:05:35.667Z",
        updated_at: "2022-08-19T21:05:35.667Z",
      }
    }));

    store.dispatch(
      showNotifications({
        status: "success",
        title: "Success",
        message: "Signed in successfully!",
      })
    );

    render(<Provider store={store}><Navbar /></Provider>);

    expect(spy.mock.calls.length).toBe(2)

    const btnSignOut = screen.getByTestId("button-sign-out");
    userEvent.click(btnSignOut);

    expect(spy.mock.calls.length).toBe(3)
    expect(spy.mock.lastCall[0].type).toMatch(/auth\/destroySession/i);
  });
})
