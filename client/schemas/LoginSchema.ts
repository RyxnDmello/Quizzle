import * as yup from "yup";

import { USER } from "../interfaces/User";

export default interface LoginSchema {
  type?: USER;
  email: string;
  password: string;
}

export const validationSchema = yup.object<LoginSchema>().shape({
  email: yup
    .string()
    .trim()
    .email("Email is invalid.")
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .matches(/([0-9a-zA-Z!@#$%])/, "Password contains an invalid character.")
    .matches(/(?=.*[A-Z]+.*$)/, "Password must contain one uppercase letter.")
    .matches(/(?=.*[a-z]+.*$)/, "Password must contain one lowercase letter.")
    .matches(/(?=.*\d)/, "Password must contain one number.")
    .matches(/(?=.*[!@#$%])/, "Password must contain a special character.")
    .min(8, "Password must be a minimum of 8 characters.")
    .max(50, "Password must be a maximum of 50 Characters")
    .required("Password is required."),
});
