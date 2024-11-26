import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";

import useAuth from "@hooks/authentication/useAuth";

import JoinSchema, { validationSchema } from "@schemas/JoinSchema";

export default function useJoinQuiz() {
  const { replace } = useRouter();

  const { user } = useAuth();

  const initialValues: JoinSchema = {
    code: "",
  };

  const handleCheck = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/quiz/answer/${user!.id}/${
        values.code
      }`,
      {
        username: process.env.NEXT_PUBLIC_AUTH_USERNAME!,
        password: process.env.NEXT_PUBLIC_AUTH_PASSWORD!,
      },
      {
        headers: {
          Authorization: `Bearer ${user!.accessToken}`,
        },
      }
    );

    replace(`/attendee/quiz/${values.code}`, {
      scroll: true,
    });
  };

  const {
    error: fetchError,
    isPending: isFetchPending,
    mutate: onSubmit,
  } = useMutation<unknown, AxiosError<{ error: string }>, void>({
    mutationKey: ["quiz", "answer", user?.id],
    mutationFn: handleCheck,
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    values,
    errors: formErrors,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => onSubmit(),
  });

  return {
    fetchError,
    formErrors,
    isFetchPending,
    handleBlur,
    handleChange,
    handleSubmit,
  };
}
