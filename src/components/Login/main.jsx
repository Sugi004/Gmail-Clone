import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Loaders from "../../LoaderComponents/Loaders";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Cookies from "js-cookie";

function Login() {
  let [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let handleLogin = async () => {
    try {
      setIsLoading(true);
      let res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          ...inputs
        },
        {
          withCredentials: true
        }
      );

      if (res.status === 200) {
        // Store the access Token inorder to Validate the Session
        Cookies.set("accessToken", res.data.token, {
          expires: 3600
        });

        localStorage.setItem("currentMailBox", "inbox");

        toast.success(res.data.message, {
          autoClose: 500
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/mails/inbox");
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message, {
        autoClose: 500
      });
    }
  };
  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };
  return (
    <>
      <div className="container login-wrapper">
        <p className="google">
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
        </p>
        <p>Sign In</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInputs"
              label="Enter Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                autoComplete="off"
                onChange={handleInputs}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                onChange={handleInputs}
              />
            </FloatingLabel>
          </Form.Group>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
          >
            {isLoading ? <Loaders /> : <>Login</>}
          </Button>
        </Form>
        <span>Do Not have an Account!</span>&nbsp;
        <span>
          <Link to="/sign-up">Sign up</Link>
        </span>
      </div>
    </>
  );
}

export default Login;
