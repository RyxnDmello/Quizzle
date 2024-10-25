import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import LoginSchema, { validationSchema } from "@schemas/LoginSchema";

import { useFormik } from "formik";

export default function useLogin() {
  const { replace } = useRouter();

  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: LoginSchema) => {
    values.type = "CREATOR";

    try {
      const { data } = await axios.post<LoginSchema>(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/login`,
        values
      );

      replace(`/${data.type!.toLowerCase()}`, { scroll: true });
    } catch (error) {
      console.log(error instanceof AxiosError && error.response?.data);
    }
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
