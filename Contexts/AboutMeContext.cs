using Microsoft.EntityFrameworkCore;
using AboutMe.Models;

namespace AboutMe.Contexts {
    public class AboutMeContext : DbContext {
		public DbSet<Song> Song { get; set; }
        public DbSet<MusicYear> MusicYear { get; set; }
        public DbSet<YearlyComment> YearlyComment { get; set; }

        public AboutMeContext(DbContextOptions<AboutMeContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder builder)  
        {  
            base.OnModelCreating(builder);  
        }  
  
        public override int SaveChanges()  
        {  
            ChangeTracker.DetectChanges();  
            return base.SaveChanges();  
        } 
    }
}