import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import { USER } from "@interfaces/User";

import useAuth from "./useAuth";

import LoginSchema, { validationSchema } from "@schemas/LoginSchema";

import { useFormik } from "formik";

export default function useLogin() {
  const { dispatch } = useAuth();
  const { replace } = useRouter();

  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: LoginSchema) => {
    values.type = localStorage.getItem("USER") as USER;

    try {
      const {
        data: { access, refresh },
      } = await axios.post<{ refresh: string; access: string }>(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/token`,
        {
          username: "RyanDmello",
          password: "RyxnDmello@Django10!",
        }
      );

      const { data } = await axios.post<LoginSchema>(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/login`,
        values
      );

      data.type = values.type;

      dispatch({
        type: "AUTHENTICATE",
        payload: {
          ...data,
          refreshToken: refresh,
          accessToken: access,
        },
      });

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
