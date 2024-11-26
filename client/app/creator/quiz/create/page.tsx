"use client";

import { FormikErrors, FormikTouched } from "formik";
import { useRouter } from "next/navigation";

import QuizSchema from "@schemas/QuizSchema";

import useCreateQuiz from "@hooks/creator/useCreateQuiz";

import Title from "@components/Common/Title";
import Input from "@components/Inputs/Input";
import Button from "@components/Inputs/Button";

import Questions from "@components/Creator/Questions";
import Question from "@components/Creator/Question";
import Add from "@components/Creator/Add";

import Difficulty from "@components/Creator/Question/Difficulty";
import Error from "@components/Common/Error";

export default function Create() {
  const { replace } = useRouter();

  const {
    quiz,
    createError,
    formErrors,
    formTouched,
    isCreatePending,
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
              formTouched && formTouched.title
                ? formErrors && formErrors.title
                : undefined
            }
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <Difficulty
            error={formErrors && formErrors.difficulty}
            onSelect={setFieldValue}
          />
        </div>

        <hr />

        <Questions>
          {quiz.questions.length !== 0 && <Title>Manage Questions</Title>}

          {quiz.questions.map((_, i) => (
            <Question
              key={i}
              index={i}
              errors={formErrors as FormikErrors<QuizSchema>}
              touched={formTouched as FormikTouched<QuizSchema>}
              onDelete={handleDeleteQuestion}
              onBlur={handleBlur}
              onChange={handleChange}
              onSelect={setFieldValue}
            />
          ))}

          <Add onAdd={handleAddQuestion} />
        </Questions>

        <hr />

        <Error error={createError} />

        <div className="buttons">
          <Button
            onClick={() => replace("/creator")}
            disabled={isCreatePending}
            label="Cancel"
            type="button"
          />

          <Button
            onClick={resetForm}
            disabled={isCreatePending}
            label="Reset Quiz"
            type="reset"
          />

          <Button
            label={isCreatePending ? "Creating Quiz..." : "Create Quiz"}
            disabled={isCreatePending}
            type="submit"
          />
        </div>
      </form>
    </section>
  );
}
