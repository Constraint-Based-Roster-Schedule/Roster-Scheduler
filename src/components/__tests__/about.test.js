import { render, screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import About from "../addDoctor";
import ReactDom from "react-dom";
import { Button } from "react-bootstrap";
import renderer from "react-test-renderer";
it("renders without crashing testing", () => {
  const div = document.createElement("div");
  ReactDom.render(<Button></Button>, div);
});

test("about container testing", () => {
  render(<About />);
  const nameLabel = screen.getByText(/Additional information/i);
  const nameLabe2 = screen.getByText(/Create an account?/i);
  const nameLabe3 = screen.getByText(/Add account/i);
  const nameLabe4 = screen.getByText(/Add doctor/i);
  
  expect(nameLabel).toBeInTheDocument();
  expect(nameLabe2).toBeInTheDocument();
  expect(nameLabe3).toBeInTheDocument();
  expect(nameLabe4).toBeInTheDocument();
  // expect(getByTestId("doctor-profile-title")).toHaveTextContent("Doctor Profile");
});
it('matches snapshot',()=>{
  const tree=renderer.create(<About></About>).toJSON();
  expect(tree).toMatchSnapshot();

})
