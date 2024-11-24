"use client";

import { useRouter } from "next/navigation";

import useFetchCreatedQuizzes from "@hooks/creator/useFetchCreatedQuizzes";

import Controller from "@components/Catalogue/Controller";
import Search from "@components/Catalogue/Controller/Search";
import Dropdown from "@components/Catalogue/Controller/Dropdown";
import Option from "@components/Catalogue/Controller/Option";

import Quizzes from "@components/Catalogue/Quizzes";
import Quiz from "@components/Catalogue/Quiz/Quiz";

import Pagination from "@components/Catalogue/Pagination";
import Empty from "@components/Common/Empty";

export default function Creator() {
  const {
    page,
    pagination,
    error,
    isPending,
    handleFilter,
    handleSort,
    handleSwitch,
  } = useFetchCreatedQuizzes();

  const { push } = useRouter();

  const handleNavigate = (id: string) => push(`/creator/quiz/${id}`);

  return (
    <section id="catalogue">
      <Controller onSubmit={() => {}}>
        <Search placeholder="Search By Name" onChange={handleFilter} />

        <Dropdown onChange={(e) => handleSort(e.target.value)} name="sort">
          <Option label="Sort Quizzes" />
          <Option value="title_asc" label="Title (Ascending)" />
          <Option value="title_desc" label="Title (Descending)" />
          <Option value="points_asc" label="Points (Ascending)" />
          <Option value="points_desc" label="Points (Descending)" />
          <Option value="count_asc" label="Questions (Ascending)" />
          <Option value="count_desc" label="Questions (Descending)" />
        </Dropdown>
      </Controller>

      {isPending && <Empty reason="Fetching Your Quizzes..." />}

      {error && <Empty reason={error.response!.data.error} />}

      {!pagination ||
        (pagination.quizzes.length === 0 && (
          <Empty
            label="Create Quiz"
            reason="No Quizzes Available."
            url="/creator/quiz/create"
          />
        ))}

      {pagination && pagination.quizzes.length !== 0 && (
        <Quizzes>
          {pagination.quizzes.map((quiz) => (
            <Quiz
              key={quiz.id}
              {...quiz}
              points={quiz.points}
              length={quiz.questions.length}
              onClick={() => handleNavigate(quiz.id!)}
            />
          ))}
        </Quizzes>
      )}

      {!pagination ||
        (pagination.quizzes.length !== 0 && (
          <Pagination
            onSwitch={handleSwitch}
            url="/creator/quiz/create"
            image="/user/add.svg"
            total={pagination.pages}
            page={page}
          />
        ))}
    </section>
  );
}
