using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Npgsql;
using AboutMe.Entities;

namespace AboutMe.Entities
{
    public class SongEntity
    {
        public int Id { get; set; }
        public string Song { get; set; }
        public string Artist { get; set; }
        public string Album { get; set; }
        public string Genre { get; set; }
        public string Time { get; set; }
        public string AppleMusicLink { get; set; }
        public string SpotifyLink { get; set; }
        public int Year { get; set; }
    }
}