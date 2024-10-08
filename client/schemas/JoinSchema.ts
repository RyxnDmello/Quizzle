import * as yup from "yup";

export default interface JoinSchema {
  code: string;
}

export const validationSchema = yup.object().shape({
  code: yup
    .string()
    .trim()
    .test("id", "Code must start with QID", (value) => {
      if (!value) return true;
      return value.startsWith("QID");
    })
    .required("Code is required."),
});
