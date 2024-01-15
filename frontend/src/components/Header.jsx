import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          MERN
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
          {user ? (
            <>
              <Nav.Link onClick={() => navigate("/profile")}>Profile</Nav.Link>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
