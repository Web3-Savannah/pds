import AuthFooter from "../../components/Footer/AuthFooter";
import AuthNavbar from "../../components/Navbars/AuthNavbar";

const random = require("canvas-sketch-util/random");

function MainLayout(props) {
  const { children } = props
  return (
    <>
      <AuthNavbar/>
      {children}
      <AuthFooter/>
    </>

  );
}

export default MainLayout;