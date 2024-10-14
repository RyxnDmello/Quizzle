"use client";

import { FormikErrors, FormikTouched } from "formik";
import { useRouter } from "next/navigation";

import QuizSchema from "@schemas/QuizSchema";

import useCreateQuiz from "@hooks/creator/useCreateQuiz";

import Title from "@components/Common/Title";
import Questions from "@components/Create/Questions";
import Question from "@components/Create/Question";

import Difficulty from "@components/Create/Question/Difficulty";
import Input from "@components/Inputs/Input";
import Button from "@components/Inputs/Button";
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
    handleDeleteQuestion,
  } = useCreateQuiz();

  return (
    <section id="create">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="details">
          <Title>
            Create Your Qui<span>zz</span>
          </Title>

          <Input
            name="title"
            placeholder="Enter Title"
            error={
              touched && touched.title ? errors && errors.title : undefined
            }
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <Difficulty
            error={errors && errors.difficulty}
            onSelect={setFieldValue}
          />
        </div>

        <hr />

        <Questions>
          {quiz.questions.map((_, i) => (
            <Question
              key={i}
              index={i}
              errors={errors as FormikErrors<QuizSchema>}
              touched={touched as FormikTouched<QuizSchema>}
              onDelete={handleDeleteQuestion}
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
