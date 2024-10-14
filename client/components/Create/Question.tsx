import { useState, ChangeEvent, FocusEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";
import Image from "next/image";

import Trophy from "@public/quiz/trophy.png";
import Delete from "@public/quiz/remove.svg";

import QuizSchema, { Options, Question as _ } from "@schemas/QuizSchema";

import Input from "../Inputs/Input";
import Option from "./Question/Option";

import styles from "./Question.module.scss";

interface QuestionProps {
  index: number;
  values?: QuizSchema;
  disabled?: boolean;
  errors?: FormikErrors<QuizSchema>;
  touched?: FormikTouched<QuizSchema>;
  onDelete?: (index: number) => void;
  onSelect?: (name: string, value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Question({
  index,
  values,
  errors,
  touched,
  disabled = false,
  onBlur,
  onDelete,
  onChange,
  onSelect,
}: QuestionProps) {
  const [option, setOption] = useState<"A" | "B" | "C" | null>(null);

  const handleSelect = (value: "A" | "B" | "C") => {
    if (!onSelect) return;
    onSelect(`questions[${index}].correct`, value);
    setOption(value);
  };

  return (
    <div className={styles.question}>
      <div className={styles.header}>
        <div>
          {onDelete && (
            <Image
              src={Delete}
              width={512}
              height={512}
              alt="delete"
              onClick={() => onDelete(index)}
            />
          )}

          <Input
            error={
              touched &&
              touched.questions &&
              touched.questions[index] &&
              touched.questions[index].question
                ? errors &&
                  errors.questions &&
                  errors.questions[index] &&
                  (errors.questions[index] as FormikErrors<_>).question
                : undefined
            }
            disabled={disabled}
            value={values?.questions[index]?.question}
            placeholder={"Enter Question"}
            name={`questions[${index}].question`}
            onBlur={onBlur}
            onChange={onChange}
          />
        </div>

        <Input
          error={
            touched &&
            touched.questions &&
            touched.questions[index] &&
            touched.questions[index].points
              ? errors &&
                errors.questions &&
                errors.questions[index] &&
                (errors.questions[index] as FormikErrors<_>).points
              : undefined
          }
          type="number"
          icon={Trophy}
          value={values?.questions[index]?.points}
          disabled={disabled}
          placeholder="Enter Score"
          name={`questions[${index}].points`}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      <div className={styles.options}>
        <Option
          value={
            values?.questions[index]?.options &&
            (values?.questions[index]?.options as Options).A
          }
          isSelected={
            !disabled || onSelect
              ? option === "A"
              : values && values.questions[index]
              ? values.questions[index].selected === "A"
              : undefined
          }
          isCorrect={
            disabled
              ? values && values.questions
                ? values.questions[index] && values.questions[index] === null
                  ? undefined
                  : values.questions[index] && values.questions[index].selected
                  ? values.questions[index].correct === "A"
                  : undefined
                : undefined
              : undefined
          }
          error={
            touched &&
            touched.questions &&
            touched.questions[index] &&
            touched.questions[index].options &&
            touched.questions[index].options.A
              ? errors &&
                errors.questions &&
                errors.questions[index] &&
                (errors.questions[index] as FormikErrors<_>).options &&
                (errors.questions[index] as FormikErrors<_>).options!.A
              : undefined
          }
          disabled={disabled}
          name={`questions[${index}].options.A`}
          onSelect={() => handleSelect("A")}
          onChange={onChange}
          onBlur={onBlur}
        />

        <Option
          value={
            values?.questions[index]?.options &&
            (values?.questions[index]?.options as Options).B
          }
          isSelected={
            !disabled || onSelect
              ? option === "B"
              : values && values.questions[index]
              ? values.questions[index].selected === "B"
              : undefined
          }
          isCorrect={
            disabled
              ? values && values.questions
                ? values.questions[index] && values.questions[index] === null
                  ? undefined
                  : values.questions[index] && values.questions[index].selected
                  ? values.questions[index].correct === "B"
                  : undefined
                : undefined
              : undefined
          }
          error={
            touched &&
            touched.questions &&
            touched.questions[index] &&
            touched.questions[index].options &&
            touched.questions[index].options.B
              ? errors &&
                errors.questions &&
                errors.questions[index] &&
                (errors.questions[index] as FormikErrors<_>).options &&
                (errors.questions[index] as FormikErrors<_>).options!.B
              : undefined
          }
          disabled={disabled}
          name={`questions[${index}].options.B`}
          onSelect={() => handleSelect("B")}
          onChange={onChange}
          onBlur={onBlur}
        />

        <Option
          value={
            values?.questions[index]?.options &&
            (values?.questions[index]?.options as Options).C
          }
          isSelected={
            !disabled || onSelect
              ? option === "C"
              : values && values.questions[index]
              ? values.questions[index].selected === "C"
              : undefined
          }
          isCorrect={
            disabled
              ? values && values.questions
                ? values.questions[index] && values.questions[index] === null
                  ? undefined
                  : values.questions[index] && values.questions[index].selected
                  ? values.questions[index].correct === "C"
                  : undefined
                : undefined
              : undefined
          }
          error={
            touched &&
            touched.questions &&
            touched.questions[index] &&
            touched.questions[index].options &&
            touched.questions[index].options.C
              ? errors &&
                errors.questions &&
                errors.questions[index] &&
                (errors.questions[index] as FormikErrors<_>).options &&
                (errors.questions[index] as FormikErrors<_>).options!.C
              : undefined
          }
          disabled={disabled}
          name={`questions[${index}].options.C`}
          onSelect={() => handleSelect("C")}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
