// Pages/logout/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: clear auth/session here
    navigate("/login");
  }, [navigate]);

  return null; // or a loading spinner if you like
};

export default Logout;
