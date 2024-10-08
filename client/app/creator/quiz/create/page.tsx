"use client";

import { FormikErrors, FormikTouched } from "formik";
import { useRouter } from "next/navigation";

import QuizSchema from "@schemas/QuizSchema";

import useCreateQuiz from "@hooks/creator/useCreateQuiz";

import Questions from "@components/Create/Questions";
import Question from "@components/Create/Question";
import Details from "@components/Create/Details";
import Button from "@components/Create/Button";
import Add from "@components/Create/Add";

export default function Create() {
  const { replace } = useRouter();

  const {
    quiz,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleAddQuestion,
  } = useCreateQuiz();

  return (
    <section>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Details
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
          onChange={handleChange}
          onSelect={setFieldValue}
        />

        <hr />

        <Questions>
          {quiz.questions.map((_, i) => (
            <Question
              key={i}
              index={i}
              errors={errors as FormikErrors<QuizSchema>}
              touched={touched as FormikTouched<QuizSchema>}
              onBlur={handleBlur}
              onChange={handleChange}
              onSelect={setFieldValue}
            />
          ))}

          <Add onAdd={handleAddQuestion} />
        </Questions>

        <hr />

        <div className="buttons">
          <Button
            type="button"
            label="Cancel"
            onClick={() => replace("/creator")}
          />

          <Button type="reset" label="Reset Quiz" onClick={resetForm} />
          <Button type="submit" label="Create Quiz" />
        </div>
      </form>
    </section>
  );
}
