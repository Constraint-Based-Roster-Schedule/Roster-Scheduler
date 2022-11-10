import { render, screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import DoctorProfile from "../login";
import ReactDom from "react-dom";
import { Button } from "react-bootstrap";
import renderer from "react-test-renderer";
it("renders without crashing testing", () => {
  const div = document.createElement("div");
  ReactDom.render(<Button></Button>, div);
});

test("doctor profile testing", () => {
  render(<DoctorProfile />);
  const nameLabel = screen.getByText(/Type/i);
  const nameLabe2 = screen.getByText(/Password/i);
  const nameLabe3 = screen.getByText(/Email/i);
  const nameLabe4 = screen.getByText(/Submit/i);
  const nameLabe5 = screen.getByText(/Welcome/i);
  expect(nameLabel).toBeInTheDocument();
  // expect(getByTestId("doctor-profile-title")).toHaveTextContent("Doctor Profile");
});
it("matches doctor profile snapshot", () => {
  const tree = renderer.create(<DoctorProfile />).toJSON();
  expect(tree).toMatchSnapshot();
});
