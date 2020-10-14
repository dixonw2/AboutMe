using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AboutMe.Entities;
using AboutMe.DataModels;
using AboutMe.Services;

namespace AboutMe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicController : ControllerBase
    {
        private readonly ILogger<MusicController> _logger;

        public MusicController(ILogger<MusicController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<SongEntity> GetSongEntities()
        {
            List<SongEntity> results = new List<SongEntity>();
            try
            {
                results = MusicService.GetSongsForYear(2017);
                results.AddRange(MusicService.GetSongsForYear(2018));
                results.AddRange(MusicService.GetSongsForYear(2019));
            }
            catch (Exception e)
            {
                Console.WriteLine($"MusicController.GetSongEntities: {e.Message}");
            }

            return results;
        }

        [HttpGet("getyear/{year}")]
        public IEnumerable<SongEntity> GetSongsByYear(int year)
        {
            List<SongEntity> results = new List<SongEntity>();
            try
            {
                results = MusicService.GetSongsForYear(year);
            }
            catch (Exception e)
            {
                Console.WriteLine($"MusicController.GetSongsByYear: {e.Message}");
            }

            return results;
        }

        [HttpGet("getyearcomment/{year}")]
        public string GetCommentForYear(int year)
        {
            var result = string.Empty;
            try
            {
                result = MusicService.GetCommentForYear(year);
            }
            catch (Exception e)
            {
                Console.WriteLine($"MusicController.GetCommentForYear: {e.Message}");
            }

            return result;
        }

    }
}
