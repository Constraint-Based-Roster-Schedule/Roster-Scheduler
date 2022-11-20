import { render, screen, cleanup } from "@testing-library/react";
import DoctorDashboard from "../footer";
import renderer from "react-test-renderer";
import React from "react";
import { Button } from "react-bootstrap";
import ReactDom from "react-dom";
// import 'jest-dom/extend-expect';
// afterEach(cleanup);
// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDom.render(<Button></Button>, div);
// });

test("test", () => {
  expect(true).toBe(true);
});

it("renders element correctly", () => {
  const { getByTestId } = render(<DoctorDashboard />);
  expect(getByTestId("doctor-dashboard")).toHaveTextContent("Follow usFacebookLinkedInTwitterYour AccountSignupLoginHomeVisitContact usAbout usGallery© Copyright TechNext");
});

