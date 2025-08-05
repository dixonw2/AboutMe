import { Counter } from "./components/Counter";
import { FavoriteSongs } from "./components/music/favoritesongs/FavoriteSongs";
import { Home } from "./components/Home";
import ReactBootstrapTabs from "./components/ReactBootstrapTabs";

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
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/test",
    element: <ReactBootstrapTabs />,
  },
];

export default AppRoutes;
