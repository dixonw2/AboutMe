//import "./App.css";

import FavoriteSongsOfYear from "@/pages/music/FavoriteSongsOfYear/FavoriteSongsOfYear";
import Events from "@/pages/music/Events/Events";
import { useState } from "react";
import Button from "./Button";

const App = () => {
  const [tab, setTab] = useState("events");

  const handleSelectEvents = () => {
    setTab("events");
  };

  const handleSelectFavorites = () => {
    setTab("favorites");
  };

  return (
    <div>
      <Button selected={tab === "events"} onClick={handleSelectEvents}>
        Events
      </Button>
      <Button selected={tab === "favorites"} onClick={handleSelectFavorites}>
        Favorites
      </Button>
      {tab === "events" && <Events />}
      {tab === "favorites" && <FavoriteSongsOfYear />}
    </div>
  );
};

export default App;
