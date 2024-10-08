"use client";

import Title from "@components/Common/Title";
import Search from "@components/Common/Search";
import Details from "@components/User/Details";
import Participants from "@components/User/Participants";
import Participant from "@components/User/Participant";

export default function Quiz() {
  return (
    <section>
      <Title title="Next.js" difficulty="MEDIUM" />
      <Details url="https://www.quizzle.com/quiz/QID24680" />

      <hr />

      <Search placeholder="Search Participant" onChange={() => {}} />

      <Participants>
        {Array.from({ length: 10 }, (_, i) => (
          <Participant
            key={i}
            name="Ryan Nolasco D Mello"
            date="05/10/2024"
            correct={5}
            incorrect={10}
            points={50}
          />
        ))}
      </Participants>
    </section>
  );
}
