/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import SpinLoader from "../UI/SpinLoader";

describe("Spin Loader component", () => {
  test("It should render the component", () => {
    render(<SpinLoader />);
    expect(screen.getByTestId("spin-loader")).toBeInTheDocument();
  });
});
