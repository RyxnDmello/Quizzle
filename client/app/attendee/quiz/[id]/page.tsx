"use client";

import { useRouter } from "next/navigation";

import Title from "@components/Common/Title";

import Questions from "@components/Create/Questions";
import Question from "@components/Create/Question";
import Button from "@components/Create/Button";

export default function Create() {
  const { replace } = useRouter();

  return (
    <section>
      <form autoComplete="off" onSubmit={() => {}}>
        <Title title="Next.js" difficulty="MEDIUM" />

        <Questions>
          <Question
            question="What is Next.js?"
            score={10}
            index={0}
            onSelect={() => {}}
            disabled
          />
          <Question
            question="What is CSR?"
            index={0}
            onSelect={() => {}}
            disabled
          />
          <Question
            question="What is SSR?"
            index={0}
            onSelect={() => {}}
            disabled
          />
          <Question
            question="What is SSG?"
            index={0}
            onSelect={() => {}}
            disabled
          />
          <Question
            question="What is ISR?"
            index={0}
            onSelect={() => {}}
            disabled
          />
          <Question
            question="What is ISR?"
            index={0}
            onSelect={() => {}}
            disabled
          />
        </Questions>

        <hr />

        <div className="buttons">
          <Button
            type="button"
            label="Cancel"
            onClick={() => replace("/attendee")}
          />

          <Button label="Submit Quiz" />
        </div>
      </form>
    </section>
  );
}
