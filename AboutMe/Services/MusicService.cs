using System;
using System.Collections.Generic;
using AboutMe.Entities;
using AboutMe.DataModels;

namespace AboutMe.Services
{
    public class MusicService
    {
        public static List<SongEntity> GetSongsForYear(int year)
        {
            return MusicDataModel.GetSongs(year);
        }

        public static string GetCommentForYear(int year)
        {
            return MusicDataModel.GetComment(year);
        }
    }
}