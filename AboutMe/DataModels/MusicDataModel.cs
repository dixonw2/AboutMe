using System;
using System.Collections.Generic;
using AboutMe.Entities;
using Npgsql;

namespace AboutMe.DataModels
{
    public class MusicDataModel
    {
        public static IEnumerable<SongEntity> GetSongs(int year)
        {
            IList<SongEntity> results = new List<SongEntity>();

            try
            {
                var connString = "Host=localhost;Username=Wyatt;Password=;Database=AboutMe";
                using var conn = new NpgsqlConnection(connString);
                conn.Open();

                // Retrieve all rows
                using(var cmd = new NpgsqlCommand(@"SELECT s.id, s.song, s.artist, s.album, 
                                                        s.genre, s.time, s.applemusiclink,
                                                        s.spotifylink, y.year
                                                    FROM song s
                                                    JOIN year y on y.id = s.year_id
                                                    WHERE y.year = @year", conn))
                {
                    cmd.Parameters.AddWithValue("year", year);
                    using(var rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            results.Add(new SongEntity()
                            {
                                Id = rdr.GetInt32(0),
                                    Song = rdr.GetString(1),
                                    Artist = rdr.GetString(2),
                                    Album = rdr.GetString(3),
                                    Genre = rdr.GetString(4),
                                    Time = rdr.GetString(5),
                                    AppleMusicLink = rdr.GetString(6),
                                    SpotifyLink = rdr.GetString(7),
                                    Year = rdr.GetInt32(8)
                            });
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"MusicDataModel.GetSongs: {e.Message}");
            }
            return results;
        }
    }
}