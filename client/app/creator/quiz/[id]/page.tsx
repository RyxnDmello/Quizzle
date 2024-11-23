"use client";

import { useParams, useRouter } from "next/navigation";

import useFetchAnsweredQuizzes from "@hooks/creator/useFetchAnsweredQuizzes";
import useFilterAnsweredQuizzes from "@hooks/creator/useFilterAnsweredQuizzes";
import useDeleteQuiz from "@hooks/creator/useDeleteQuiz";

import Title from "@components/Creator/Title";
import Search from "@components/Catalogue/Controller/Search";

import Participants from "@components/Attendees/Participants";
import Participant from "@components/Attendees/Participant";

import Code from "@components/Attendees/Code";
import Button from "@components/Attendees/Button";

import Pagination from "@components/Catalogue/Pagination";
import Empty from "@components/Common/Empty";
import Error from "@components/Common/Error";

export default function Quiz() {
  const {
    quiz,
    participants,
    fetchError,
    isFetchPending,
    fetchParticipantsError,
    isFetchParticipantsPending,
  } = useFetchAnsweredQuizzes();

  const {
    error: deleteError,
    isPending: isDeletePending,
    handleDeleteQuiz,
  } = useDeleteQuiz();

  const { filter, handleSetPrompt } = useFilterAnsweredQuizzes(
    participants || []
  );

  const { id } = useParams<{ id: string }>();
  const { replace } = useRouter();

  const handleNavigateToEdit = () => {
    replace(`/creator/quiz/${id}/edit`, { scroll: true });
  };

  if (fetchError) {
    return (
      <section id="participants">
        <Empty
          reason={`${fetchError.response?.data.error}.`}
          label="Go To Dashboard."
          url="/creator"
        />
      </section>
    );
  }

  if (fetchParticipantsError) {
    return (
      <section id="participants">
        <Empty
          reason={`${fetchParticipantsError.response?.data.error}.`}
          label="Go To Dashboard."
          url="/creator"
        />
      </section>
    );
  }

  if (!quiz || isFetchPending) {
    return (
      <section id="participants">
        <Empty reason="Loading Participants..." />
      </section>
    );
  }

  return (
    <section id="participants">
      <Title title={quiz.title} difficulty={quiz.difficulty} />

      <div className="details">
        <Code code={quiz.id!} />

        <div>
          <Button
            onClick={handleNavigateToEdit}
            icon="/quiz/edit.svg"
            label="Edit"
          />

          <Button
            onClick={handleDeleteQuiz}
            icon="/quiz/delete.svg"
            label={isDeletePending ? "Deleting Quiz..." : "Delete"}
          />
        </div>

        <Error error={deleteError} />
      </div>

      <hr />

      <Search placeholder="Search Participant" onChange={handleSetPrompt} />

      {isFetchParticipantsPending && (
        <Empty reason="Fetching Participants..." />
      )}

      {!isFetchParticipantsPending &&
        (!participants || participants.length === 0) && (
          <Empty reason="Quiz Has Not Been Attempted" />
        )}

      {participants && participants.length !== 0 && (
        <Participants>
          {(filter.length === 0 ? participants : filter).map((participant) => (
            <Participant key={participant.quizID} {...participant} />
          ))}
        </Participants>
      )}

      {participants && participants.length !== 0 && <Pagination pages={5} />}
    </section>
  );
}
