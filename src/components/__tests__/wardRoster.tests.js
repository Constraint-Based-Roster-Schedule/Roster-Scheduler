import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import WardRosterComponent from '../wardRosterComponent';

describe("Test Ward Roster component", () => {
  const createInstance = () => {
    render(<WardRosterComponent />);
  };

  it("render Ward Roster component", () => {
    createInstance();
    const ward_roster = screen.getByTestId("ward-roster");
    expect(ward_roster).not.toBeNull();
  });
});