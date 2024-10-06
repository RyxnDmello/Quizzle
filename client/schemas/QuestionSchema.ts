import * as yup from "yup";

import { DIFFICULTY } from "@interfaces/Quiz";

export default interface QuestionSchema {
  id?: string;
  title: string;
  difficulty: "NULL" | DIFFICULTY;
  questions: Question[];
}

export interface Question {
  question: string;
  options: Options;
  points: number;
  correct: "A" | "B" | "C" | null;
}

export interface Options {
  A: string;
  B: string;
  C: string;
}

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(4, "Title must be a minimum of 4 characters.")
    .max(150, "Title must be a maximum of 150 characters.")
    .required("Title is required."),
  difficulty: yup
    .string()
    .oneOf(["HARD", "MEDIUM", "EASY"], "Invalid difficulty selected.")
    .required("Difficulty is required."),
  questions: yup.array().of(
    yup.object({
      question: yup
        .string()
        .trim()
        .min(4, "Question must be a minimum of 4 characters.")
        .max(150, "Question must be a maximum of 150 characters.")
        .required("Question is required."),
      options: yup
        .object()
        .shape({
          A: yup
            .string()
            .trim()
            .min(4, "Option must be a minimum of 4 characters.")
            .max(25, "Option must be a maximum of 25 characters.")
            .required("Option is required."),
          B: yup
            .string()
            .trim()
            .min(4, "Option must be a minimum of 4 characters.")
            .max(25, "Option must be a maximum of 25 characters.")
            .required("Option is required."),
          C: yup
            .string()
            .trim()
            .min(4, "Option must be a minimum of 4 characters.")
            .max(25, "Option must be a maximum of 25 characters.")
            .required("Option is required."),
        })
        .notRequired(),
      points: yup
        .number()
        .min(1, "Points must be a minimum of 1.")
        .max(100, "Points must be a maximum of 100.")
        .required("Points is required."),
      correct: yup
        .string()
        .nonNullable()
        .oneOf(["A", "B", "C"], "Please select a correct option.")
        .required("Correct option must be selected."),
    })
  ),
});
