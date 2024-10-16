import { useState } from "react";
import { FormikErrors } from "formik";

import AnswerSchema, { Question as _ } from "@schemas/AnswerSchema";
import QuizSchema from "@schemas/QuizSchema";

import Text from "./Question/Text";
import Option from "./Question/Option";

import styles from "./Question.module.scss";

interface QuestionProps {
  index: number;
  details: QuizSchema;
  errors: FormikErrors<AnswerSchema>;
  onSelect: (name: string, value: string) => void;
}

export default function Question({
  index,
  details,
  errors,
  onSelect,
}: QuestionProps) {
  const [option, setOption] = useState<"A" | "B" | "C" | null>(null);

  const handleSelect = (value: "A" | "B" | "C") => {
    onSelect(`questions[${index}].selected`, value);
    setOption(value);
  };

  return (
    <div className={styles.question}>
      <div className={styles.header}>
        <Text label={details.questions[index].question} />
        <Text icon="/quiz/trophy.png" label={details.questions[index].points} />
      </div>

      <div className={styles.options}>
        <Option
          isSelected={option === "A"}
          label={details.questions[index].options.A}
          onSelect={() => handleSelect("A")}
        />

        <Option
          isSelected={option === "B"}
          label={details.questions[index].options.B}
          onSelect={() => handleSelect("B")}
        />

        <Option
          isSelected={option === "C"}
          label={details.questions[index].options.C}
          onSelect={() => handleSelect("C")}
        />
      </div>

      <p>
        {errors.questions &&
          errors.questions[index] &&
          (errors.questions[index] as _).selected}
      </p>
    </div>
  );
}
