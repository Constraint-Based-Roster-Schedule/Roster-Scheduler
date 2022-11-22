import { render, screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import doctorDashboard from "../doctorDashboard";
import ReactDom from "react-dom";
import { Button } from "react-bootstrap";
import renderer from "react-test-renderer";
import { DoDisturb } from "@mui/icons-material";
// it("renders without crashing testing", () => {
//   const div = document.createElement("div");
//   ReactDom.render(<Button></Button>, div);
// });

test("doctor dashboard testing", () => {
  render(<doctorDashboard />);
  
});
it('matches snapshot',()=>{
  const tree=renderer.create(<doctorDashboard></doctorDashboard>).toJSON();
  expect(tree).toMatchSnapshot();

})