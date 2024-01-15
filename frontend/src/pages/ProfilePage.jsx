import { Col, Container, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../features/user/userSlice";
import { reset } from "../features/auth/authSlice";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!profile) {
      navigate("/login");
    }

    dispatch(getProfile());

    return () => {
      dispatch(reset());
    };
  }, []);

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
