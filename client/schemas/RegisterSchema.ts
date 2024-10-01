import * as yup from "yup";

export default interface RegisterSchema {
  name: string;
  email: string;
  mobile: number | null;
  password: string;
  confirmPassword: string;
}

export const validationSchema = yup.object<RegisterSchema>().shape({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s]*$/, "Name must contain only letters.")
    .min(4, "Name must be a minimum of 4 characters.")
    .max(50, "Name must be a minimum of 50 Characters")
    .required("Name is required."),
  email: yup
    .string()
    .trim()
    .email("Email is invalid.")
    .required("Email is required."),
  mobile: yup
    .number()
    .nullable()
    .test("digit", "Mobile number must start with 6, 7, 8, or 9", (value) => {
      if (!value) return true;
      return ["6,", "7", "8", "9"].includes(value.toString().charAt(0));
    })
    .test("length", "Mobile number must be 10 digits.", (value) => {
      if (!value) return true;
      return value.toString().length === 10;
    }),
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
  confirmPassword: yup
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
