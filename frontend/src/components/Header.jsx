import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = {
    name: "najmul",
    email: "najmul@gmail.com",
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
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
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
