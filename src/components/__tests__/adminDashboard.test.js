import { render, screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import adminDashboard from "../consultantDashboard";
import ReactDom from "react-dom";
import { Button } from "react-bootstrap";
import renderer from "react-test-renderer";
import shallow from "react-test-renderer/shallow"; // ES6
import ConsultantDashboard from "../consultantDashboard";
test("consultant dashboard testing", () => {
  render(<adminDashboard />);
  
});
it('matches snapshot',()=>{
  const tree=renderer.create(<adminDashboard></adminDashboard>).toJSON();
  expect(tree).toMatchSnapshot();

})