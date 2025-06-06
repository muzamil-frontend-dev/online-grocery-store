import { useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
import { Navigate, Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import { Container } from "react-bootstrap";

const RequireAuth = (isAdmin = false, children) => {
  const { userInfo } = useSelector(loginSelector);

  if (!userInfo) {
    return <Navigate to="/login" replace={true} />;
  }

  if (isAdmin && !userInfo.isAdmin) {
    return <Navigate to="/login?redirect=/admin" replace={true} />;
  }

  if (isAdmin) {
    return (
      <>
        <div className="d-flex">
          <SideMenu />
          <Container>
            <Outlet />
          </Container>
        </div>
      </>
    );
  } else {
    return children;
  }
};
export default RequireAuth;
