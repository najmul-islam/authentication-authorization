import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Stack, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../features/auth/authApi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, isError, isSuccess, error }] =
    useRegisterMutation();
  // const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }

    if (isSuccess) {
      navigate("/");
    }
  }, [isError, isSuccess, error, navigate]);

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <Container>
      <Row className="py-3 justify-content-center">
        <Col md="8" lg="6" xl="5">
          <div className="border rounded p-4">
            <Stack direction="horizontal" gap={3} className="my-3">
              <div className="h5">Register</div>

              <Nav.Link
                className="ms-auto border-bottom"
                onClick={() => navigate("/login")}
              >
                All ready have an account?
              </Nav.Link>
            </Stack>
            <Form onSubmit={handleSubmit}>
              <Stack gap={3}>
                <Form.Group>
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password*</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <small className="fw-semibold">
                  By Signing up, you agree to our{" "}
                  <Link to="/terms-of-service">Terms of Service </Link>
                  and <Link to="/privacy-policy">Privacy Policy</Link>
                </small>

                <Button variant="primary" type="submit" className="w-100">
                  Register
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
export default RegisterPage;
