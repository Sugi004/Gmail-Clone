import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Loaders from "../../LoaderComponents/Loaders";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "../../Validation/validation";
import "./CreateAccount.css";
function CreateAccount() {
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let handleSignUp = async (values) => {
    try {
      console.log(values);
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not Match", { autoClose: 600 });
      } else {
        setIsLoading(true);

        let res = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-user`,
          values,
          {
            withCredentials: true
          }
        );

        if (res.status === 200) {
          toast.success(res.data.message, {
            autoClose: 600
          });
          navigate("login");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message, {
        autoClose: 600
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: handleSignUp
  });

  return (
    <>
      <div className="container signUp-wrapper">
        <p className="google">
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
        </p>
        <p>Create Account</p>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFname">
            <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                autoComplete="off"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="errors">{formik.errors.firstName}</div>
              ) : null}
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLname">
            <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                autoComplete="off"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="errors">{formik.errors.lastName}</div>
              ) : null}
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                autoComplete="off"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="errors">{formik.errors.email}</div>
              ) : null}
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <FloatingLabel
              controlId="floatingInput"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="errors">{formik.errors.password}</div>
              ) : null}
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Confirm Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                autoComplete="off"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="errors">{formik.errors.confirmPassword}</div>
              ) : null}
            </FloatingLabel>
          </Form.Group>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loaders /> : <>Create Account</>}
          </Button>
        </Form>
        <span>Already have an Account! </span>{" "}
        <span>
          <Link to="/login">Sign In</Link>
        </span>
      </div>
    </>
  );
}

export default CreateAccount;
