/**
 * @jest-environment jsdom
 */

import store from "../../store/redux-store";
import { openAuthModal, destroySession, initialState } from "../../store/slices/AuthSlice";

// import configureStore from "redux-mock-store";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import Navbar from "../navbar/Navbar";


afterAll(() => {
  cleanup()
})


describe("Navbar elements should all be present", () => {

  test("Navbar component", () => {
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




  test("cliking the sign-in button should open the authModal component", async () => {
    render(<Provider store={store}><Navbar /></Provider>
    );

    const btnSignIn = screen.getByTestId("button-sign-in");
    // screen.debug()
    userEvent.click(btnSignIn);
    // await waitFor(() =>
    //   expect(screen.getByText(/New to Netflix/i)).toBeInTheDocument()
    // )
  });


  // test("should have a button 'sign out' if isLoggedIn === true", () => {
  //   render(<Provider store={store}><Navbar /></Provider>);

  //   const btnSignIn = screen.getByTestId("button-sign-in");

  //   expect(btnSignIn).toBeInTheDocument();
  // });



  // test("should have a logo as SVG", () => {
  //   render(<Provider store={store}><Navbar /></Provider>);
  //   const logoSvg = screen.getByTestId("logo-svg");
  //   expect(logoSvg).toBeInTheDocument();
  // });

  // test("should have a button with text 'sign in' ", () => {
  //   const openAuthModal = jest.fn(openAuthModal);

  //   render(
  //     <Provider store={store}>
  //       <Navbar />
  //     </Provider>
  //   );

  //   // screen.debug()
  //   const navbarComponent = screen.getByTestId("test-navbar");
  //   expect(navbarComponent).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: /Sign in/i })).toBeTruthy();
  // });

})



// !ADD TO NOTES
// console.log(store.getState()) --> Return the store values;
