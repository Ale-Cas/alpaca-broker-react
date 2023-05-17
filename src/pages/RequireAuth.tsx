import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../services/auth/authSlice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/sign-in" state={{ from: location }} replace />
    );
};
export default RequireAuth;
