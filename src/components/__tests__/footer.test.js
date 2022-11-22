import { render, screen } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import Footer from "../footer";
import ReactDom from "react-dom";
import { Button } from "react-bootstrap";
import renderer from "react-test-renderer";
import shallow from "react-test-renderer/shallow"; // ES6
import ConsultantDashboard from "../consultantDashboard";
import { FiberPinSharp, FortTwoTone } from "@mui/icons-material";
test("footer testing", () => {
  render(<Footer />);
  
});
it('matches snapshot',()=>{
  const tree=renderer.create(<Footer></Footer>).toJSON();
  expect(tree).toMatchSnapshot();

})

describe("Test footer component", () => {
    const createInstance = () => {
      render(<Footer/>);
    };
  
    it("render footer component", () => {
      createInstance();
      const footer_detail = screen.getByText("Gallery");
      expect(footer_detail).not.toBeNull();
    });
  });