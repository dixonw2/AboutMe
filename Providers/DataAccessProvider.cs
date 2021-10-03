using System.Collections.Generic;
using System.Linq;
using AboutMe.Contexts;
using AboutMe.Models;

namespace AboutMe.Providers
{
    public class DataAccessProvider: IDataAccessProvider
    {
        private readonly AboutMeContext _context;

        public DataAccessProvider(AboutMeContext context)
        {
            _context = context;
        }

        #region Songs
        public void AddSongRecord(Song song)
        {
            _context.Song.Add(song);
            _context.SaveChanges();
        }

        public void UpdateSongRecord(Song song)
        {
            _context.Song.Update(song);
            _context.SaveChanges();
        }

        public void DeleteSongRecord(int id)
		{
			var entity = _context.Song.FirstOrDefault(t => t.Id == id);
            _context.Song.Remove(entity);
            _context.SaveChanges();
        }

        public Song GetSongRecord(int id)
        {
            return _context.Song.FirstOrDefault(t => t.Id == id);
        }

        public List<Song> GetSongRecords()
        {
            return _context.Song.ToList();
        }
        #endregion

        #region Year
        public void AddYearRecord(MusicYear year)
        {
            _context.MusicYear.Add(year);
            _context.SaveChanges();
        }

        public void UpdateYearRecord(MusicYear year)
        {
            _context.MusicYear.Update(year);
            _context.SaveChanges();
        }

        public void DeleteYearRecord(int id)
		{
			var entity = _context.MusicYear.FirstOrDefault(t => t.Id == id);
            _context.MusicYear.Remove(entity);
            _context.SaveChanges();
        }

        public MusicYear GetYearRecord(int id)
        {
            return _context.MusicYear.FirstOrDefault(t => t.Id == id);
        }

        public List<MusicYear> GetYearRecords()
        {
            return _context.MusicYear.ToList();
        }
        #endregion

        #region YearlyComment
        public void AddYearlyCommentRecord(YearlyComment yearlyComment)
        {
            _context.YearlyComment.Add(yearlyComment);
            _context.SaveChanges();
        }

        public void UpdateYearlyCommentRecord(YearlyComment yearlyComment)
        {
            _context.YearlyComment.Update(yearlyComment);
            _context.SaveChanges();
        }

        public void DeleteYearlyCommentRecord(int id)
		{
			var entity = _context.YearlyComment.FirstOrDefault(t => t.Id == id);
            _context.YearlyComment.Remove(entity);
            _context.SaveChanges();
        }

        public YearlyComment GetYearlyCommentRecord(int id)
        {
            return _context.YearlyComment.FirstOrDefault(t => t.Id == id);
        }

        public List<YearlyComment> GetYearlyCommentRecords()
        {
            return _context.YearlyComment.ToList();
        }
        #endregion
    }
}