import { Header, Hero } from "./components/Deck";
import { PlayerBar } from "./components/Player";
import { Agentes, Cadena, Manifiesto } from "./components/Sections";
import { Feed, Footer, Musica, Partners } from "./components/Sections2";
import { Cabina, Parrilla, Torre } from "./components/Visual";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink pb-16 text-snow">
      <div className="noise-layer" aria-hidden="true" />

      <Header />
      <main>
        <Hero />
        <Manifiesto />
        <Agentes />
        <Cadena />
        <Torre />
        <Parrilla />
        <Musica />
        <Cabina />
        <Feed />
        <Partners />
      </main>
      <Footer />
      <PlayerBar />
    </div>
  );
}
