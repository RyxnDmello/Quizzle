import * as yup from "yup";

export default interface AnswerSchema {
  id?: string;
  questions: Question[];
}

export interface Question {
  selected: "A" | "B" | "C" | null;
}

export const validationSchema = yup.object().shape({
  questions: yup.array().of(
    yup.object({
      selected: yup.string().required("Select an option."),
    })
  ),
});
