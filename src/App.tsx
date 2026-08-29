import { Header, Hero } from "./components/Deck";
import { PlayerBar } from "./components/Player";
import { Agentes, Cadena, Manifiesto } from "./components/Sections";
import { Feed, Footer, Musica, Parrilla, Partners, TerminalLog } from "./components/Sections2";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink pb-[74px] text-snow">
      {/* capas ambientales */}
      <div className="noise-layer" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <Header />
      <main>
        <Hero />
        <Manifiesto />
        <Agentes />
        <Cadena />
        <Parrilla />
        <Musica />
        <Feed />
        <Partners />
        <TerminalLog />
      </main>
      <Footer />
      <PlayerBar />
    </div>
  );
}
