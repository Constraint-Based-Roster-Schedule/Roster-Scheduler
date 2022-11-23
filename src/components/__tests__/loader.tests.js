import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Loader from '../Loader';


describe("Test loader component", () => {
  const createInstance = () => {
    render(<Loader />);
  };

  it("render loader component", () => {
    createInstance();
    const loader = screen.getByTestId("loader");
    expect(loader).not.toBeNull();
  });
});