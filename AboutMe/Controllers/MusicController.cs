using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AboutMe.Entities;
using AboutMe.DataModels;

namespace AboutMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MusicController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<MusicController> _logger;

        public MusicController(ILogger<MusicController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<SongEntity> GetSongEntities()
        {
            IEnumerable<SongEntity> results = new List<SongEntity>();
            try
            {
                results = MusicDataModel.GetSongs(2017);
            }
            catch (Exception e)
            {
                Console.WriteLine($"MusicController.GetSongEntities: {e.Message}");
            }

            return results;
        }
    }
}
