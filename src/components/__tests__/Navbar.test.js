/**
 * @jest-environment jsdom
 */

import store from "../../store/redux-store";
import { Provider } from "react-redux";
import { render, screen, cleanup } from "@testing-library/react";
import Navbar from "../navbar/Navbar";

test("Should render a Navbar component", () => {
  render(<Provider store={store}><Navbar /></Provider>);

  screen.debug()

  const navbarComponent = screen.getByTestId("test-navbar");
  expect(navbarComponent).toBeInTheDocument();
});
