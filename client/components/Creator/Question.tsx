import { useState, ChangeEvent, FocusEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";
import Image from "next/image";

import Quiz, { Options, Question as _ } from "@interfaces/Quiz";

import Input from "../Inputs/Input";
import Option from "./Question/Option";

import styles from "./Question.module.scss";

interface QuestionProps {
  index: number;
  values?: Quiz;
  disabled?: boolean;
  errors?: FormikErrors<Quiz>;
  touched?: FormikTouched<Quiz>;
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
  const [option, setOption] = useState<"A" | "B" | "C" | null>(
    values?.questions[index].correct ?? null
  );

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
              src="/quiz/remove.svg"
              width={512}
              height={512}
              alt="delete"
              onClick={() => onDelete(index)}
            />
          )}

          <Input
            placeholder="Enter Question"
            name={`questions[${index}].question`}
            value={values?.questions[index]?.question}
            disabled={disabled}
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
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        <Input
          type="number"
          icon="/quiz/trophy.png"
          placeholder="Enter Score"
          name={`questions[${index}].points`}
          value={values?.questions[index]?.points}
          disabled={disabled}
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
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      <div className={styles.options}>
        <Option
          name={`questions[${index}].options.A`}
          inputDisabled={disabled}
          radioDisabled={!onSelect}
          value={
            values?.questions[index]?.options &&
            (values?.questions[index]?.options as Options).A
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
          onSelect={() => handleSelect("A")}
          onChange={onChange}
          onBlur={onBlur}
        />

        <Option
          name={`questions[${index}].options.B`}
          inputDisabled={disabled}
          radioDisabled={!onSelect}
          value={
            values?.questions[index]?.options &&
            (values?.questions[index]?.options as Options).B
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
          onSelect={() => handleSelect("B")}
          onChange={onChange}
          onBlur={onBlur}
        />

        <Option
          name={`questions[${index}].options.C`}
          inputDisabled={disabled}
          radioDisabled={!onSelect}
          value={
            values?.questions[index]?.options &&
            (values?.questions[index]?.options as Options).C
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
          onSelect={() => handleSelect("C")}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
