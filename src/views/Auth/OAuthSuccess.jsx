import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // If backend sets session-based auth, no need to fetch tokens here
        // But you can still hit /api/me/ or similar to get user info
        navigate("/lawyer/dashboard"); // or "/"
      } catch (error) {
        console.error("OAuth login failed");
        navigate("/login");
      }
    };

    checkUser();
  }, []);

  return <div className="text-white text-center mt-20">Redirecting...</div>;
};

export default OAuthSuccess;
