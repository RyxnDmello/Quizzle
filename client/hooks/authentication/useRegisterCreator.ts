import RegisterSchema, { validationSchema } from "@schemas/RegisterSchema";

import { useFormik } from "formik";

export default function useRegisterCreator() {
  const initialValues: RegisterSchema = {
    name: "",
    email: "",
    mobile: null,
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values: RegisterSchema) => {
    console.log(values);
  };

  const { touched, errors, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit,
    }
  );

  return { touched, errors, handleBlur, handleChange, handleSubmit };
}
