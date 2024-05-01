import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import "./Nav.css";
import { logout } from "../Storage/Slice/signInSlice";
import { useNavigate } from "react-router-dom";
// import { logout, getLoginUserId } from "../Storage/storage";
// import { useState } from "react";
function Navbars() {
  const navigate = useNavigate();
  // const [logoutOrContact, setLogoutOrContact] = useState(true);
  // useEffect(() => {
  //   // if (getLoginUserId()) {
  //     // navigate("contact-list");
  //     setLogoutOrContact(true);
  //   }
  //   //  else {
  //   //   navigate("sign-in");
  //   // }
  // // }, [navigate]);
  // const id = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  // console.log(id);
  const logoutt = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar bg=";" data-bs-theme="dark" style={{ background: "#000001" }}>
        <Container>
          <Nav className="me-auto m-1">
            <NavLink to="/" className="m-1 btn btn-primary">
              Home
            </NavLink>
          </Nav>
          <input
            type="button"
            value="Logout"
            className="btn btn-danger"
            onClick={() => {
              logoutt(), navigate("sign-in");
            }}
          />
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;
