import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";

import { USER } from "@interfaces/User";

import useAuth from "./useAuth";

import LoginSchema, { validationSchema } from "@schemas/LoginSchema";

export default function useLogin() {
  const { user, dispatch } = useAuth();
  const { replace } = useRouter();

  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  const onLogin = async (values: LoginSchema) => {
    values.type = localStorage.getItem("USER") as USER;

    const {
      data: { access, refresh },
    } = await axios.post<{ refresh: string; access: string }>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/token`,
      {
        username: process.env.NEXT_PUBLIC_AUTH_USERNAME!,
        password: process.env.NEXT_PUBLIC_AUTH_PASSWORD!,
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
  };

  const {
    error,
    isPending,
    mutate: onSubmit,
  } = useMutation<void, AxiosError<{ error: string }>, LoginSchema>({
    mutationKey: ["login"],
    mutationFn: onLogin,
  });

  const { touched, errors, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: (values) => onSubmit(values),
    }
  );

  if (user && user.accessToken && user.type === localStorage.getItem("USER")) {
    replace(`/${user.type?.toLowerCase()}`, { scroll: true });
  }

  return {
    touched,
    error,
    errors,
    isPending,
    handleBlur,
    handleChange,
    handleSubmit,
  };
}
