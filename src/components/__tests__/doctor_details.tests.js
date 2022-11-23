import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Doc_details from '../doc_details';


describe("Test doctor detail component", () => {
  const createInstance = () => {
    render(<Doc_details />);
  };

  it("render doctor detail component", () => {
    createInstance();
    const doctor_detail = screen.getByTestId("doctor-details");
    expect(doctor_detail).not.toBeNull();
  });
});