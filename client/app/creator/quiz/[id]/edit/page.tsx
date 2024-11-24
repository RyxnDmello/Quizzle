"use client";

import { FormikErrors, FormikTouched } from "formik";
import { useRouter } from "next/navigation";

import Quiz from "@interfaces/Quiz";

import QuizSchema from "@schemas/QuizSchema";

import useEditQuiz from "@hooks/creator/useEditQuiz";

import Title from "@components/Common/Title";
import Input from "@components/Inputs/Input";
import Button from "@components/Inputs/Button";

import Difficulty from "@components/Creator/Question/Difficulty";
import Questions from "@components/Creator/Questions";
import Question from "@components/Creator/Question";
import Add from "@components/Creator/Add";

import Empty from "@components/Common/Empty";
import Error from "@components/Common/Error";

export default function Edit() {
  const { replace } = useRouter();

  const {
    updatedQuiz,
    fetchError,
    updateError,
    formErrors,
    formValues,
    formTouched,
    isFetchPending,
    isUpdatePending,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleAddQuestion,
    handleDeleteQuestion,
  } = useEditQuiz();

  if (isFetchPending) {
    return (
      <section id="create">
        <Empty reason="Loading Your Quiz..." />
      </section>
    );
  }

  if (fetchError) {
    return (
      <section id="create">
        <Empty
          reason={`${fetchError.response?.data.error}.`}
          label="Go To Dashboard."
          url="/creator"
        />
      </section>
    );
  }

  if (!updatedQuiz) {
    return (
      <section id="create">
        <Empty
          reason={"Failed To Fetch Quiz."}
          label="Go To Dashboard."
          url="/creator"
        />
      </section>
    );
  }

  return (
    <section id="create">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="details">
          <Title>
            Edit Your Qui<span>zz</span>
          </Title>

          <Input
            name="title"
            placeholder="Enter Title"
            value={formValues.title}
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
            difficulty={
              updatedQuiz.difficulty === "NULL"
                ? undefined
                : updatedQuiz.difficulty
            }
            onSelect={setFieldValue}
          />
        </div>

        <hr />

        <Questions>
          {updatedQuiz.questions.length !== 0 && (
            <Title>Manage Questions</Title>
          )}

          {formValues.questions.map((_, i) => (
            <Question
              key={i}
              index={i}
              values={formValues as Quiz}
              errors={formErrors as FormikErrors<QuizSchema>}
              touched={formTouched as FormikTouched<QuizSchema>}
              disabled={false}
              onBlur={handleBlur}
              onChange={handleChange}
              onSelect={setFieldValue}
              onDelete={handleDeleteQuestion}
            />
          ))}

          <Add onAdd={handleAddQuestion} />
        </Questions>

        <hr />

        <div className="buttons">
          <Button
            onClick={() => replace("/creator")}
            label="Cancel"
            type="button"
          />

          <Button
            onClick={resetForm}
            disabled={isUpdatePending}
            label="Reset Quiz"
            type="reset"
          />

          <Button
            disabled={isUpdatePending}
            label={isUpdatePending ? "Updating..." : "Update Quiz"}
            type="submit"
          />
        </div>
      </form>

      <Error error={updateError} />
    </section>
  );
}
