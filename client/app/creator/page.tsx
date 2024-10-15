"use client";

import { useRouter } from "next/navigation";

import useFetchQuizzes from "@hooks/creator/useFetchQuizzes";
import useFilterQuizzes from "@hooks/common/useFilterQuizzes";

import Controller from "@components/Catalogue/Controller";
import Search from "@components/Catalogue/Controller/Search";
import Dropdown from "@components/Catalogue/Controller/Dropdown";
import Option from "@components/Catalogue/Controller/Option";

import Quizzes from "@components/Catalogue/Quizzes";
import Quiz from "@components/Catalogue/Quiz/Quiz";

import Pagination from "@components/Catalogue/Pagination";
import Empty from "@components/Common/Empty";

export default function Creator() {
  const { quizzes } = useFetchQuizzes();
  const { filter, handleSetPrompt } = useFilterQuizzes(quizzes);

  const { push } = useRouter();

  const handleNavigate = (id: string) => push(`/creator/quiz/${id}`);

  return (
    <section id="catalogue">
      <Controller onSubmit={() => {}}>
        <Search placeholder="Search By Name" onChange={handleSetPrompt} />

        <Dropdown name="sort" onChange={() => {}}>
          <Option value="name_asc" label="Name (Ascending)" />
          <Option value="name_desc" label="Name (Descending)" />
          <Option value="questions_asc" label="Questions (Ascending)" />
          <Option value="questions_desc" label="Questions (Descending)" />
          <Option value="points_asc" label="Points (Ascending)" />
          <Option value="points_desc" label="Points (Descending)" />
        </Dropdown>
      </Controller>

      {quizzes.length === 0 && (
        <Empty
          label="Create Quiz"
          reason="No Quizzes Available."
          url="/creator/quiz/create"
        />
      )}

      {quizzes.length !== 0 && (
        <Quizzes>
          {(filter.length === 0 ? quizzes : filter).map((quiz) => (
            <Quiz
              key={quiz.id}
              {...quiz}
              onClick={() => handleNavigate(quiz.id!)}
            />
          ))}
        </Quizzes>
      )}

      {quizzes.length !== 0 && (
        <Pagination
          url="/creator/quiz/create"
          image="/user/add.svg"
          pages={5}
        />
      )}
    </section>
  );
}
