namespace AboutMe.Models
{
	public class Song
    {
        public int Id { get; set; }
        public string SongName { get; set; }
        public string Artist { get; set; }
        public string Album { get; set; }
        public string Genre { get; set; }
        public string Time { get; set; }
        public string AppleMusicLink { get; set; }
        public string SpotifyLink { get; set; }
        public int IdYear { get; set; }
    }
}