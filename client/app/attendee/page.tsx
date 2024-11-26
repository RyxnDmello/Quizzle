"use client";

import useFetchQuizzes from "@hooks/attendee/useFetchQuizzes";
import useJoinQuiz from "@hooks/attendee/useJoinQuiz";

import Title from "@components/Common/Title";
import Join from "@components/Catalogue/Join";

import Controller from "@components/Catalogue/Controller";
import Search from "@components/Catalogue/Controller/Search";
import Dropdown from "@components/Catalogue/Controller/Dropdown";
import Option from "@components/Catalogue/Controller/Option";

import Quizzes from "@components/Catalogue/Quizzes";
import Quiz from "@components/Catalogue/Quiz/Quiz";

import Pagination from "@components/Catalogue/Pagination";
import Empty from "@components/Common/Empty";
import Error from "@components/Common/Error";

export default function Creator() {
  const {
    page,
    pagination,
    error,
    isPending,
    handleFilter,
    handleSort,
    handleSwitch,
  } = useFetchQuizzes();

  const {
    formErrors,
    fetchError,
    isFetchPending,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useJoinQuiz();

  return (
    <section id="catalogue">
      <Title>
        Join A Qui<span>zz</span>
      </Title>

      <Join
        label={isFetchPending ? "Joining..." : "Join Quiz"}
        disabled={isFetchPending}
        error={formErrors.code}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      <Error error={fetchError} />

      <hr />

      <Controller onSubmit={() => {}}>
        <Search placeholder="Search By Title" onChange={handleFilter} />

        <Dropdown onChange={(e) => handleSort(e.target.value)} name="sort">
          <Option label="Sort Quizzes" />
          <Option value="quizTitle_asc" label="Title (Ascending)" />
          <Option value="quizTitle_desc" label="Title (Descending)" />
          <Option value="totalPoints_asc" label="Points (Ascending)" />
          <Option value="totalPoints_desc" label="Points (Descending)" />
          <Option value="count_asc" label="Questions (Ascending)" />
          <Option value="count_desc" label="Questions (Descending)" />
        </Dropdown>
      </Controller>

      {isPending && <Empty reason="Fetching Your Quizzes..." />}

      {error && <Empty reason={error.response!.data.error} />}

      {!pagination ||
        (pagination.quizzes.length === 0 && (
          <Empty reason="No Quizzes Attempted." />
        ))}

      {!isPending && pagination && pagination.quizzes.length !== 0 && (
        <Quizzes>
          {pagination.quizzes.map((quiz) => (
            <Quiz
              key={quiz.quizID}
              title={quiz.quizTitle}
              difficulty={quiz.quizDifficulty}
              points={quiz.finalPoints}
              length={quiz.questions.length}
            />
          ))}
        </Quizzes>
      )}

      {!pagination ||
        (pagination.quizzes.length !== 0 && (
          <Pagination
            onSwitch={handleSwitch}
            total={pagination.pages}
            page={page}
          />
        ))}
    </section>
  );
}
