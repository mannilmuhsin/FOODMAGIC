import { useSelector } from "react-redux";
import { auth } from "../context/authReducer";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const RequerHome = () => {
  const authis = useSelector(auth);
  const location = useLocation();
  return authis?.role === 2000 || authis?.role == "" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequerHome;
