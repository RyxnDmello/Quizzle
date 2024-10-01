import LoginSchema, { validationSchema } from "@schemas/LoginSchema";

import { useFormik } from "formik";

export default function useLoginCreator() {
  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  const onSubmit = (values: LoginSchema) => {
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
