//import "./App.css";

import FavoriteSongsOfYear from "@/pages/music/FavoriteSongsOfYear/FavoriteSongsOfYear";
import Events from "@/pages/music/Events/Events";
import TripleTriad from "@/pages/games/TripleTriad/TripleTriad";
import { useState } from "react";
import Button from "./Button";

const App = () => {
  const [tab, setTab] = useState("tripletriad");

  return (
    <div>
      <Button selected={tab === "events"} onClick={() => setTab("events")}>
        Events
      </Button>
      <Button
        selected={tab === "favorites"}
        onClick={() => setTab("favorites")}
      >
        Favorites
      </Button>
      <Button
        selected={tab === "tripletriad"}
        onClick={() => setTab("tripletriad")}
      >
        Triple Triad
      </Button>
      {tab === "events" && <Events />}
      {tab === "favorites" && <FavoriteSongsOfYear />}
      {tab === "tripletriad" && <TripleTriad />}
    </div>
  );
};

export default App;
