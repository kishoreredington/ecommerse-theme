import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  useEffect(() => {}, []);

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
