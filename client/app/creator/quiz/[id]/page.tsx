"use client";

import useFetchAnsweredQuizzes from "@hooks/creator/useFetchAnsweredQuizzes";
import useFilterAnsweredQuizzes from "@hooks/creator/useFilterAnsweredQuizzes";

import Title from "@components/Creator/Title";
import Search from "@components/Catalogue/Controller/Search";

import Participants from "@components/Attendees/Participants";
import Participant from "@components/Attendees/Participant";

import Code from "@components/Attendees/Code";
import Button from "@components/Attendees/Button";

import Pagination from "@components/Catalogue/Pagination";
import Empty from "@components/Common/Empty";

export default function Quiz() {
  const { quiz, participants, isPending } = useFetchAnsweredQuizzes();

  const { filter, handleSetPrompt } = useFilterAnsweredQuizzes(
    participants || []
  );

  console.log(participants);

  return (
    <section id="participants">
      <Title title={quiz!.title} difficulty={quiz!.difficulty} />

      <div className="details">
        <Code code={quiz!.id!} />

        <div>
          <Button icon="/quiz/edit.svg" label="Edit" onClick={() => {}} />
          <Button icon="/quiz/delete.svg" label="Delete" onClick={() => {}} />
        </div>
      </div>

      <hr />

      <Search placeholder="Search Participant" onChange={handleSetPrompt} />

      {isPending && <Empty reason="Fetching Participants..." />}

      {!isPending && (!participants || participants.length === 0) && (
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
