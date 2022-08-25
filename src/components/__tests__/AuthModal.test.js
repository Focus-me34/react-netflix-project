/**
 * @jest-environment jsdom
 */

import store from "../../store/redux-store";
import { Provider } from "react-redux";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";

import AuthModal from "../UI/AuthModal";

describe("AuthModal", () => {

  // test("it dispatches sign in action and returns data on success", async () => {

  // });

  test("click the sign-in button should dispatch the login action", async () => {
    // const spy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <AuthModal />
      </Provider>
    );

    expect(screen.getByLabelText(/auth-email-input-sign-in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/auth-password-input-sign-in/i)).toBeInTheDocument();
    expect(screen.getByTestId("btn-form-sign-in")).toBeInTheDocument();

    act(() => {
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
    })
    expect(screen.getByTestId("spin-loader")).toBeInTheDocument()

  });















  // const actions = {openAuthModal, closeAuthModal, destroySession, showNotifications, setSession}

  // ! TO KEEP DEVELOPING MAYBE (RETURN A PROMISE AT SOME POINT)
  // beforeEach(() => {
  //   // ! WE MAKE SURE THE MOCKS ARE CLEARED BEFORE EACH TEST CASE
  //   useSelectorMock.mockClear();
  //   useDispatchMock.mockClear();
  //   signInMock.mockClear();
  // });

  // afterAll(() => {
  //   cleanup();
  // });

  // const reactRedux = { useDispatch, useSelector };
  // const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  // const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

  // const signInAction = { signIn }
  // const signInMock = jest.spyOn(signInAction, "signIn");
  // console.log(signInMock);

  //// jest.useFakeTimers();
  //// jest.spyOn(global, "setTimeout");

  // test("click the sign-in button should dispatch the login action", async () => {
  //   const mockStore = configureStore([thunk]);
  //   const initialState = {
  //     auth: {
  //       isAuthModalOpen: true,
  //       user: null,
  //       notification: null,
  //       isLoggedIn: false,
  //       token: null,
  //     },
  //   };
  //   let updatedStore = mockStore(initialState);

  //   const mockDispatch = jest.fn();
  //   useDispatchMock.mockReturnValue(mockDispatch);
  //   console.log(updatedStore.dispatch(signIn({ email: "test@test.com", password: "qqqqqq" })))
  //   console.log(updatedStore.getActions());
  //   // updatedStore.dispatch = mockDispatch;

  //   const mockSignIn = jest.fn(() => Promise.resolve({ data: "mocked" }));
  //   signInMock.mockReturnValue(mockSignIn);

  //   render(
  //     <Provider store={updatedStore}>
  //       <AuthModal />
  //     </Provider>
  //   );

  //   expect(screen.getByLabelText(/auth-email-input-sign-in/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/auth-password-input-sign-in/i)).toBeInTheDocument();
  //   expect(screen.getByTestId("btn-form-sign-in")).toBeInTheDocument();

  //   const inputEmail = screen.getByLabelText(/auth-email-input-sign-in/i);
  //   userEvent.clear(inputEmail);
  //   userEvent.tab();
  //   userEvent.type(inputEmail, "test@test.com");

  //   const inputPassword = screen.getByLabelText(/auth-password-input-sign-in/i);
  //   userEvent.clear(inputPassword);
  //   userEvent.tab();
  //   userEvent.type(inputPassword, "qqqqqq");

  //   const signInFormButton = screen.getByTestId("btn-form-sign-in");

  //   expect(updatedStore.dispatch).not.toBeCalled();
  //   userEvent.click(signInFormButton);
  //   // jest.runAllTimers();

  //   console.log(updatedStore.dispatch.mock);

  //   // const mockSignIn = jest.fn()
  //   // signInMock.mockReturnValue(mockSignIn);
  //   // updatedStore.getActions.signIn = mockSignIn;

  //   expect(updatedStore.dispatch).toBeCalledTimes(1)

  //   //// ? THIS WORKS BUT DEFINITLY NOT WHAT I WANT
  //   //// const expectedAction = { setSession };
  //   //// let returnedFunction = signIn();
  //   //// returnedFunction( setSession  => {
  //   ////   expect(setSession()).toEqual(expectedAction)
  //   //// })

  //   //// returnedFunction(({email: "test@test.com", password: "qqqqqq" }));
  //   //// expect(updatedStore.dispatch).toHaveBeenCalledTimes(1),
  //   ////   console.log(mockDispatch.mock);
  //   //// expect(updatedStore.dispatch.mock.lastCall[0].type).toMatch(/signIn/i);wallaby s
  // });

  // ! THIS TEST WORKS IN A DIFFERENT WAY THAT I WANT
  // test("click the sign-in button should dispatch the login action", async () => {
  //   // const spy = jest.spyOn(store, "dispatch");

  //   render(
  //     <Provider store={store}>
  //       <AuthModal />
  //     </Provider>
  //   );

  //   expect(
  //     screen.getByLabelText(/auth-email-input-sign-in/i)
  //   ).toBeInTheDocument();
  //   expect(
  //     screen.getByLabelText(/auth-password-input-sign-in/i)
  //   ).toBeInTheDocument();
  //   expect(screen.getByTestId("btn-form-sign-in")).toBeInTheDocument();



  //   const dispatch = jest.fn();
  //   store.dispatch = dispatch;
  //   signIn({ email: "test@test.com", password: "qqqqqq" })(dispatch);

  //   // console.log(store.dispatch);
  //   expect(store.dispatch.mock.calls[0][0].payload.message).toMatch(
  //     /Signing in Please wait/i
  //   );

  //   // console.log(spy);
  // });
})




  //   // const inputEmail = screen.getByLabelText(/auth-email-input-sign-in/i);
  //   // userEvent.clear(inputEmail);
  //   // userEvent.tab();
  //   // userEvent.type(inputEmail, "test@test.com");

  //   // const inputPassword = screen.getByLabelText(/auth-password-input-sign-in/i);
  //   // userEvent.clear(inputPassword);
  //   // userEvent.tab();
  //   // userEvent.type(inputPassword, "qqqqqq");

  //   // const signInFormButton = screen.getByTestId("btn-form-sign-in");
  //   // userEvent.click(signInFormButton);
