import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRootForgotPass({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      navigate("/login");
    }
  }, [navigate]);

  return sessionStorage.getItem("token") && (children ? children : <Outlet />);
}
