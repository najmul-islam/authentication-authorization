import { Col, Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const { loading, profile } = useProfile();

  return user ? (
    <Container>
      <Row>
        <Col className="py-4">
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            <div>
              <h5>Name: {profile?.name}</h5>
              <h6>Email: {profile?.email}</h6>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default ProfilePage;
