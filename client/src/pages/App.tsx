//import "./App.css";

import FavoriteSongsOfYear from "@/pages/music/FavoriteSongsOfYear/FavoriteSongsOfYear";
import Events from "@/pages/music/Events/Events";
import TripleTriad from "@/pages/games/TripleTriad/TripleTriad";
import Blog from "@/pages/music/Blog/Blog";
import { useState } from "react";
import Button from "../components/Button";

const App = () => {
  const [tab, setTab] = useState("blog");

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
      <Button selected={tab === "blog"} onClick={() => setTab("blog")}>
        Blog
      </Button>
      {tab === "events" && <Events />}
      {tab === "favorites" && <FavoriteSongsOfYear />}
      {tab === "tripletriad" && <TripleTriad />}
      {tab === "blog" && <Blog />}
    </div>
  );
};

export default App;
