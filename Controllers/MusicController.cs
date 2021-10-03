using System.Collections.Generic;
using AboutMe.Models;
using AboutMe.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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

		[HttpGet("songs/all")]
		public List<Song> GetSongs()
		{
			return _dap.GetSongRecords();
		}

		[HttpGet("years/all")]
		public List<MusicYear> GetYears()
		{
			return _dap.GetYearRecords();
		}

		[HttpGet("yearlycomments/all")]
		public List<YearlyComment> GetYearlyComments()
		{
			return _dap.GetYearlyCommentRecords();
		}
	}
}