import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function useAuth() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Session Expired", { autoClose: 1000 });
    }
  }, [navigate, token]);
}

export default useAuth;
