import { Col, Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProfilePage = () => {
  const { user, profile } = useAuth();

  return user ? (
    <Container>
      <Row>
        <Col className="py-4">
          <h5>Name: {profile.name}</h5>
          <h6>Email: {profile.email}</h6>
        </Col>
      </Row>
    </Container>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default ProfilePage;
