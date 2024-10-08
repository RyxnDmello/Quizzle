import Logo from "@components/Common/Logo";
import Tile from "@components/Home/Tile";

import Creator from "@public/home/creator.png";

export default function Home() {
  return (
    <main id="home">
      <section>
        <Logo />

        <h1>Who Are <span>You?</span></h1>

        <div>
          <Tile
            title="Creator"
            description="I want to create quizzes."
            image={Creator}
          />

          <Tile
            title="Challenger"
            description="I want to take part in quizzes."
            image={Creator}
          />
        </div>
      </section>
    </main>
  );
}
