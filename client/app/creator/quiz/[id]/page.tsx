"use client";

import useFetchParticipants from "@hooks/creator/useFetchParticipants";

import Title from "@components/Common/Title";
import Search from "@components/Common/Search";
import Details from "@components/User/Details";
import Participants from "@components/User/Participants";
import Participant from "@components/User/Participant";
import Empty from "@components/User/Empty";

export default function Quiz() {
  const { participants } = useFetchParticipants();

  return (
    <section>
      <Title title="Next.js" difficulty="MEDIUM" />
      <Details url="https://www.quizzle.com/quiz/QID24680" />

      <hr />

      <Search placeholder="Search Participant" onChange={() => {}} />

      {participants.length === 0 && (
        <Empty reason="No Participants Have Completed The Quiz." />
      )}

      {participants.length !== 0 && (
        <Participants>
          {participants.map((participant) => (
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
