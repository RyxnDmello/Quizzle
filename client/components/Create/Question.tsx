import { useState, ChangeEvent, FocusEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";

import QuestionSchema, { Question as _ } from "@schemas/QuestionSchema";

import Input from "./Question/Input";
import Option from "./Question/Option";

interface QuestionProps {
  index: number;
  score?: number;
  question?: string;
  options?: string[];
  disabled?: boolean;
  errors?: FormikErrors<QuestionSchema>;
  touched?: FormikTouched<QuestionSchema>;
  onSelect?: (name: string, value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

import styles from "./Question.module.scss";

export default function Question({
  index,
  score,
  question,
  options,
  errors,
  touched,
  disabled = false,
  onBlur,
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
      <div>
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
          type="text"
          disabled={disabled}
          value={question}
          placeholder={"Enter Question"}
          name={`questions[${index}].question`}
          onBlur={onBlur}
          onChange={onChange}
        />

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
          value={score}
          disabled={disabled}
          placeholder="Enter Score"
          name={`questions[${index}].points`}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      <div>
        <Option
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
          value={options && options[0]}
          name={`questions[${index}].options.A`}
          onSelect={() => handleSelect("A")}
          isSelected={option === "A"}
          onChange={onChange}
          onBlur={onBlur}
        />

        <Option
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
          value={options && options[1]}
          name={`questions[${index}].options.B`}
          onSelect={() => handleSelect("B")}
          isSelected={option === "B"}
          onChange={onChange}
          onBlur={onBlur}
        />

        <Option
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
          value={options && options[0]}
          name={`questions[${index}].options.C`}
          onSelect={() => handleSelect("C")}
          isSelected={option === "C"}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
