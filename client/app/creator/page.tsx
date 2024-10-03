import Controller from "@components/Creator/Controller";
import Quizzes from "@components/Creator/Quizzes";

export default function Creator() {
  return (
    <section>
      <div>
        <Controller />
        <Quizzes />
      </div>
    </section>
  );
}
