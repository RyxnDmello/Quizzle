"use client";

import useFetchParticipants from "@hooks/creator/useFetchParticipants";
import useFilterParticipants from "@hooks/creator/useFilterParticipants";

import Title from "@components/Create/Title";
import Search from "@components/Catalogue/Controller/Search";
import Details from "@components/User/Details";
import Participants from "@components/User/Participants";
import Participant from "@components/User/Participant";
import Empty from "@components/User/Empty";

export default function Quiz() {
  const { participants } = useFetchParticipants();
  const { filter, handleSetPrompt } = useFilterParticipants(participants);

  return (
    <section id="participants">
      <Title title="Next.js" difficulty="MEDIUM" />

      <Details code="QID24680" />

      <hr />

      <Search placeholder="Search Participant" onChange={handleSetPrompt} />

      {participants.length === 0 && (
        <Empty reason="No Participants Have Completed The Quiz." />
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
    </section>
  );
}
