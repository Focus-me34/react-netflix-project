/**
 * @jest-environment jsdom
 */

import store from "../../store/redux-store";
import { Provider } from "react-redux";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthModal from "../UI/AuthModal";

import { act } from "react-dom/test-utils";


describe("AuthModal", () => {
  // const reactRedux = { useDispatch }
  // const dispatchSpy = jest.spyOn(store, "dispatch");

  afterEach(() => {
    fetch.mockClear();
  });

  test("the signIn action creator", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        headers: {
          get: jest.fn(() => "Bearer ABC123"),
        },
        json: () =>
          Promise.resolve({
            user: {
              id: 1,
              email: "test@test.com",
              username: "Tester",
              created_at: "2022-08-19T21:05:35.667Z",
              updated_at: "2022-08-19T21:05:35.667Z",
            },
          }),
      })
    );

    render(
      <Provider store={store}>
        <AuthModal />
      </Provider>
    );

    expect(
      screen.getByLabelText(/auth-email-input-sign-in/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/auth-password-input-sign-in/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("btn-form-sign-in")).toBeInTheDocument();

    const inputEmail = screen.getByLabelText(/auth-email-input-sign-in/i);
    const inputPassword = screen.getByLabelText(/auth-password-input-sign-in/i);
    const signInFormButton = screen.getByTestId("btn-form-sign-in");

    userEvent.clear(inputEmail);
    userEvent.tab();
    userEvent.type(inputEmail, "test@test.com");

    userEvent.clear(inputPassword);
    userEvent.tab();
    userEvent.type(inputPassword, "qqqqqq");

    userEvent.click(signInFormButton);

    await act(async () => {
      expect(screen.getByTestId("spin-loader")).toBeInTheDocument();
    });

    // console.log(store.getState().auth);

    const expectedState = {
      auth: {
        isAuthModalOpen: false,
        user: {
          id: 1,
          email: "test@test.com",
          username: "Tester",
          created_at: "2022-08-19T21:05:35.667Z",
          updated_at: "2022-08-19T21:05:35.667Z",
        },
        notification: {
          status: "success",
          title: "Success",
          message: "Signed in successfully!",
        },
        isLoggedIn: true,
        token: "ABC123",
      },
    };

    expect(store.getState().auth).toEqual(expectedState.auth);
  });

  test("click the sign-in button should become a spinloader while creating user's session", async () => {
    render(
      <Provider store={store}>
        <AuthModal />
      </Provider>
    );

    expect(
      screen.getByLabelText(/auth-email-input-sign-in/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/auth-password-input-sign-in/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("btn-form-sign-in")).toBeInTheDocument();

    const inputEmail = screen.getByLabelText(/auth-email-input-sign-in/i);
    userEvent.clear(inputEmail);
    userEvent.tab();
    userEvent.type(inputEmail, "test@test.com");

    const inputPassword = screen.getByLabelText(/auth-password-input-sign-in/i);
    userEvent.clear(inputPassword);
    userEvent.tab();
    userEvent.type(inputPassword, "qqqqqq");

    const signInFormButton = screen.getByTestId("btn-form-sign-in");

    userEvent.click(signInFormButton);

    await act(async () => {
      expect(screen.getByTestId("spin-loader")).toBeInTheDocument();
    });
  });



  test("should display error message if credential is missing", async () => {

    render(
      <Provider store={store}>
        <AuthModal />
      </Provider>
    );

    expect(screen.getByLabelText(/auth-email-input-sign-in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/auth-password-input-sign-in/i)).toBeInTheDocument();
    expect(screen.getByTestId("btn-form-sign-in")).toBeInTheDocument();

    const inputEmail = screen.getByLabelText(/auth-email-input-sign-in/i);
    // const inputPassword = screen.getByLabelText(/auth-password-input-sign-in/i);
    const signInFormButton = screen.getByTestId("btn-form-sign-in");

    userEvent.clear(inputEmail);
    userEvent.tab();
    userEvent.type(inputEmail, "test@test.com");

    userEvent.click(signInFormButton);

    expect(await screen.findByText("Make sure you povide both email and password")).toBeInTheDocument();
  });


    test("should destroy the user's session when user clicks on 'sign out' button", async () => {
      render(
        <Provider store={store}>
          <AuthModal />
        </Provider>
      );

      expect(
        screen.getByLabelText(/auth-email-input-sign-in/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/auth-password-input-sign-in/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId("btn-form-sign-in")).toBeInTheDocument();

      const inputEmail = screen.getByLabelText(/auth-email-input-sign-in/i);
      // const inputPassword = screen.getByLabelText(/auth-password-input-sign-in/i);
      const signInFormButton = screen.getByTestId("btn-form-sign-in");

      userEvent.clear(inputEmail);
      userEvent.tab();
      userEvent.type(inputEmail, "test@test.com");

      userEvent.click(signInFormButton);

      expect(
        await screen.findByText("Make sure you povide both email and password")
      ).toBeInTheDocument();
    });

});
