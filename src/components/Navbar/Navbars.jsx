import logo from "../../assets/Images/Gmail-Emblem.png";
import profile from "../../assets/Images/profile.png";
import "./Navbar.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { UseContext } from "../../Context/UserContext";
import { Image } from "react-bootstrap";

function Navbars() {
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const { data } = useContext(UseContext);
  const toggleProfileDetails = () => {
    setShowProfileDetails(!showProfileDetails);
  };
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/sign-out`, {
        withCredentials: true
      });
      if (res.status === 200) {
        Cookies.remove("accessToken");
        navigate("/login");
        toast.success("Signed out Successfully", { autoClose: 600 });
      }
    } catch (error) {
      toast.error("Error in signing out");
    }
  };

  return (
    <>
      <div className="container-fluid">
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
        </Form>

        <Image src={profile} className="img" onClick={toggleProfileDetails} />

        {showProfileDetails && (
          <div className="profile-details">
            <p>
              Name: &nbsp;
              {data.data[0].firstName.toUpperCase() +
                " " +
                data.data[0].lastName.toUpperCase()}
            </p>
            <p>Email:&nbsp; {data.data[0].email}</p>
            <Button variant="danger" id="signOutButton" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
}

export default Navbars;
