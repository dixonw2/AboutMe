using System.Collections.Generic;
using AboutMe.Models;

namespace AboutMe.Providers
{
    public interface IDataAccessProvider
    {
        #region Song
        void AddSongRecord(Song song);
        void UpdateSongRecord(Song song);
        void DeleteSongRecord(int id);
        Song GetSongRecord(int id);
        List<Song> GetSongRecords();
        #endregion

        #region Year
        void AddYearRecord(MusicYear year);
        void UpdateYearRecord(MusicYear year);
        void DeleteYearRecord(int id);
        MusicYear GetYearRecord(int id);
        List<MusicYear> GetYearRecords();
        #endregion

        #region YearlyComment
        void AddYearlyCommentRecord(YearlyComment yearlyComment);
        void UpdateYearlyCommentRecord(YearlyComment yearlyComment);
        void DeleteYearlyCommentRecord(int id);
        YearlyComment GetYearlyCommentRecord(int id);
        List<YearlyComment> GetYearlyCommentRecords();
        #endregion
    }
}