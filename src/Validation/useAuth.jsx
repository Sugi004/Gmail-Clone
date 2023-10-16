import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
function useAuth() {
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
    if (!token) {
      navigate("/login");
      toast.error("Session Expired", { autoClose: 1000 });
    }
  }, []);
}

export default useAuth;
