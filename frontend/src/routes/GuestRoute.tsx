import { Navigate, Outlet } from "react-router-dom";
interface GuestRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
}

const defaultPathAfterLogin = "/create-token"

const GuestRoute: React.FC<GuestRouteProps> = ({
  isAllowed,
  redirectPath = defaultPathAfterLogin,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
