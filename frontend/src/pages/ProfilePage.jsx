import { Col, Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const user = {
    name: "najmul",
    email: "najmul@gmail.com",
  };

  return user ? (
    <Container>
      <Row>
        <Col className="py-4">
          <h5>Name: {user.name}</h5>
          <h6>Email: {user.email}</h6>
        </Col>
      </Row>
    </Container>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default ProfilePage;
