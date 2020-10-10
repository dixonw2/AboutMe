using System;
using System.Collections.Generic;
using AboutMe.Entities;
using AboutMe.DataModels;

namespace AboutMe.Services
{
    public class MusicService
    {
        public static IEnumerable<SongEntity> GetSongsForYear(int year)
        {
            return MusicDataModel.GetSongs(year);
        }
    }
}