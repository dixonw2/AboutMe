using System.Collections.Generic;
using System.Linq;
using AboutMe.Models;
using AboutMe.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;

namespace Controllers
{
	[ApiController]
    [Route("api/[controller]")]
	public class MusicController : ControllerBase
	{
		private readonly IDataAccessProvider _dap;
		private readonly ILogger<MusicController> _logger;

        public MusicController(ILogger<MusicController> logger, IDataAccessProvider dataAccessProvider)
        {
            _logger = logger;
			_dap = dataAccessProvider;
        }

		#region Song
		[HttpGet("songs/all")]
		public IEnumerable<Song> GetSongs()
		{
			return _dap.GetSongRecords().OrderBy(song => song.Id);
		}

		[HttpGet("songs/{year}")]
		public IEnumerable<Song> GetSongsForYear(int year)
		{
			// ignore article adjectives (a/an/the) when sorting
			return (from s in _dap.GetSongRecords()
				join my in _dap.GetYearRecords()
				on s.IdYear equals my.Id
				where my.Year == year
				select s).OrderBy(song => song.Artist.StartsWith("A ") ? song.Artist.Substring(2, song.Artist.Length - 2)
					: song.Artist.StartsWith("An ") ? song.Artist.Substring(3, song.Artist.Length - 3)
					: song.Artist.StartsWith("The ") ? song.Artist.Substring(4, song.Artist.Length - 4)
					: song.Artist);
		}
		#endregion

		#region Year
		[HttpGet("years/all")]
		public IEnumerable<MusicYear> GetYears()
		{
			return _dap.GetYearRecords();
		}

		[HttpGet("years/{year}")]
		public MusicYear GetYear(int year)
		{
			return _dap.GetYearRecords().Where(yr => yr.Year == year).FirstOrDefault();
		}
		#endregion

		#region YearlyComment
		[HttpGet("yearlycomments/all")]
		public IEnumerable<YearlyComment> GetYearlyComments()
		{
			return _dap.GetYearlyCommentRecords();
		}

		[HttpGet("yearlycomments/{year}")]
		public YearlyComment GetYearlyComment(int year)
		{
			return (from yc in _dap.GetYearlyCommentRecords()
					join my in _dap.GetYearRecords()
					on yc.IdYear equals my.Id
					where my.Year == year
					select yc).FirstOrDefault();
		}
		#endregion
	}
}