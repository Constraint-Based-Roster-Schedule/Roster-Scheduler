import { render, screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import IndividualRoster from "../individualRoster";
import ReactDom from "react-dom";
import { Button } from "react-bootstrap";
import renderer from "react-test-renderer";
import { DoDisturb } from "@mui/icons-material";
// it("renders without crashing testing", () => {
//   const div = document.createElement("div");
//   ReactDom.render(<Button></Button>, div);
// });

test("roster page testing", () => {
  render(<IndividualRoster />);
  
});
it('matches snapshot',()=>{
  const tree=renderer.create(<IndividualRoster></IndividualRoster>).toJSON();
  expect(tree).toMatchSnapshot();

})