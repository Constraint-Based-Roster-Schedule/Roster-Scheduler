import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import IndividualRoster from "../individualRoster";

describe("Test Individual Roster component", () => {
  const createInstance = () => {
    render(<IndividualRoster />);
  };

  it("render Individual Roster component", () => {
    createInstance();
    const roster = screen.getByTestId("individual-roster");
    expect(roster).not.toBeNull();
  });
});