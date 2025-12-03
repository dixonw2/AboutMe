import type Song from "@/types/favorite-songs/Song";

const SongsTable = ({ songs, year }: { songs: Song[]; year: number }) => {
  return (
    <>
      <table aria-label={`Favorite Songs of ${year}`}>
        <thead>
          <tr>
            <th />
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Length</th>
            <th>Apple Music</th>
            <th>Spotify</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={`${song.songName}-${song.artist}`}>
              <td style={{ textAlign: "right" }}>{index + 1}.</td>
              <td>{song.songName}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <td>
                {song.songLength.replace(/^00:(0?)/, "").replace(/^0/, "")}
              </td>
              <td>
                <a href={song.appleMusicLink}>Apple Music</a>
              </td>
              <td>
                <a href={song.spotifyLink}>Spotify</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SongsTable;
