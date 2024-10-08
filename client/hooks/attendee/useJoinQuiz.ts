import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import JoinSchema, { validationSchema } from "@schemas/JoinSchema";

export default function useJoinQuiz() {
  const { replace } = useRouter();

  const initialValues: JoinSchema = {
    code: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      replace(`/attendee/quiz/${values.code}`);
    },
  });

  return { errors, handleBlur, handleChange, handleSubmit };
}
