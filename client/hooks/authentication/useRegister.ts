import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import RegisterSchema, { validationSchema } from "@schemas/RegisterSchema";

import { useFormik } from "formik";

export default function useRegister() {
  const { replace } = useRouter();

  const initialValues: RegisterSchema = {
    name: "",
    email: "",
    mobile: null,
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: RegisterSchema) => {
    values.type = "CREATOR";

    try {
      const { data } = await axios.post<RegisterSchema>(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/register`,
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
