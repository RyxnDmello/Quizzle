import { FocusEvent, ChangeEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";

import QuestionSchema from "@schemas/QuestionSchema";

import Input from "./Question/Input";
import Difficulty from "./Question/Difficulty";

import styles from "./Details.module.scss";

interface DetailsProps {
  errors?: FormikErrors<QuestionSchema>;
  touched?: FormikTouched<QuestionSchema>;
  onSelect: (name: string, value: string) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Details({
  errors,
  touched,
  onBlur,
  onChange,
  onSelect,
}: DetailsProps) {
  return (
    <div className={styles.details}>
      <h1>Create Your Qui<span>zz</span></h1>

      <Input
        name="title"
        placeholder="Enter Title"
        error={touched && touched.title ? errors && errors.title : undefined}
        onBlur={onBlur}
        onChange={onChange}
      />

      <Difficulty error={errors && errors.difficulty} onSelect={onSelect} />
    </div>
  );
}
