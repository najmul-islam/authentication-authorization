import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Button, Form, Container, Row, Col } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const LoginPage = () => {
  const user = {
    name: "najmul",
    email: "najmul@gmail.com",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submit");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container>
      <Row>
        <h3>Login</h3>
        <Link to="/register">Create Account</Link>
      </Row>
      <Row className="py-3">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <Button
              style={{ backgroundColor: "#3b5998" }}
              href="#!"
              role="button"
            >
              <FaGoogle style={{ marginRight: "5px" }} />
              Google
            </Button>
            <Button
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
            >
              <FaFacebook style={{ marginRight: "5px" }} />
              Facebook
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
