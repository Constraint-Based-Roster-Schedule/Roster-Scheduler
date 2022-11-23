import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AddLeavesComponent from '../addLeavesComponent';


describe("Test leave request component", () => {
  const createInstance = () => {
    render(<AddLeavesComponent />);
  };

  it("render leave request component", () => {
    createInstance();
    const leave_request = screen.getByTestId("leave-request-component");
    expect(leave_request).not.toBeNull();
  });
});