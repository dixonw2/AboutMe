import { useEffect, useState, type ReactNode } from "react";
import SongsTable from "@/components/music/favorite-songs/SongsTable";
import type Year from "@/types/favorite-songs/Year";
import styles from "./FavoriteSongsOfYear.module.css";
import type Song from "@/types/favorite-songs/Song";

const FavoriteSongsOfYear = () => {
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState<Year[]>([]);
  const [currentYear, setCurrentYear] = useState(0);
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

  useEffect(() => {
    document.title = `Favorite Songs ${loading ? "" : `of ${currentYear}`}`;
  }, [currentYear, loading]);

  const handleClick = (year: number) => {
    setCurrentYear(year);
  };

  const handleCreate = (year: Year) => {
    setYears((years) => [...years, year]);
  };

  return (
    <>
      <title>
        {loading ? "Favorite Songs" : `Favorite Songs of ${currentYear}`}
      </title>
      <FavoritesOverview />
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
              <YearInfo year={selected} />
              <SongsTable songs={selected.songs} year={selected.year} />
            </>
          )}
        </div>
      )}
      <NewYear onCreate={handleCreate} />
    </>
  );
};

const FavoritesOverview = () => {
  return (
    <div>
      <h1 className={styles.header}>Favorite Songs</h1>
      <p>
        One of my best friends has been ending his years by compiling a list of
        his top 13 songs from that year, so in 2017 I decided to do that as
        well! There are a couple rules, however.
      </p>
      <ul>
        <li>
          The song must be released during the current year. If it was released
          as a single the previous year but I didn't hear it until the current
          year AND it's included on an album that's been released during the
          current year, then it's fair game. If it was released as a single
          during the current year and I've heard it, then it can only be added
          to the list for that year.
        </li>
        <li>
          Only one song per band/artist per year. This is a rule I added after
          2017 because I came to the realization that if a band releases an
          album I thoroughly enjoy, then the list will likely be filled with
          that album. This rule ensures that I'm still listening to new music
          throughout the year. One distinction about this, though, is if a
          member of a band releases music as a solo or with another group. For
          example, if System of a Down and Serj Tankian released music the same
          year, they both may be added to the list since they're different
          artists.
        </li>
        <li>
          Covers <em>are</em> allowed, but should generally be rare. If I made a
          list in 2016, then Blank Space by I Prevail would have probably made
          the list. Bad Wolves' cover of Zombie made it in 2018 because it's a
          phenomenal cover. However, a cover can't be included simply because I
          like the original song. For example, in 2017, Avenged Sevenfold
          released a cover of Wish You Were Here by Pink Floyd, which is one of
          my favorite songs by them. Despite it being a favorite of mine by my
          favorite band, it did not make the cut because, as far as covers go,
          it's just simply <em>alright</em>.
        </li>
      </ul>
      <p>
        Making this list every year has made me listen to a ton of new music I
        normally wouldn't listen to, and it's introduced me to several new bands
        that I wouldn't have heard of otherwise!
      </p>
    </div>
  );
};

const YearInfo = ({ year }: { year: Year }) => {
  const formatDate = (date: string) => {
    const truncated = date.split(".")[0] + "Z";
    const date_string = new Date(truncated);

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(date_string);
  };

  return (
    <div className={styles["comment"]}>
      <h1 className={styles["year-header"]}>{year.year}</h1>
      <h4 className={styles["year-subheader"]}>
        {formatDate(year.dateCreated)}
      </h4>
      <p>{year.comment}</p>
    </div>
  );
};

const NewYear = ({ onCreate }: { onCreate: (year: Year) => void }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [comment, setComment] = useState("");
  const year = new Date().getFullYear();

  const addSong = (song: Song) => {
    setSongs((songs) => [...songs, song]);
  };

  const canSubmit = () => {
    const uniqueSongs = new Set<string>();
    for (const song of songs) {
      uniqueSongs.add(`${song.songName}::${song.artist}`);
    }

    return (
      songs.length === 13 &&
      comment.trim().length > 0 &&
      uniqueSongs.size === 13
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const convertTime = (time: string) => {
      const [mm, ss] = time.split(":").map(Number);
      return `00:${mm.toString().padStart(2, "0")}:${ss
        .toString()
        .padStart(2, "0")}`;
    };

    e.preventDefault();
    const newYear = JSON.stringify({
      comment: comment,
      year: year,
      songs: songs.map((song) => ({
        ...song,
        songLength: convertTime(song.songLength),
      })),
    });

    const response = await fetch("api/music/favorite-songs/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newYear,
    });

    const data: Year = await response.json();
    onCreate(data);
    setSongs([]);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="year">Year:</label>
      <input id="year" value={year} disabled />
      <CurrentSongs songs={songs} />
      {songs.length < 13 && <SongInput onAdd={addSong} />}
      <label style={{ display: "block" }} htmlFor="comment">
        Comment:
      </label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" disabled={!canSubmit()}>
        Submit
      </button>
    </form>
  );
};

const CurrentSongs = ({ songs }: { songs: Song[] }) => {
  return (
    <div>
      <ol>
        {songs.map((song) => (
          <li key={song.songName}>{song.songName}</li>
        ))}
      </ol>
    </div>
  );
};

const SongInput = ({ onAdd }: { onAdd: (song: Song) => void }) => {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [length, setLength] = useState("");
  const [appleMusicLink, setAppleMusicLink] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");

  const addSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newSong: Song = {
      songName: song,
      artist: artist,
      album: album,
      genre: genre,
      songLength: length,
      appleMusicLink: appleMusicLink,
      spotifyLink: spotifyLink,
    };
    onAdd(newSong);
    setSong("");
    setArtist("");
    setAlbum("");
    setGenre("");
    setLength("");
    setAppleMusicLink("");
    setSpotifyLink("");
  };

  const validateSong = () => {
    const validateSongLength = () => {
      return length.match(/^(\d+):(\d{2})$/);
    };

    return (
      song.length > 0 &&
      artist.length > 0 &&
      album.length > 0 &&
      genre.length > 0 &&
      validateSongLength() &&
      appleMusicLink.length > 0 &&
      spotifyLink.length > 0
    );
  };

  return (
    <>
      <label htmlFor="song">Song:</label>
      <input id="song" value={song} onChange={(e) => setSong(e.target.value)} />
      <label htmlFor="artist">Artist:</label>
      <input
        id="artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value.trim())}
      />
      <label htmlFor="album">Album:</label>
      <input
        id="album"
        value={album}
        onChange={(e) => setAlbum(e.target.value.trim())}
      />
      <label htmlFor="genre">Genre:</label>
      <input
        id="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value.trim())}
      />
      <label htmlFor="length">Length:</label>
      <input
        id="length"
        value={length}
        onChange={(e) => setLength(e.target.value.trim())}
      />
      <label htmlFor="apple-music">Apple Music:</label>
      <input
        id="apple-music"
        value={appleMusicLink}
        onChange={(e) => setAppleMusicLink(e.target.value.trim())}
      />
      <label htmlFor="spotify">Spotify:</label>
      <input
        id="spotify"
        value={spotifyLink}
        onChange={(e) => setSpotifyLink(e.target.value.trim())}
      />
      <button onClick={addSong} disabled={!validateSong()}>
        Add Song
      </button>
    </>
  );
};

const Button = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      className={styles[selected ? "button-selected" : "button"]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FavoriteSongsOfYear;
