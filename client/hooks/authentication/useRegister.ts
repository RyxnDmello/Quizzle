import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import { USER } from "@interfaces/User";

import useAuth from "./useAuth";

import RegisterSchema, { validationSchema } from "@schemas/RegisterSchema";

import { useFormik } from "formik";

export default function useRegister() {
  const { user, dispatch } = useAuth();
  const { replace } = useRouter();

  const initialValues: RegisterSchema = {
    name: "",
    email: "",
    mobile: null,
    password: "",
    confirmPassword: "",
  };

  const onRegister = async (values: RegisterSchema) => {
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

    const { data } = await axios.post<RegisterSchema>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/register`,
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
    RegisterSchema
  >({
    mutationKey: ["register"],
    mutationFn: onRegister,
  });

  const { touched, errors, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: (values) => mutate(values),
    }
  );

  useEffect(() => {
    if (!user || !user.accessToken) return;
    if (user.type !== localStorage.getItem("USER")) return;
    replace(`/${user.type?.toLowerCase()}`, { scroll: true });
  }, []);

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
