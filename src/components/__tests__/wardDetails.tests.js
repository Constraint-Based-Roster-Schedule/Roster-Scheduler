import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import WardDetails from '../wardDetails';

describe("Test Ward Detail component", () => {
  const createInstance = () => {
    render(<WardDetails />);
  };

  it("render Ward Detail component", () => {
    createInstance();
    const ward_detail = screen.getByTestId("ward-details");
    expect(ward_detail).not.toBeNull();
  });
});