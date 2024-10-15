import Logo from "@components/Common/Logo";
import Tile from "@components/Home/Tile";

export default function Home() {
  return (
    <main id="home">
      <section>
        <Logo />

        <h1>
          Who Are <span>You?</span>
        </h1>

        <div>
          <Tile
            title="Creator"
            image="/home/creator.png"
            description="I want to create quizzes."
          />

          <Tile
            title="Challenger"
            image="/home/attendee.png"
            description="I want to take part in quizzes."
          />
        </div>
      </section>
    </main>
  );
}
