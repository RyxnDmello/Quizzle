import { useMutation } from "@tanstack/react-query";
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

  const onLogin = async (values: LoginSchema) => {
    values.type = localStorage.getItem("USER") as USER;

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
  };

  const { error, isPending, mutate } = useMutation<
    void,
    AxiosError<{ error: string }>,
    LoginSchema
  >({
    mutationKey: ["login"],
    mutationFn: onLogin,
  });

  const { touched, errors, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: (values) => mutate(values),
    }
  );

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
