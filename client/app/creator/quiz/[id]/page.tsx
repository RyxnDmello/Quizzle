"use client";

import Search from "@components/Common/Search";
import Header from "@components/Participants/Header";
import Participants from "@components/Participants/Participants";

export default function page() {
  return (
    <section>
      <div>
        <Header
          title="Next.js"
          difficulty="HARD"
          url="https://www.quizzle.com/quiz/QID5678"
        />

        <hr />

        <Search placeholder="Search Participant" onChange={() => {}} />
        <Participants />
      </div>
    </section>
  );
}
