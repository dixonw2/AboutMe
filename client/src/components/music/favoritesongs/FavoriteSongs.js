import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SongsTable from "./SongsTable";
import YearlyComment from "./YearlyComment";

export default function FavoriteSongs() {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  // default so it says "Favorite Songs of the Year" while loading
  const [activeTab, setActiveTab] = useState("the Year");

  useEffect(() => {
    const getYears = async () => {
      const response = await fetch("api/music/favorite-songs/years");
      const years = await response.json();
      // defaults activeTab to "The Year" in the case that the server is slow
      setYears(years);
      setLoading(false);
      setActiveTab(years[0]);
    };

    getYears();
  }, []);

  return (
    <>
      <h1 id="favoriteSongs">Favorite Songs of {activeTab}</h1>

      {loading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        <Tabs
          activeKey={activeTab}
          onSelect={setActiveTab}
          id="years-tabs"
          className="mb-3"
        >
          {years.map((year) => (
            <Tab eventKey={year} title={year} key={year}>
              <YearlyComment year={year} />
              <SongsTable year={year} />
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  );
}
