import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Form, Container, Row, Col, Nav } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

const LoginPage = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keep: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <Container>
      <Row className="py-3 justify-content-center">
        <Col md="8" lg="6" xl="5">
          <div className="border rounded p-4">
            <Stack direction="horizontal" gap={3} className="my-3">
              <div className="h5">Login</div>

              <Nav.Link
                className="ms-auto border-bottom"
                onClick={() => navigate("/register")}
              >
                Don&rsquo;t have an account?
              </Nav.Link>
            </Stack>
            <Form onSubmit={handleSubmit}>
              <Stack gap={3}>
                <Form.Group>
                  <Form.Label htmlFor="email">Email*</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="password">Password*</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Stack direction="horizontal">
                  <Form.Check
                    type="checkbox"
                    name="keep"
                    id="keep"
                    onChange={handleChange}
                    value={formData.keep}
                    label="Keep me sign in"
                    style={{ userSelect: "none" }}
                  />

                  <Nav.Link
                    className="ms-auto border-bottom"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </Nav.Link>
                </Stack>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Stack>
            </Form>

            <div className="border-bottom my-3 "></div>

            <Stack direction="horizontal" className="justify-center" gap={3}>
              <Button
                className="me-auto w-100"
                style={{ backgroundColor: "#4285F4" }}
                href="#!"
                role="button"
              >
                <FaGoogle style={{ marginRight: "5px" }} />
                Google
              </Button>
              <Button
                className="me-auto w-100"
                style={{ backgroundColor: "#0766FF" }}
                href="#!"
                role="button"
              >
                <FaFacebook style={{ marginRight: "5px" }} />
                Facebook
              </Button>

              <Button
                className="me-auto w-100"
                style={{ backgroundColor: "#010409" }}
                href="#!"
                role="button"
              >
                <FaGithub style={{ marginRight: "5px" }} />
                Github
              </Button>
            </Stack>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
