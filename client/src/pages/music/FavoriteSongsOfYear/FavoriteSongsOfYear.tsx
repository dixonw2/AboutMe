import { useEffect, useState } from "react";
import SongsList from "@/pages/music/FavoriteSongsOfYear/components/SongsList/SongsList";
import type Year from "@/types/favorite-songs/Year";
import Button from "@/components/Button";

import Overview from "./components/Overview/Overview";
import Info from "./components/Info/Info";
import NewYear from "./components/CreateYearlyEntry/CreateYearlyEntry";

const FavoriteSongsOfYear = () => {
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState<Year[]>([]);
  const [currentYear, setCurrentYear] = useState(0);
  const [showNewYear, setShowNewYear] = useState(false);
  const selected = years.find((year) => year.year == currentYear);

  useEffect(() => {
    const getYears = async () => {
      const res = await fetch("api/music/favorite-songs");
      const data = await res.json();
      setYears(data);
      setCurrentYear(data[0]?.year);
      setLoading(false);
    };

    getYears();
  }, []);

  const handleClick = (year: number) => {
    setCurrentYear(year);
  };

  const handleCreate = (year: Year) => {
    setYears((years) => [...years, year]);
  };

  const handleDelete = async (deleteYear: number) => {
    const response = await fetch(
      `api/music/favorite-songs/delete/${deleteYear}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      setYears((years) => years.filter((year) => year.year !== deleteYear));
      setCurrentYear(years[0].year);
    }
  };

  return (
    <>
      <title>
        {loading ? "Favorite Songs" : `Favorite Songs of ${currentYear}`}
      </title>
      <Overview />
      <hr />
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          {years.map((year) => (
            <Button
              onClick={() => handleClick(year.year)}
              key={year.year}
              selected={year.year === selected?.year}
            >
              {year.year}
            </Button>
          ))}

          {selected && (
            <>
              <Info year={selected} />
              <SongsList songs={selected.songs} year={selected.year} />
              {selected.year === new Date().getFullYear() && (
                <Button onClick={() => handleDelete(selected.year)}>
                  Delete
                </Button>
              )}
            </>
          )}
        </div>
      )}
      {!years.find((year) => year.year === new Date().getFullYear()) && (
        <div>
          <Button onClick={() => setShowNewYear((prev) => !prev)}>
            {!showNewYear ? "+" : "-"}
          </Button>
          {showNewYear && <NewYear onCreate={handleCreate} />}
        </div>
      )}
    </>
  );
};

export default FavoriteSongsOfYear;
