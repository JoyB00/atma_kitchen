import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRootWithRole({ children, role_id, url }) {
  const navigate = useNavigate();
  const authUser = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      navigate("/login");
    } else if (authUser.role_id != role_id) {
      navigate("/");
    }
  }, [navigate]);

  return (
    sessionStorage.getItem("token") &&
    authUser.role_id === role_id &&
    (children ? children : <Outlet />)
  );
}
