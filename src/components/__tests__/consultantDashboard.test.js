import { render, screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import consultantDashboard from "../consultantDashboard";
import ReactDom from "react-dom";
import { Button } from "react-bootstrap";
import renderer from "react-test-renderer";
import shallow from "react-test-renderer/shallow"; // ES6
import ConsultantDashboard from "../consultantDashboard";
test("consultant dashboard testing", () => {
  render(<consultantDashboard />);
  
});
it('matches snapshot',()=>{
  const tree=renderer.create(<consultantDashboard></consultantDashboard>).toJSON();
  expect(tree).toMatchSnapshot();

})