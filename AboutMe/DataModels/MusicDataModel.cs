using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using AboutMe.Entities;
using Npgsql;

namespace AboutMe.DataModels
{
    public class MusicDataModel
    {
        public static List<SongEntity> GetSongs(int year)
        {
            var results = new List<SongEntity>();
            using(var conn = new NpgsqlConnection(CommonConstants.Constants.Database.DbConnectionString))
            {
                conn.Open();
                try
                {
                    using(var cmd = new NpgsqlCommand(string.Empty, conn))
                    {
                        cmd.CommandText = @"
                        SELECT s.id, s.song, s.artist, s.album, 
                            s.genre, s.time, s.applemusiclink,
                            s.spotifylink, y.year
                        FROM song s
                        JOIN year y on y.id = s.year_id
                        WHERE y.year = @year
                    ";
                        cmd.Parameters.AddWithValue("year", year);
                        using(var rdr = cmd.ExecuteReader())
                        {
                            while (rdr.Read())
                            {
                                results.Add(new SongEntity()
                                {
                                    Id = (int) rdr["id"],
                                        Song = (string) rdr["song"],
                                        Artist = (string) rdr["artist"],
                                        Album = (string) rdr["album"],
                                        Genre = (string) rdr["genre"],
                                        Time = (string) rdr["time"],
                                        AppleMusicLink = (string) rdr["applemusiclink"],
                                        SpotifyLink = (string) rdr["spotifylink"],
                                        Year = (int) rdr["year"]
                                });
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine($"MusicDataModel.GetSongs: {e.Message}");
                }
                finally
                {
                    conn.Close();
                }
            }

            return results;
        }

        public static string GetComment(int year)
        {
            string comment = string.Empty;
            using(var conn = new NpgsqlConnection(CommonConstants.Constants.Database.DbConnectionString))
            {
                conn.Open();
                try
                {
                    using(var cmd = new NpgsqlCommand(string.Empty, conn))
                    {
                        cmd.CommandText = @"
                        SELECT yc.comment
                        FROM yearlycomment YC
                        JOIN year y ON y.id = yc.year_id
                        WHERE y.year = @year
                    ";
                        cmd.Parameters.AddWithValue("year", year);
                        using(var rdr = cmd.ExecuteReader())
                        {
                            if (rdr.Read())
                            {
                                comment = (string)rdr["comment"];
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine($"MusicDataModel.GetSongs: {e.Message}");
                }
                finally
                {
                    conn.Close();
                }
                
                return comment;
            }
        }
    }
}