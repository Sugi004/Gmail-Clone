import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .required("First Name is required*"),
  lastName: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .required("Last Name is required*"),
  email: yup
    .string()
    .email("Invalid email address*")
    .required("Email is required*"),
  password: yup
    .string()
    .required("Password is required*")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match*")
    .required("Confirm Password is required*")
});
