import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";

import { USER } from "@interfaces/User";

import useAuth from "./useAuth";

import RegisterSchema, { validationSchema } from "@schemas/RegisterSchema";

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

  const handleRegister = async (values: RegisterSchema) => {
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

  const {
    error,
    isPending,
    mutate: onSubmit,
  } = useMutation<void, AxiosError<{ error: string }>, RegisterSchema>({
    mutationKey: ["register"],
    mutationFn: handleRegister,
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
