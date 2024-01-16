import { Col, Container, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useProfileQuery } from "../features/user/userApi";

const ProfilePage = () => {
  // const { user } = useSelector((state) => state.auth);
  const { data: profile, isLoading, isError, error } = useProfileQuery();

  const user = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (!profile) {
      navigate("/login");
    }
  }, [isError, navigate, profile, error]);

  return user ? (
    <Container>
      <Row>
        <Col className="py-4">
          {isLoading ? (
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
