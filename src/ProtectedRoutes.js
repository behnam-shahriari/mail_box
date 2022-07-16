import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  useEffect(() => {});
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  if (!(id && email)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
