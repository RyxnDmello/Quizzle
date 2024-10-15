"use client";

import useFetchParticipants from "@hooks/creator/useFetchParticipants";
import useFilterParticipants from "@hooks/creator/useFilterParticipants";

import Title from "@components/Create/Title";
import Search from "@components/Catalogue/Controller/Search";

import Participants from "@components/Attendees/Participants";
import Participant from "@components/Attendees/Participant";

import Code from "@components/Attendees/Code";
import Button from "@components/Attendees/Button";

import Pagination from "@components/Catalogue/Pagination";
import Empty from "@components/Common/Empty";

export default function Quiz() {
  const { participants } = useFetchParticipants();
  const { filter, handleSetPrompt } = useFilterParticipants(participants);

  return (
    <section id="participants">
      <Title title="Next.js" difficulty="MEDIUM" />

      <div className="details">
        <Code code="QID24680" />

        <div>
          <Button icon="/quiz/edit.svg" label="Edit" onClick={() => {}} />
          <Button icon="/quiz/delete.svg" label="Delete" onClick={() => {}} />
        </div>
      </div>

      <hr />

      <Search placeholder="Search Participant" onChange={handleSetPrompt} />

      {participants.length === 0 && (
        <Empty reason="Quiz Has Not Been Attempted" />
      )}

      {participants.length !== 0 && (
        <Participants>
          {(filter.length === 0 ? participants : filter).map((participant) => (
            <Participant
              key={participant.id}
              attendee={participant.id}
              {...participant}
            />
          ))}
        </Participants>
      )}

      {participants.length !== 0 && <Pagination pages={5} />}
    </section>
  );
}
