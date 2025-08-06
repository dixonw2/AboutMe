import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import FavoriteSongs from "./components/music/favoritesongs/FavoriteSongs";
import { TripleTriad } from "./components/tripletriad/TripleTriad";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/triple-triad",
    element: <TripleTriad />,
  },
  {
    path: "/music/favorites",
    element: <FavoriteSongs />,
  },
];

export default AppRoutes;
