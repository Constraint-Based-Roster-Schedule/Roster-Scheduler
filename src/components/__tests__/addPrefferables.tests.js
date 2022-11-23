import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AddPreferrableSlotsComp from '../addPreferrableSlotsComp';


describe("Test prefferables request component", () => {
  const createInstance = () => {
    render(<AddPreferrableSlotsComp />);
  };

  it("render prefferables request component", () => {
    createInstance();
    const prefferable_request = screen.getByTestId("add-prefferables");
    expect(prefferable_request).not.toBeNull();
  });
});