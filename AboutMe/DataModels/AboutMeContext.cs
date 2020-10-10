using Microsoft.EntityFrameworkCore;
using AboutMe.Entities;

namespace AboutMe.DataModels {
    public class AboutMeContext : DbContext {
        public AboutMeContext(DbContextOptions<AboutMeContext> options) : base(options) { }
        public DbSet<SongEntity> TodoItems { get; set; }

    }
}