import { useState, ChangeEvent, FocusEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";

import QuestionSchema, { Question as _ } from "@schemas/QuestionSchema";

import Input from "./Question/Input";
import Option from "./Question/Option";

interface QuestionProps {
  index: number;
  errors?: FormikErrors<QuestionSchema>;
  touched?: FormikTouched<QuestionSchema>;
  onSelect: (name: string, value: string) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

import styles from "./Question.module.scss";

export default function Question({
  index,
  errors,
  touched,
  onBlur,
  onChange,
  onSelect,
}: QuestionProps) {
  const [option, setOption] = useState<"A" | "B" | "C" | null>(null);

  const handleSelect = (value: "A" | "B" | "C") => {
    onSelect(`questions[${index}].correct`, value);
    setOption(value);
  }

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
          placeholder="Enter Question"
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
          placeholder="Enter Score"
          name={`questions[${index}].points`}
          onBlur={onBlur}
          onChange={onChange}
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
          name={`questions[${index}].options.A`}
          onSelect={() => handleSelect("A")}
          isSelected={option === "A"}
          onBlur={onBlur}
          onChange={onChange}
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
          name={`questions[${index}].options.B`}
          onSelect={() => handleSelect("B")}
          isSelected={option === "B"}
          onBlur={onBlur}
          onChange={onChange}
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
          name={`questions[${index}].options.C`}
          onSelect={() => handleSelect("C")}
          isSelected={option === "C"}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
