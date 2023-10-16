import logo from "../../assets/Images/Gmail-Emblem.png";
import "./Navbar.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navbars() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/sign-out`, {
        withCredentials: true
      });
      if (res.status === 200) {
        localStorage.removeItem("accessToken");

        navigate("/login");
        toast.success("Signed out Successfully", { autoClose: 600 });
      }
    } catch (error) {
      toast.error("Error in signing out");
    }
  };
  return (
    <>
      <div className="container-fluid header">
        <span>
          <img src={logo} />
        </span>

        <Form className="d-flex">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          <Form.Control
            type="search"
            placeholder="Search mail"
            aria-label="Search"
          />
          <Button id="signOutButton" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Navbars;
