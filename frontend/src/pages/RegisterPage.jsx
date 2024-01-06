import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
  const user = {
    name: "najmul",
    email: "najmul@gmail.com",
  };
  const [formData, setFormData] = useState({
    name: "",
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
    console.log("submit form");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container>
      <Row className="py-3">
        {/* <Col></Col> */}
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

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
              Register
            </Button>
          </Form>
        </Col>
        {/* <Col></Col> */}
      </Row>
      <Stack direction="horizontal" gap={3}>
        <Button style={{ backgroundColor: "#3b5998" }} href="#!" role="button">
          <FaGoogle style={{ marginRight: "5px" }} />
          Google
        </Button>
        <Button style={{ backgroundColor: "#55acee" }} href="#!" role="button">
          <FaFacebook style={{ marginRight: "5px" }} />
          Facebook
        </Button>
      </Stack>
    </Container>
  );
};
export default RegisterPage;
