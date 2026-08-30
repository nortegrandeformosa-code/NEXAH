import { Header, Hero } from "./components/Deck";
import { PlayerBar } from "./components/Player";
import { Agentes, Cadena, Manifiesto } from "./components/Sections";
import { Feed, Footer, Musica, Partners, TerminalLog } from "./components/Sections2";
import { Cabina, Parrilla, Torre } from "./components/Visual";

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
        <Torre />
        <Agentes />
        <Cadena />
        <Cabina />
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
